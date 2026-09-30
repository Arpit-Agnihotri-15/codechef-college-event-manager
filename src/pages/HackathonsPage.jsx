import React from "react";
import { PAST_HACKATHONS } from "../data/initialData";
import { Trophy, Award, Star, ExternalLink, Flame, Users, Calendar, ArrowRight } from "lucide-react";
import { useClub } from "../context/ClubContext";

export const HackathonsPage = () => {
  const { setCurrentView } = useClub();

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Top Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FFE600] border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
          <Trophy className="w-4 h-4 text-black stroke-[2.5]" />
          <span>Campus Hall of Fame</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
          PAST HACKATHONS & WINNERS
        </h1>
        <p className="text-base font-bold text-black/80 max-w-3xl leading-relaxed">
          Celebrating campus builders who spent 24 sleepless hours hacking together groundbreaking software, winning cash prizes, and securing angel incubation grants.
        </p>
      </div>

      {/* Hall of Fame Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PAST_HACKATHONS.map((hack, i) => (
          <div
            key={i}
            className="brutal-card rounded-2xl bg-white p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  style={{ backgroundColor: hack.color }}
                  className="px-3 py-1 rounded-lg border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]"
                >
                  {hack.edition}
                </span>
                <span className="text-xs font-bold text-black/70 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {hack.date}
                </span>
              </div>

              <div className="p-3 bg-[#FFFDF8] border-2 border-black rounded-xl space-y-1">
                <div className="text-[10px] font-black uppercase text-black/60">Winner Team</div>
                <div className="text-base font-black text-black">{hack.winnerTeam}</div>
              </div>

              <div>
                <div className="text-[10px] font-black uppercase text-black/60">Winning Project</div>
                <p className="text-xs font-bold text-black leading-relaxed mt-0.5">
                  {hack.project}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-black flex items-center justify-between">
              <span className="text-xs font-black text-[#FF5A5F] bg-black px-2.5 py-1 rounded border border-black">
                {hack.prize}
              </span>
              <div className="text-xs font-black text-black/80">
                {hack.participants}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Annual Hackathon Callout Banner */}
      <div className="p-8 sm:p-10 rounded-3xl border-4 border-black bg-[#FFE600] shadow-[8px_8px_0px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-black text-[#FFE600] font-black text-xs uppercase px-2.5 py-1 rounded border border-black shadow-[2px_2px_0px_0px_#000]">
            COMING UP NEXT
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black">
            DevHacks '26 is scheduled for November!
          </h3>
          <p className="text-xs sm:text-sm font-bold text-black/80 max-w-xl">
            24 hours of non-stop coding, ₹1,00,000 in total bounties, industry judges, and free meals. Team registrations are open now.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView("events");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="brutal-btn shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-black text-[#FFE600] font-black text-sm uppercase shadow-[4px_4px_0px_0px_#000]"
        >
          <span>Register Your Team</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

    </div>
  );
};
