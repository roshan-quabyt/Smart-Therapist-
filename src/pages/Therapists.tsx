import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TherapistCard } from "@/components/therapists/TherapistCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatWithAI } from "@/services/chatService";

interface Therapist
{
	id: number;
	name: string;
	specialty: string;
	rating: number;
	reviews: number;
	experience: string;
	image: string;
	available: boolean;
	systemPrompt: string; // Add this
}

const fallbackTherapists: Therapist[] = [
	{
		id: 1,
		name: "Dr. Sarah Johnson",
		specialty: "Pediatric Speech Therapy",
		rating: 4.9,
		reviews: 127,
		experience: "12 years",
		image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
		available: true,
		systemPrompt: "You are Dr. Sarah Johnson, an empathetic pediatric speech therapist...",
	},
	{
		id: 2,
		name: "Dr. Michael Chen",
		specialty: "Fluency & Stuttering",
		rating: 4.8,
		reviews: 98,
		experience: "8 years",
		image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
		available: true,
		systemPrompt: "You are Dr. Michael Chen, a specialist in stuttering and fluency disorders...",
	},
	{
		id: 3,
		name: "Dr. Emily Roberts",
		specialty: "Voice Disorders",
		rating: 4.9,
		reviews: 156,
		experience: "15 years",
		image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
		available: false,
		systemPrompt: "You are Dr. Emily Roberts, a speech therapist specializing in voice disorders...",
	},
	{
		id: 4,
		name: "Dr. James Wilson",
		specialty: "Articulation Therapy",
		rating: 4.7,
		reviews: 84,
		experience: "6 years",
		image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
		available: true,
		systemPrompt: "You are Dr. James Wilson, specializing in articulation therapy...",
	},
	{
		id: 5,
		name: "Dr. Lisa Martinez",
		specialty: "Cognitive-Communication",
		rating: 4.8,
		reviews: 112,
		experience: "10 years",
		image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face",
		available: true,
		systemPrompt: "You are Dr. Lisa Martinez, an expert in cognitive-communication therapy...",
	},
	{
		id: 6,
		name: "Dr. David Kim",
		specialty: "Swallowing Disorders",
		rating: 4.6,
		reviews: 67,
		experience: "5 years",
		image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
		available: false,
		systemPrompt: "You are Dr. David Kim, an SLP specializing in swallowing disorders...",
	}
];

const Therapists = () =>
{
	// Fetch therapists from Supabase
	const { data: therapists, isLoading } = useQuery({
		queryKey: ["therapists"],
		queryFn: async () =>
		{
			const { data, error } = await supabase
				.from("therapists")
				.select("*")
				.order("id");

			if (error || !data || data.length === 0)
			{
				console.error("Error fetching therapists or no data, using fallback:", error);
				return fallbackTherapists;
			}

			// Map DB columns to our interface if generic names differ, 
			// but here they match mostly. DB has snake_case usually, need to check.
			// The SQL used: name, specialty, rating, reviews_count, experience, fee, image_url, available, system_prompt
			// Our interface: id, name, specialty, rating, reviews, experience, image, available, systemPrompt

			return (data || []).map(t => ({
				id: t.id,
				name: t.name,
				specialty: t.specialty,
				rating: Number(t.rating),
				reviews: t.reviews_count,
				experience: t.experience,
				image: t.image_url,
				available: t.available,
				systemPrompt: t.system_prompt
			}));
		}
	});

	return (
		<DashboardLayout>
			<div className="space-y-6 sm:space-y-8 lg:space-y-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
				>
					<div>
						<h1 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
							Speech Therapists
						</h1>
						<p className="mt-1 text-muted-foreground">
							Find and book sessions with certified professionals
						</p>
					</div>
					<Button variant="outline" className="gap-2 w-full sm:w-auto">
						<SlidersHorizontal className="h-4 w-4" />
						Filters
					</Button>
				</motion.div>

				{/* Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="relative w-full max-w-md"
				>
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search by name or specialty..."
						className="pl-10"
					/>
				</motion.div>

				{/* Therapist Grid */}
				{isLoading ? (
					<div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="h-[400px] rounded-2xl bg-card/50 animate-pulse" />
						))}
					</div>
				) : (
					<div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
						{therapists?.map((therapist, index) => (
							<TherapistCard
								key={therapist.id}
								id={therapist.id}
								name={therapist.name}
								specialty={therapist.specialty}
								rating={therapist.rating}
								reviews={therapist.reviews}
								experience={therapist.experience}
								image={therapist.image}
								available={therapist.available}
								delay={index * 0.1}
								systemPrompt={therapist.systemPrompt}
							/>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
};

export default Therapists;
