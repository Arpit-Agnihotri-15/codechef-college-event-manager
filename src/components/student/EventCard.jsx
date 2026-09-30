import React from "react";
import { useClub } from "../../context/ClubContext";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles,
  Clock,
  Tag
} from "lucide-react";

export const EventCard = ({ event }) => {
  const { setRegisterModalEvent, setDetailsModalEvent } = useClub();

  const dateObj = new Date(event.date);
  const monthStr = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const dayStr = dateObj.getDate();
  const timeStr = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const seatsLeft = Math.max(0, event.capacity - (event.registeredCount || 0));
  const capacityPercent = Math.min(100, Math.round(((event.registeredCount || 0) / event.capacity) * 100));
  const isFull = seatsLeft === 0;

  // Solid color rotation based on category
  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Competitive Programming": return "bg-[#FFE600]";
      case "Hackathons": return "bg-[#FF5A5F] text-white";
      case "Web Development": return "bg-[#00D2FF]";
      case "AI & Machine Learning": return "bg-[#00F59B]";
      default: return "bg-[#B388FF]";
    }
  };

  const badgeColor = getCategoryColor(event.category);

  return (
    <div className="brutal-card rounded-2xl bg-white overflow-hidden flex flex-col justify-between group">
      
      {/* Banner with Neo-Brutalist Date Block & Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b-[3px] border-black bg-slate-100">
        <img
          src={event.banner || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Floating Calendar Date Pill */}
        <div className="absolute top-3 left-3 bg-[#FFE600] border-2 border-black rounded-lg px-3 py-1 shadow-[3px_3px_0px_0px_#000] text-center">
          <div className="text-[10px] font-black text-black uppercase leading-none">{monthStr}</div>
          <div className="text-lg font-black text-black leading-none mt-0.5">{dayStr}</div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#000] ${badgeColor}`}>
            {event.category}
          </span>
        </div>

        {/* Live Ribbon */}
        {event.isFeatured && (
          <div className="absolute bottom-3 left-3 bg-black text-[#FFE600] border border-black font-black text-[10px] uppercase px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_#FFE600] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFE600]" />
            <span>Featured Spotlight</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Title */}
          <h3 
            onClick={() => setDetailsModalEvent(event)}
            className="text-base font-black text-black tracking-tight line-clamp-2 hover:text-[#2563EB] cursor-pointer transition-colors"
          >
            {event.title}
          </h3>

          {/* Time & Venue */}
          <div className="space-y-1 text-xs font-bold text-black/75">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              <span>{timeStr} • Campus Schedule</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-black/80 font-medium line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-black border border-black"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Capacity / Slots Meter */}
        <div className="space-y-1.5 pt-2 border-t-2 border-black/10">
          <div className="flex items-center justify-between text-[11px] font-black text-black">
            <span>Seat Registration</span>
            <span>{event.registeredCount || 0} / {event.capacity} Claimed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 border-2 border-black rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                capacityPercent > 85 ? "bg-[#FF5A5F]" : capacityPercent > 60 ? "bg-[#FFE600]" : "bg-[#00F59B]"
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setDetailsModalEvent(event)}
            className="brutal-btn py-2 px-3 rounded-xl text-xs font-black uppercase bg-white text-black text-center"
          >
            Details
          </button>

          <button
            disabled={isFull}
            onClick={() => setRegisterModalEvent(event)}
            className={`brutal-btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black uppercase transition-all ${
              isFull
                ? "bg-slate-300 text-slate-500 cursor-not-allowed border-black"
                : "bg-[#FFE600] hover:bg-[#FFD700] text-black"
            }`}
          >
            <span>{isFull ? "Full" : "Register"}</span>
            {!isFull && <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>

      </div>

    </div>
  );
};
