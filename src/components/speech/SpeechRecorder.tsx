import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2, Volume2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AudioRecorder, loadAudioAsArrayBuffer } from "@/utils/speechRecording";
import {
  initializeSpeechRecognition,
  transcribeAudio,
  analyzePronunciation,
  isModelLoaded,
  lastLoadingError,
} from "@/utils/speechAnalysis";
import { toast } from "@/hooks/use-toast";

interface SpeechRecorderProps {
  targetText: string;
  onResult?: (result: {
    transcribedText: string;
    accuracy: number;
    feedback: string;
  }) => void;
}

export function SpeechRecorder({ targetText, onResult }: SpeechRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const [result, setResult] = useState<{
    transcribedText: string;
    accuracy: number;
    matchedWords: string[];
    missedWords: string[];
    feedback: string;
  } | null>(null);

  const recorderRef = useRef<AudioRecorder | null>(null);

  useEffect(() => {
    // Pre-load the model
    if (!isModelLoaded()) {
      setIsModelLoading(true);
      initializeSpeechRecognition((progress) => {
        setModelProgress(progress);
      })
        .then(() => {
          setIsModelLoading(false);
          setModelProgress(100);
        })
        .catch((error) => {
          console.error("Failed to load model:", error);
          setIsModelLoading(false);
          toast({
            title: "Model Loading Error",
            description: lastLoadingError || "Failed to load speech recognition. Please check your internet and refresh.",
            variant: "destructive",
          });
        });
    }
  }, []);

  const startRecording = async () => {
    try {
      recorderRef.current = new AudioRecorder();
      await recorderRef.current.start();
      setIsRecording(true);
      setResult(null);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Microphone Error",
        description: "Please allow microphone access to use speech recognition.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    setIsRecording(false);
    setIsProcessing(true);

    try {
      const audioBlob = await recorderRef.current.stop();
      const audioData = await loadAudioAsArrayBuffer(audioBlob);
      
      const transcription = await transcribeAudio(audioData);
      const analysis = analyzePronunciation(transcription.text, targetText);

      const finalResult = {
        transcribedText: transcription.text,
        ...analysis,
      };

      setResult(finalResult);
      onResult?.(finalResult);

      toast({
        title: `Accuracy: ${analysis.accuracy}%`,
        description: analysis.feedback,
      });
    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "Processing Error",
        description: "Failed to analyze your speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="space-y-6">
      {/* Target Text Display */}
      <div className="rounded-2xl bg-secondary p-6">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Volume2 className="h-4 w-4" />
          <span>Say this phrase:</span>
        </div>
        <p className="font-display text-2xl font-bold text-foreground">
          {targetText}
        </p>
      </div>

      {/* Model Loading Progress */}
      <AnimatePresence>
        {isModelLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl bg-muted p-4"
          >
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Downloading speech recognition model (approx. 150MB)... This may take 1-2 minutes.</span>
            </div>
            <Progress value={modelProgress > 0 ? modelProgress : undefined} className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording Button */}
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Button
            size="lg"
            onClick={handleRecordClick}
            disabled={isModelLoading || isProcessing}
            className={`h-20 w-20 rounded-full ${
              isRecording
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
        </motion.div>
        <p className="text-sm text-muted-foreground">
          {isModelLoading
            ? "Loading model..."
            : isProcessing
            ? "Analyzing your speech..."
            : isRecording
            ? "Tap to stop recording"
            : "Tap to start recording"}
        </p>
      </div>

      {/* Results Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Accuracy Score */}
            <div className="rounded-2xl bg-card p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Your Score
                </h3>
                <span
                  className={`text-3xl font-bold ${
                    result.accuracy >= 70
                      ? "text-success"
                      : result.accuracy >= 50
                      ? "text-warning"
                      : "text-destructive"
                  }`}
                >
                  {result.accuracy}%
                </span>
              </div>
              <Progress
                value={result.accuracy}
                className={`h-3 ${
                  result.accuracy >= 70
                    ? "[&>div]:bg-success"
                    : result.accuracy >= 50
                    ? "[&>div]:bg-warning"
                    : "[&>div]:bg-destructive"
                }`}
              />
            </div>

            {/* What You Said */}
            <div className="rounded-2xl bg-card p-6 shadow-card">
              <h3 className="mb-2 font-display font-bold text-foreground">
                What you said:
              </h3>
              <p className="text-muted-foreground">
                {result.transcribedText || "(No speech detected)"}
              </p>
            </div>

            {/* Word Analysis */}
            <div className="grid gap-4 sm:grid-cols-2">
              {result.matchedWords.length > 0 && (
                <div className="rounded-xl bg-success/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      Correct Words
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedWords.map((word, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-success/20 px-3 py-1 text-sm text-success"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {result.missedWords.length > 0 && (
                <div className="rounded-xl bg-destructive/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      Practice These
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missedWords.map((word, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-destructive/20 px-3 py-1 text-sm text-destructive"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Feedback */}
            <div className="rounded-2xl bg-primary/10 p-6 text-center">
              <p className="font-display text-lg font-bold text-primary">
                {result.feedback}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
