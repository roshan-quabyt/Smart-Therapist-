import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GameCard } from "@/components/games/GameCard";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  BookOpen, 
  Music, 
  Puzzle,
  Zap,
  Star,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const games = [
  {
    id: 1,
    title: "Word Pronunciation",
    description: "Practice pronouncing common words with AI-powered feedback on your accuracy.",
    icon: MessageSquare,
    difficulty: "Easy" as const,
    duration: "5 min",
    variant: "teal" as const,
  },
  {
    id: 2,
    title: "Sentence Builder",
    description: "Construct and speak complete sentences while improving fluency.",
    icon: BookOpen,
    difficulty: "Medium" as const,
    duration: "8 min",
    variant: "purple" as const,
  },
  {
    id: 3,
    title: "Phoneme Practice",
    description: "Focus on specific sounds that need improvement with targeted exercises.",
    icon: Music,
    difficulty: "Hard" as const,
    duration: "10 min",
    variant: "coral" as const,
  },
  {
    id: 4,
    title: "Story Telling",
    description: "Read short stories aloud and receive detailed pronunciation analysis.",
    icon: Puzzle,
    difficulty: "Medium" as const,
    duration: "12 min",
    variant: "blue" as const,
  },
  {
    id: 5,
    title: "Speed Challenge",
    description: "Test your speaking speed while maintaining clarity and accuracy.",
    icon: Zap,
    difficulty: "Hard" as const,
    duration: "5 min",
    variant: "coral" as const,
    locked: true,
  },
  {
    id: 6,
    title: "Daily Challenge",
    description: "Complete today's special challenge to earn bonus points and badges.",
    icon: Star,
    difficulty: "Medium" as const,
    duration: "7 min",
    variant: "purple" as const,
  },
];

const Games = () => {
  const [filter, setFilter] = useState("all");

  const handlePlay = (gameTitle: string) => {
    toast({
      title: "Starting Game",
      description: `Loading ${gameTitle}... Get ready to practice!`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Speech Games
          </h1>
          <p className="mt-1 text-muted-foreground">
            Fun and interactive exercises to improve your speech
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "Easy", "Medium", "Hard"].map((level) => (
              <Button
                key={level}
                variant={filter === level ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(level)}
              >
                {level === "all" ? "All Levels" : level}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games
            .filter((g) => filter === "all" || g.difficulty === filter)
            .map((game, index) => (
              <GameCard
                key={game.id}
                {...game}
                delay={0.1 * index}
                onPlay={() => handlePlay(game.title)}
              />
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Games;
