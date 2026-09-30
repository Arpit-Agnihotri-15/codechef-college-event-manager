import React from "react";
import { useClub } from "../../context/ClubContext";
import { CLUB_STATS } from "../../data/initialData";
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Code2, 
  CheckCircle2, 
  Trophy,
  Zap
} from "lucide-react";

export const HeroSection = () => {
  const { setCurrentView } = useClub();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      
      {/* Neo-Brutalist Geometric Accent Shapes */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-[#FFE600] border-4 border-black rounded-full shadow-[6px_6px_0px_0px_#000] hidden lg:block -rotate-12 pointer-events-none flex items-center justify-center font-black text-xs uppercase text-center p-2">
        ⚡ 100% Student Led
      </div>

      <div className="absolute bottom-12 left-8 w-20 h-20 bg-[#00F59B] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000] hidden lg:block rotate-12 pointer-events-none flex items-center justify-center font-black text-xs uppercase">
        ★ OD Approved
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] mb-8 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F59B] border border-black animate-ping" />
          <span className="text-xs font-black uppercase text-black tracking-wider">
            Official CodeChef Campus Chapter
          </span>
          <span className="text-black/40 font-bold">•</span>
          <span className="text-xs font-black uppercase text-[#FF5A5F]">
            Dept of CSE
          </span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.05] max-w-5xl mx-auto">
          BUILD. COMPETE. <br />
          <span className="bg-[#FFE600] px-4 py-1 border-[3px] border-black shadow-[6px_6px_0px_0px_#000] inline-block -rotate-1 my-2">
            CRACK THE CODE.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl font-bold text-black/80 max-w-3xl mx-auto leading-relaxed">
          The high-velocity developer hub for aspiring software engineers, competitive programmers, and hackathon builders. Rated Division contests, hands-on bootcamps, and official On-Duty attendance.
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentView("events");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="brutal-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm uppercase bg-[#FFE600] text-black shadow-[6px_6px_0px_0px_#000]"
          >
            <span>Explore Events Schedule</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <a
            href="#featured-event"
            className="brutal-btn w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-black text-sm uppercase bg-white text-black shadow-[6px_6px_0px_0px_#000]"
          >
            <Sparkles className="w-4 h-4 text-[#FF5A5F] stroke-[2.5]" />
            <span>Featured Contest</span>
          </a>
        </div>

        {/* Verified Perks Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-black uppercase text-black">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 className="w-4 h-4 text-[#00F59B] stroke-[3]" />
            <span>On-Duty (OD) Approved</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 className="w-4 h-4 text-[#00F59B] stroke-[3]" />
            <span>Official Certificates</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 className="w-4 h-4 text-[#00F59B] stroke-[3]" />
            <span>100% Free for Students</span>
          </div>
        </div>

        {/* Milestone Metric Cards */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {CLUB_STATS.map((stat, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_0px_#000] ${stat.color} text-black text-left flex flex-col justify-between`}
            >
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-black uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
