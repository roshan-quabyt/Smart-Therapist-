import React from "react";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import { HamburgerButton } from "../navigation/HamburgerButton";
import { DrawerMenu } from "../navigation/DrawerMenu";
import { Link } from "react-router-dom";

const DashboardLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isMenuOpen, toggleMenu } = useNavigation();

	return (
		<div className="min-h-screen bg-[#0F1923]">
			{/* Header */}
			<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-[#0F1923]/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
				<div className="flex items-center gap-4">
					<HamburgerButton isOpen={isMenuOpen} onToggle={toggleMenu} />
					<Link to="/" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<span className="text-sm font-bold text-white">T</span>
						</div>
						<span className="hidden font-display text-lg font-bold tracking-tight text-white sm:block">
							THERA-SMART
						</span>
					</Link>
				</div>

				<div className="flex items-center gap-4">
					{/* Placeholder for Profile/Notifications if needed */}
					<div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/20" />
				</div>
			</header>

			{/* Drawer Navigation */}
			<DrawerMenu />

			{/* Main Content */}
			<main className="flex-1">
				<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
		</div>
	);
};

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<NavigationProvider>
			<DashboardLayoutContent>{children}</DashboardLayoutContent>
		</NavigationProvider>
	);
};
