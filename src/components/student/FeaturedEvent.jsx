import React, { useState, useEffect } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Award,
  CheckCircle2,
  Zap
} from "lucide-react";

export const FeaturedEvent = () => {
  const { events, setRegisterModalEvent, setDetailsModalEvent } = useClub();

  const featuredEvent = events.find((e) => e.isFeatured) || events[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    if (!featuredEvent) return;

    const calculateTime = () => {
      const targetTime = new Date(featuredEvent.date).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [featuredEvent]);

  if (!featuredEvent) return null;

  const seatsLeft = Math.max(0, featuredEvent.capacity - (featuredEvent.registeredCount || 0));
  const capacityPercent = Math.min(100, Math.round(((featuredEvent.registeredCount || 0) / featuredEvent.capacity) * 100));
  const isFull = seatsLeft === 0;

  const dateObj = new Date(featuredEvent.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <section id="featured-event" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#FF5A5F] text-white border-2 border-black rounded-lg text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-white" /> Flagship Campus Clash
          </span>
          <span className="text-xs font-black text-black uppercase tracking-widest hidden sm:inline">
            // LIVE REGISTRATION STAGE
          </span>
        </div>

        {/* Neo-Brutalist Featured Hero Card */}
        <div className="rounded-3xl border-4 border-black bg-white shadow-[10px_10px_0px_0px_#000] overflow-hidden">
          
          {/* Decorative Diagonal Caution Stripe Header Bar */}
          <div className="h-4 stripe-caution border-b-4 border-black" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    {featuredEvent.category}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide bg-[#00F59B] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                    Open to All Batches
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide bg-[#00D2FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    {featuredEvent.entryFee || "Free Entry"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-[1.15]">
                  {featuredEvent.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-black/80 font-medium leading-relaxed">
                  {featuredEvent.description}
                </p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-black bg-[#FFFDF8] shadow-[3px_3px_0px_0px_#000]">
                    <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase text-black">Date & Time</div>
                      <div className="text-xs font-bold text-black/80 mt-0.5">{formattedDate}</div>
                      <div className="text-[11px] font-semibold text-black/60">{formattedTime} onwards</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-black bg-[#FFFDF8] shadow-[3px_3px_0px_0px_#000]">
                    <div className="w-8 h-8 rounded-lg bg-[#00D2FF] border-2 border-black flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase text-black">Campus Location</div>
                      <div className="text-xs font-bold text-black/80 mt-0.5">{featuredEvent.venue}</div>
                    </div>
                  </div>
                </div>

                {/* Bright Retro Countdown Grid */}
                <div className="p-4 rounded-2xl bg-[#FFE600] border-[3px] border-black shadow-[5px_5px_0px_0px_#000]">
                  <div className="flex items-center justify-between text-xs font-black uppercase text-black mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 stroke-[3]" /> Contest Commences In
                    </span>
                    <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-mono">
                      LIVE TICKER
                    </span>
                  </div>

                  {timeLeft.isExpired ? (
                    <div className="text-black font-black text-base py-2">
                      Event is currently underway or concluded!
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center font-mono">
                      <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000]">
                        <div className="text-2xl sm:text-3xl font-black text-black">{String(timeLeft.days).padStart(2, "0")}</div>
                        <div className="text-[10px] font-black uppercase text-black/70 mt-1">Days</div>
                      </div>
                      <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000]">
                        <div className="text-2xl sm:text-3xl font-black text-black">{String(timeLeft.hours).padStart(2, "0")}</div>
                        <div className="text-[10px] font-black uppercase text-black/70 mt-1">Hours</div>
                      </div>
                      <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000]">
                        <div className="text-2xl sm:text-3xl font-black text-black">{String(timeLeft.minutes).padStart(2, "0")}</div>
                        <div className="text-[10px] font-black uppercase text-black/70 mt-1">Mins</div>
                      </div>
                      <div className="bg-black text-[#FFE600] border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000]">
                        <div className="text-2xl sm:text-3xl font-black text-[#FFE600]">{String(timeLeft.seconds).padStart(2, "0")}</div>
                        <div className="text-[10px] font-black uppercase text-white/80 mt-1">Secs</div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  disabled={isFull}
                  onClick={() => setRegisterModalEvent(featuredEvent)}
                  className={`brutal-btn w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm uppercase transition-all ${
                    isFull
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed border-black"
                      : "bg-[#00F59B] hover:bg-[#00E08B] text-black shadow-[4px_4px_0px_0px_#000]"
                  }`}
                >
                  <span>{isFull ? "Event Housefull" : "Register For Flagship Event"}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  onClick={() => setDetailsModalEvent(featuredEvent)}
                  className="brutal-btn w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-sm uppercase bg-white text-black text-center"
                >
                  Rules & Agenda
                </button>
              </div>

            </div>

            {/* Right Poster & Slots Info (5 cols) */}
            <div className="lg:col-span-5 bg-[#FFFDF8] p-6 sm:p-8 flex flex-col justify-between border-t-4 lg:border-t-0 lg:border-l-4 border-black space-y-6">
              
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border-[3px] border-black shadow-[5px_5px_0px_0px_#000] relative bg-slate-100">
                <img
                  src={featuredEvent.banner}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-white flex items-center justify-between text-xs">
                  <span className="font-black text-[#FFE600] uppercase">Official OD Approved</span>
                  <span className="font-bold">Carry College ID</span>
                </div>
              </div>

              {/* Capacity Meter */}
              <div className="p-4 rounded-xl border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-black uppercase text-black">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 stroke-[3]" /> Registration Slots
                  </span>
                  <span>
                    {featuredEvent.registeredCount || 0} / {featuredEvent.capacity} Claimed
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 border-2 border-black rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      capacityPercent > 85 ? "bg-[#FF5A5F]" : "bg-[#00F59B]"
                    }`}
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-black/70">
                  <span>{seatsLeft} seats remaining</span>
                  <span>{capacityPercent}% filled</span>
                </div>
              </div>

              {/* Coordinator Pill */}
              {featuredEvent.coordinator && (
                <div className="p-3 rounded-xl border-2 border-black bg-[#00D2FF]/20 text-xs font-bold text-black">
                  <span className="font-black uppercase">Lead Coordinator:</span> {featuredEvent.coordinator}
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
