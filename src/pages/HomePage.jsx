import React from "react";
import { useClub } from "../context/ClubContext";
import { HeroSection } from "../components/student/HeroSection";
import { MarqueeStrip } from "../components/common/MarqueeStrip";
import { FeaturedEvent } from "../components/student/FeaturedEvent";
import { EventCard } from "../components/student/EventCard";
import { ClubDomains } from "../components/student/ClubDomains";
import { FaqSection } from "../components/student/FaqSection";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export const HomePage = () => {
  const { events, setCurrentView } = useClub();

  const upcomingPreview = events.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* 1. Hero Section with Neo-Brutalist geometry & stats */}
      <HeroSection />

      {/* 2. Infinite Moving Marquee Ribbon */}
      <MarqueeStrip bgColor="bg-[#FFE600]" textColor="text-black" />

      {/* 3. Flagship Featured Event with live countdown */}
      <FeaturedEvent />

      {/* 4. Upcoming Events Preview Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded bg-[#00D2FF] text-black border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
                Campus Calendar
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight pt-1">
                UPCOMING CHAPTER EVENTS
              </h2>
            </div>

            <button
              onClick={() => {
                setCurrentView("events");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="brutal-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase bg-[#FFE600] text-black"
            >
              <span>View All {events.length} Events</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingPreview.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. Infinite Moving Marquee Ribbon (Coral Variant) */}
      <MarqueeStrip bgColor="bg-[#FF5A5F]" textColor="text-white" />

      {/* 6. Technical Wings & Tracks Snapshot */}
      <ClubDomains />

      {/* 7. Student FAQs */}
      <FaqSection />
    </div>
  );
};
