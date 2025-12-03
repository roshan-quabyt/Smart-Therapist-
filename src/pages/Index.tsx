import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { RecentGames } from "@/components/dashboard/RecentGames";
import { StreakBanner } from "@/components/dashboard/StreakBanner";
import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Mic, 
  Trophy, 
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, Alex! 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Ready for your speech practice today?
            </p>
          </div>
          <Link to="/games">
            <Button className="gap-2">
              <Mic className="h-4 w-4" />
              Start Practice
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Streak Banner */}
        <StreakBanner />

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Sessions"
            value={42}
            subtitle="This month"
            icon={Gamepad2}
            trend="up"
            trendValue="+12%"
            delay={0}
          />
          <StatsCard
            title="Avg. Accuracy"
            value="85%"
            subtitle="Speech score"
            icon={Mic}
            trend="up"
            trendValue="+5%"
            variant="primary"
            delay={0.1}
          />
          <StatsCard
            title="Achievements"
            value={12}
            subtitle="Badges earned"
            icon={Trophy}
            trend="neutral"
            trendValue="2 new"
            delay={0.2}
          />
          <StatsCard
            title="Next Session"
            value="Today"
            subtitle="3:00 PM"
            icon={Calendar}
            variant="accent"
            delay={0.3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ProgressChart />
          <RecentGames />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          <Link to="/games" className="block">
            <div className="group rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Play Games
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Practice speech with fun interactive games
              </p>
            </div>
          </Link>
          <Link to="/therapists" className="block">
            <div className="group rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-accent">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Book Session
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Schedule with a speech therapist
              </p>
            </div>
          </Link>
          <Link to="/progress" className="block">
            <div className="group rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success">
                <Trophy className="h-6 w-6 text-success-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                View Progress
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Track your improvement over time
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
