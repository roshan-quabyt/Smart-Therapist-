import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SpeechAnalysis } from "@/components/progress/SpeechAnalysis";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";

const monthlyData = [
  { month: "Jan", accuracy: 62, fluency: 58, pronunciation: 65 },
  { month: "Feb", accuracy: 68, fluency: 63, pronunciation: 70 },
  { month: "Mar", accuracy: 72, fluency: 68, pronunciation: 74 },
  { month: "Apr", accuracy: 78, fluency: 74, pronunciation: 79 },
  { month: "May", accuracy: 82, fluency: 78, pronunciation: 83 },
  { month: "Jun", accuracy: 85, fluency: 82, pronunciation: 86 },
];

const milestones = [
  { title: "First Session Complete", date: "Jan 5, 2024", icon: Award, completed: true },
  { title: "7-Day Streak", date: "Jan 12, 2024", icon: Target, completed: true },
  { title: "75% Accuracy", date: "Mar 20, 2024", icon: TrendingUp, completed: true },
  { title: "30-Day Streak", date: "In Progress", icon: Calendar, completed: false },
];

const Progress = () => {
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
            Your Progress
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track your speech therapy journey and improvements
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-4"
        >
          {[
            { label: "Total Sessions", value: "42", change: "+8 this month" },
            { label: "Avg. Accuracy", value: "85%", change: "+23% from start" },
            { label: "Practice Hours", value: "18.5h", change: "+4.2h this month" },
            { label: "Current Streak", value: "7 days", change: "Personal best!" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-card p-5 shadow-card"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-primary">{stat.change}</p>
            </div>
          ))}
        </motion.div>

        {/* Speech Analysis Charts */}
        <SpeechAnalysis />

        {/* Long-term Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                6-Month Progress
              </h3>
              <p className="text-sm text-muted-foreground">
                Your improvement over time
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Fluency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Pronunciation</span>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 20%, 88%)" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(200, 15%, 45%)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(200, 15%, 45%)", fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(180, 20%, 88%)",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(174, 62%, 47%)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(174, 62%, 47%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="fluency"
                  stroke="hsl(15, 85%, 60%)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(15, 85%, 60%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="pronunciation"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(142, 71%, 45%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <h3 className="mb-6 font-display text-lg font-bold text-foreground">
            Milestones
          </h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.title}
                className={`flex items-center gap-4 rounded-xl p-4 ${
                  milestone.completed ? "bg-success/10" : "bg-secondary"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    milestone.completed ? "bg-success" : "bg-muted"
                  }`}
                >
                  <milestone.icon
                    className={`h-5 w-5 ${
                      milestone.completed ? "text-success-foreground" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{milestone.title}</p>
                  <p className="text-sm text-muted-foreground">{milestone.date}</p>
                </div>
                {milestone.completed && (
                  <span className="rounded-full bg-success px-3 py-1 text-xs font-medium text-success-foreground">
                    Complete
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
