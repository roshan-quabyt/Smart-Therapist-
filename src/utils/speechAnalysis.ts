import { pipeline, env } from "@huggingface/transformers";

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

const MODEL = "Xenova/whisper-tiny";

let transcriber: any = null;
let isLoading = false;
let modelLoadingProgress = 0;

const normalizeText = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, "")
    .split(/\s+/)
    .filter(Boolean);

const buildLevenshteinMatrix = (reference: string[], spoken: string[]): number[][] => {
  const rows = reference.length + 1;
  const cols = spoken.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) matrix[i][0] = i;
  for (let j = 0; j < cols; j++) matrix[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = reference[i - 1] === spoken[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution / match
      );
    }
  }

  return matrix;
};

const extractWordDiff = (reference: string[], spoken: string[], matrix: number[][]) => {
  const matchedWords: string[] = [];
  const missedWords: string[] = [];
  const extraWords: string[] = [];

  let i = reference.length;
  let j = spoken.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && matrix[i][j] === matrix[i - 1][j - 1] && reference[i - 1] === spoken[j - 1]) {
      matchedWords.unshift(reference[i - 1]);
      i -= 1;
      j -= 1;
    } else if (
      i > 0 &&
      j > 0 &&
      matrix[i][j] === matrix[i - 1][j - 1] + 1
    ) {
      // substitution
      missedWords.unshift(reference[i - 1]);
      extraWords.unshift(spoken[j - 1]);
      i -= 1;
      j -= 1;
    } else if (i > 0 && matrix[i][j] === matrix[i - 1][j] + 1) {
      // deletion from spoken => missed word
      missedWords.unshift(reference[i - 1]);
      i -= 1;
    } else if (j > 0 && matrix[i][j] === matrix[i][j - 1] + 1) {
      // insertion => extra word spoken
      extraWords.unshift(spoken[j - 1]);
      j -= 1;
    } else {
      // fallback to break potential infinite loops
      break;
    }
  }

  return { matchedWords, missedWords, extraWords };
};

export let lastLoadingError: string | null = null;

export const getModelLoadingProgress = (): number => modelLoadingProgress;

export const initializeSpeechRecognition = async (
  onProgress?: (progress: number) => void
): Promise<void> => {
  if (transcriber || isLoading) {
    console.log("[DEBUG] Model already loaded or currently loading, skipping...");
    return;
  }
  
  isLoading = true;
  lastLoadingError = null;
  modelLoadingProgress = 0;
  console.log("[DEBUG] Loading speech recognition model...");

  try {
    console.log(`Attempting to load model (${MODEL}) on CPU...`);
    transcriber = await pipeline(
      "automatic-speech-recognition",
      MODEL,
      {
        device: "wasm",
        dtype: "q8",
        progress_callback: (progress: any) => {
          if (progress.status === 'progress' && progress.progress) {
            modelLoadingProgress = Math.round(progress.progress);
            console.log(`[DEBUG] Model loading progress: ${modelLoadingProgress}%`);
            if (onProgress) {
              onProgress(modelLoadingProgress);
            }
          } else if (progress.status === 'initiate') {
            console.log('[DEBUG] Starting model download...');
          } else if (progress.status === 'done') {
            console.log('[DEBUG] Model download complete.');
          }
        },
      }
    );
    console.log("[DEBUG] Model loaded successfully");
    modelLoadingProgress = 100;
    if (onProgress) {
      onProgress(100);
    }
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    lastLoadingError = `Model loading failed: ${errorMsg}`;
    console.error("[ERROR] Model loading failed:", error);
    throw error;
  } finally {
    isLoading = false;
  }
};


export const transcribeAudio = async (
  audioData: Float32Array | string
): Promise<{ text: string; confidence: number }> => {
  if (!transcriber) {
    console.log("[DEBUG] Model not loaded, initializing now...");
    await initializeSpeechRecognition();
  }

  if (!transcriber) {
    const errorMsg = "Speech recognition model not initialized";
    console.error("[ERROR]", errorMsg);
    throw new Error(errorMsg);
  }

  try {
    console.log("[DEBUG] Transcribing audio...");
    const result = await transcriber(audioData);
    console.log("[DEBUG] Transcription result:", result);

    const cleanedText = result.text?.trim() || "";
    // Simple confidence heuristic based on whether we got meaningful text
    const hasMeaningfulText = cleanedText.length > 2;
    const confidence = hasMeaningfulText ? 0.85 : 0.5;

    return {
      text: cleanedText,
      confidence,
    };
  } catch (error: any) {
    const errorMsg = `Error transcribing audio: ${error.message || String(error)}`;
    console.error("[ERROR]", errorMsg);
    throw error;
  }
};

export const analyzePronunciation = (
  transcribedText: string,
  targetText: string
): {
  accuracy: number;
  matchedWords: string[];
  missedWords: string[];
  extraWords: string[];
  feedback: string;
} => {
  const targetWords = normalizeText(targetText);
  const spokenWords = normalizeText(transcribedText);

  if (targetWords.length === 0) {
    return {
      accuracy: 0,
      matchedWords: [],
      missedWords: [],
      extraWords: spokenWords,
      feedback: "No target phrase provided.",
    };
  }

  const matrix = buildLevenshteinMatrix(targetWords, spokenWords);
  const { matchedWords, missedWords, extraWords } = extractWordDiff(targetWords, spokenWords, matrix);

  const maxLen = Math.max(targetWords.length, spokenWords.length) || 1;
  const distance = matrix[targetWords.length][spokenWords.length];
  const accuracy = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));

  let feedback = "";
  if (accuracy >= 90) {
    feedback = "Excellent pronunciation! Keep up the great work! 🌟";
  } else if (accuracy >= 70) {
    feedback = "Good job! A few words need more practice. 👍";
  } else if (accuracy >= 50) {
    feedback = "Nice try! Let's practice those tricky words again. 💪";
  } else {
    feedback = "Keep practicing! You're getting better every time. 🎯";
  }

  return {
    accuracy,
    matchedWords,
    missedWords,
    extraWords,
    feedback,
  };
};

export const isModelLoaded = (): boolean => {
  return transcriber !== null;
};
