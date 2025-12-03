import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const strengthsData = [
  { name: "Strengths", value: 72, color: "hsl(142, 71%, 45%)" },
  { name: "Areas to Improve", value: 28, color: "hsl(15, 85%, 60%)" },
];

const phonemeData = [
  { category: "Vowels", score: 85 },
  { category: "Consonants", score: 72 },
  { category: "Blends", score: 65 },
  { category: "Diphthongs", score: 78 },
  { category: "R-sounds", score: 58 },
  { category: "S-sounds", score: 82 },
];

export function SpeechAnalysis() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Strengths vs Weaknesses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-card p-6 shadow-card"
      >
        <h3 className="mb-2 font-display text-lg font-bold text-foreground">
          Overall Analysis
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Based on your recent sessions
        </p>

        <div className="flex items-center gap-6">
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={strengthsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {strengthsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {strengthsData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}
                </span>
                <span className="ml-auto font-semibold text-foreground">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Phoneme Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl bg-card p-6 shadow-card"
      >
        <h3 className="mb-2 font-display text-lg font-bold text-foreground">
          Phoneme Categories
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Performance by sound type
        </p>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={phonemeData}>
              <PolarGrid stroke="hsl(180, 20%, 88%)" />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: "hsl(200, 15%, 45%)", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "hsl(200, 15%, 45%)", fontSize: 10 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(174, 62%, 47%)"
                fill="hsl(174, 62%, 47%)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
