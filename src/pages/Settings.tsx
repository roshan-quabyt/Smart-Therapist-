import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Eye, 
  Volume2, 
  Globe,
  Shield,
  Accessibility,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState([16]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Customize your app experience
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Profile
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-teal-500" />
            <div>
              <p className="font-semibold text-foreground">Alex Thompson</p>
              <p className="text-sm text-muted-foreground">alex@example.com</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Edit Profile
            </Button>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-3">
            <Eye className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Appearance
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="mb-3 block text-foreground">Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="gap-2"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="gap-2"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Notifications
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-foreground">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders for practice sessions
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sounds" className="text-foreground">
                  Sound Effects
                </Label>
                <p className="text-sm text-muted-foreground">
                  Play sounds during games and exercises
                </p>
              </div>
              <Switch
                id="sounds"
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
              />
            </div>
          </div>
        </motion.div>

        {/* Accessibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl bg-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-3">
            <Accessibility className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Accessibility
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="contrast" className="text-foreground">
                  High Contrast Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch
                id="contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="largetext" className="text-foreground">
                  Large Text
                </Label>
                <p className="text-sm text-muted-foreground">
                  Increase text size throughout the app
                </p>
              </div>
              <Switch
                id="largetext"
                checked={largeText}
                onCheckedChange={setLargeText}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="motion" className="text-foreground">
                  Reduced Motion
                </Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                id="motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
            <div>
              <Label className="text-foreground">Font Size</Label>
              <p className="mb-3 text-sm text-muted-foreground">
                Adjust the base font size
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">A</span>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  max={24}
                  min={12}
                  step={1}
                  className="flex-1"
                />
                <span className="text-lg text-muted-foreground">A</span>
                <span className="w-12 text-center text-sm font-medium text-foreground">
                  {fontSize}px
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save Settings
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
