import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TherapistCard } from "@/components/therapists/TherapistCard";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Pediatric Speech Therapy",
    rating: 4.9,
    reviews: 127,
    experience: "12 years",
    fee: "$80/session",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Fluency & Stuttering",
    rating: 4.8,
    reviews: 98,
    experience: "8 years",
    fee: "$75/session",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emily Roberts",
    specialty: "Voice Disorders",
    rating: 4.9,
    reviews: 156,
    experience: "15 years",
    fee: "$90/session",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    available: false,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Articulation Therapy",
    rating: 4.7,
    reviews: 84,
    experience: "6 years",
    fee: "$70/session",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Lisa Martinez",
    specialty: "Cognitive-Communication",
    rating: 4.8,
    reviews: 112,
    experience: "10 years",
    fee: "$85/session",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 6,
    name: "Dr. David Kim",
    specialty: "Swallowing Disorders",
    rating: 4.6,
    reviews: 67,
    experience: "5 years",
    fee: "$65/session",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
    available: false,
  },
];

const Therapists = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Speech Therapists
            </h1>
            <p className="mt-1 text-muted-foreground">
              Find and book sessions with certified professionals
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative max-w-md"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty..."
            className="pl-10"
          />
        </motion.div>

        {/* Therapist Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {therapists.map((therapist, index) => (
            <TherapistCard
              key={therapist.id}
              {...therapist}
              delay={0.05 * index}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Therapists;
