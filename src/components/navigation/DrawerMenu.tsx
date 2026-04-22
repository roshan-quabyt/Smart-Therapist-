import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Gamepad2, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",  route: "/" },
  { icon: MessageSquare,   label: "Practice",   route: "/practice" },
  { icon: Gamepad2,        label: "Games",      route: "/games" },
  { icon: Users,           label: "Therapists", route: "/therapists" },
  { icon: BarChart2,       label: "Progress",   route: "/progress" },
  { icon: Settings,        label: "Settings",   route: "/settings" },
];

export const DrawerMenu: React.FC = () => {
  const { isMenuOpen, closeMenu } = useNavigation();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-[75vw] max-w-[280px] bg-[#0F1923] p-6 shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Logo/Title Area */}
              <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                  <span className="text-xl font-bold text-white">T</span>
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  THERA-SMART
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    onClick={closeMenu}
                    className={({ isActive }) => `
                      flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200
                      ${isActive 
                        ? 'bg-[#00BFA5] text-white shadow-lg shadow-[#00BFA5]/20' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="mt-auto space-y-6 pt-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 transition-all ${
                      theme === 'light' ? 'bg-[#00BFA5] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span className="text-xs font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 transition-all ${
                      theme === 'dark' ? 'bg-[#00BFA5] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span className="text-xs font-medium">Dark</span>
                  </button>
                </div>

                {/* Tagline */}
                <div className="px-2">
                  <p className="text-sm font-medium text-[#00BFA5]">
                    Speech Therapy
                  </p>
                  <p className="text-xs text-gray-500">
                    Made Fun & Interactive
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    closeMenu();
                    signOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-gray-400 transition-all hover:bg-red-500/10 hover:text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
