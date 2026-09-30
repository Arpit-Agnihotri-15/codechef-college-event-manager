import React from "react";
import { Code2, Heart, ArrowUpRight, ShieldCheck, Ticket, RotateCcw } from "lucide-react";
import { useClub } from "../../context/ClubContext";

export const Footer = () => {
  const { 
    setCurrentView, 
    openAuthModal, 
    currentUser, 
    setMyPassesModalOpen,
    resetDemoData
  } = useClub();

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t-4 border-black bg-white shadow-[0_-4px_0_0_#000]">
      {/* Decorative Caution Stripe */}
      <div className="h-3.5 stripe-caution border-b-2 border-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* 4-Column Common Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b-2 border-black">
          
          {/* Col 1: Brand & Affiliation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-black">
                <Code2 className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-black uppercase tracking-tight">CodeChef Campus</h3>
                <p className="text-[11px] font-bold text-black/70 uppercase">Dept. of Computer Science & Engg</p>
              </div>
            </div>

            <p className="text-xs font-bold text-black/75 leading-relaxed">
              Empowering student software engineers through rated algorithmic contests, 24-hour hackathons, and practical development roadmaps.
            </p>

            {/* Social Pills */}
            <div className="flex items-center gap-2 pt-1">
              <a 
                href="https://github.com/Arpit-Agnihotri-15/codechef-college-event-manager" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2.5 py-1 rounded-lg border-2 border-black bg-[#FFFDF8] hover:bg-[#FFE600] text-xs font-black transition-colors shadow-[2px_2px_0px_0px_#000]"
              >
                GitHub
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2.5 py-1 rounded-lg border-2 border-black bg-[#FFFDF8] hover:bg-[#00D2FF] text-xs font-black transition-colors shadow-[2px_2px_0px_0px_#000]"
              >
                Discord
              </a>
              <a 
                href="https://codechef.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2.5 py-1 rounded-lg border-2 border-black bg-[#FFFDF8] hover:bg-[#00F59B] text-xs font-black transition-colors shadow-[2px_2px_0px_0px_#000]"
              >
                CodeChef
              </a>
            </div>
          </div>

          {/* Col 2: Chapter Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-black tracking-wider border-b-2 border-black pb-1.5 inline-block">
              Chapter Navigation
            </h4>
            <ul className="space-y-2 text-xs font-bold text-black/80">
              <li>
                <button onClick={() => handleNav("home")} className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  <span>Home Landing</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("events")} className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  <span>Events & Contests Catalog</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("hackathons")} className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  <span>Past Hackathons & Hall of Fame</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("wings")} className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  <span>Specialized Wings & Roadmaps</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("team")} className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  <span>Chapter Divisions & Join Core</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-black tracking-wider border-b-2 border-black pb-1.5 inline-block">
              Student Hub
            </h4>
            <ul className="space-y-2 text-xs font-bold text-black/80">
              <li>
                <button 
                  onClick={() => {
                    if (currentUser?.role === "student") {
                      setMyPassesModalOpen(true);
                    } else {
                      openAuthModal("student");
                    }
                  }} 
                  className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1.5 text-black font-black"
                >
                  <Ticket className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>My Event Passes & Badges</span>
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal("student")} className="hover:text-blue-600 hover:underline cursor-pointer">
                  Student Sign In / Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("events")} className="hover:text-blue-600 hover:underline cursor-pointer">
                  Delegate Seat Reservation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleNav("home");
                    setTimeout(() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }, 100);
                  }} 
                  className="hover:text-blue-600 hover:underline cursor-pointer"
                >
                  Campus OD & FAQ Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Chapter Admin & Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-black tracking-wider border-b-2 border-black pb-1.5 inline-block">
              Executive Portal
            </h4>
            <p className="text-xs font-bold text-black/70 leading-relaxed">
              Restricted management suite for chapter leads, faculty advisors, and venue coordinators.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  if (currentUser?.role === "admin") {
                    handleNav("admin");
                  } else {
                    openAuthModal("admin");
                  }
                }}
                className="w-full brutal-btn py-2 px-3 rounded-xl bg-black text-[#FFE600] font-black text-xs uppercase flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFE600]" />
                <span>{currentUser?.role === "admin" ? "Open Dashboard" : "Admin Portal Login"}</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Reset all events and registrations back to seed demo data?")) {
                    resetDemoData();
                  }
                }}
                className="w-full py-1.5 px-3 rounded-xl border border-black bg-neutral-100 hover:bg-neutral-200 text-black font-black text-[11px] uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-black/70 gap-4">
          <p>© {new Date().getFullYear()} CodeChef Campus Chapter • Affiliated with Dept. of Computer Science & Engineering</p>
          <div className="flex items-center gap-1.5 font-black text-black">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5A5F] fill-[#FF5A5F]" />
            <span>for Campus Developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
