import { motion } from "framer-motion";
import { Star, MessageCircle, Award, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TherapistChat } from "./TherapistChat";
import { BookingModal } from "./BookingModal";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface TherapistCardProps
{
	id: number;
	name: string;
	specialty: string;
	rating: number;
	reviews: number;
	experience: string;
	image: string;
	available: boolean;
	delay?: number;
	systemPrompt: string;
}

export function TherapistCard({
	id,
	name,
	specialty,
	rating,
	reviews,
	experience,
	image,
	available,
	delay = 0,
	systemPrompt,
}: TherapistCardProps)
{
	const [showChat, setShowChat] = useState(false);
	const [showBooking, setShowBooking] = useState(false);
	const { user } = useAuth();
	const { toast } = useToast();

	const handleChat = () =>
	{
		if (!user)
		{
			toast({
				title: "Please log in",
				description: "You need to be logged in to chat with a therapist.",
				variant: "destructive",
			});
			return;
		}
		setShowChat(true);
	};

	const handleBook = () => {
		setShowBooking(true);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay }}
			className="group flex flex-col rounded-2xl bg-card p-4 sm:p-5 lg:p-6 shadow-card transition-all hover:shadow-lg"
		>
			<div className="flex gap-4">
				{/* Avatar */}
				<div className="relative">
					<div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-secondary">
						<img
							src={image}
							alt={name}
							className="h-full w-full object-cover transition-transform group-hover:scale-105"
							loading="lazy" // Lazy load for performance
						/>
					</div>
					{available && (
						<div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-card bg-success" />
					)}
				</div>

				{/* Info */}
				<div className="flex-1 overflow-hidden">
					<div className="flex items-start justify-between">
						<div className="truncate pr-2">
							<h3 className="font-display text-lg font-bold text-foreground">
								{name}
							</h3>
							<p className="text-sm text-primary">{specialty}</p>
						</div>
						<div className="flex shrink-0 items-center gap-1 rounded-full bg-warning/10 px-2 py-1">
							<Star className="h-4 w-4 fill-warning text-warning" />
							<span className="text-sm font-semibold text-foreground">
								{rating}
							</span>
						</div>
					</div>

					<div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
						<span className="flex items-center gap-1">
							<Award className="h-4 w-4 shrink-0" />
							{experience}
						</span>
						<span>•</span>
						<span>{reviews} reviews</span>
					</div>
				</div>
			</div>

			{/* Footer - Pushed to bottom using flex-1 / mt-auto */}
			<div className="mt-auto pt-5">
				<div className="flex items-center justify-between border-t border-border pt-4">
					<div className="flex w-full gap-2">
						<Button
							variant="outline"
							className="w-full flex-1"
							onClick={handleBook}
						>
							<CalendarPlus className="mr-2 h-4 w-4" />
							Book
						</Button>
						<Button
							className="w-full flex-1"
							onClick={handleChat}
						>
							<MessageCircle className="mr-2 h-4 w-4" />
							Chat
						</Button>
					</div>
				</div>
			</div>

			{/* Modals */}
			<TherapistChat
				isOpen={showChat}
				onClose={() => setShowChat(false)}
				therapistId={id}
				therapistName={name}
				specialty={specialty}
				systemPrompt={systemPrompt}
			/>

			<BookingModal 
				isOpen={showBooking}
				onClose={() => setShowBooking(false)}
				therapistId={id}
				therapistName={name}
			/>
		</motion.div>
	);
}

