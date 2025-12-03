import { pipeline, env } from "@huggingface/transformers";

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

let transcriber: any = null;
let isLoading = false;

export const initializeSpeechRecognition = async (
  onProgress?: (progress: number) => void
): Promise<void> => {
  if (transcriber || isLoading) return;
  
  isLoading = true;
  console.log("Initializing speech recognition model...");

  try {
    transcriber = await pipeline(
      "automatic-speech-recognition",
      "onnx-community/whisper-tiny.en",
      {
        device: "webgpu",
        progress_callback: (progress: any) => {
          if (progress.progress && onProgress) {
            onProgress(Math.round(progress.progress));
          }
        },
      }
    );
    console.log("Speech recognition model loaded successfully");
  } catch (error) {
    console.error("Error loading speech recognition model:", error);
    // Fallback to CPU if WebGPU not available
    try {
      transcriber = await pipeline(
        "automatic-speech-recognition",
        "onnx-community/whisper-tiny.en",
        {
          progress_callback: (progress: any) => {
            if (progress.progress && onProgress) {
              onProgress(Math.round(progress.progress));
            }
          },
        }
      );
      console.log("Speech recognition model loaded (CPU fallback)");
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw fallbackError;
    }
  } finally {
    isLoading = false;
  }
};

export const transcribeAudio = async (
  audioData: Float32Array | string
): Promise<{ text: string; confidence: number }> => {
  if (!transcriber) {
    await initializeSpeechRecognition();
  }

  if (!transcriber) {
    throw new Error("Speech recognition model not initialized");
  }

  try {
    const result = await transcriber(audioData);
    console.log("Transcription result:", result);
    
    return {
      text: result.text?.trim() || "",
      confidence: 0.85, // Whisper doesn't provide confidence scores directly
    };
  } catch (error) {
    console.error("Error transcribing audio:", error);
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
  feedback: string;
} => {
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);

  const targetWords = normalizeText(targetText);
  const spokenWords = normalizeText(transcribedText);

  const matchedWords: string[] = [];
  const missedWords: string[] = [];

  targetWords.forEach((word) => {
    if (spokenWords.includes(word)) {
      matchedWords.push(word);
    } else {
      missedWords.push(word);
    }
  });

  const accuracy =
    targetWords.length > 0
      ? Math.round((matchedWords.length / targetWords.length) * 100)
      : 0;

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
    feedback,
  };
};

export const isModelLoaded = (): boolean => {
  return transcriber !== null;
};
