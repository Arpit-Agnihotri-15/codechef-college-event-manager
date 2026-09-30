import React from "react";
import { Code2, Heart } from "lucide-react";
import { useClub } from "../../context/ClubContext";

export const Footer = () => {
  const { setCurrentView, openAuthModal, currentUser } = useClub();

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t-4 border-black bg-white shadow-[0_-4px_0_0_#000]">
      {/* Decorative Caution Hazard Stripe */}
      <div className="h-3.5 stripe-caution border-b-2 border-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Clean Row: Brand + Direct Headings */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-black">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-black">
              <Code2 className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="font-black text-lg text-black uppercase tracking-tight">CodeChef Campus</div>
              <p className="text-[11px] font-bold text-black/70 uppercase">Department of Computer Science & Engineering</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a 
              href="https://github.com/Arpit-Agnihotri-15/codechef-college-event-manager" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FFE600] text-xs font-black uppercase transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00D2FF] text-xs font-black uppercase transition-colors"
            >
              Discord
            </a>
            <a 
              href="https://codechef.com" 
              target="_blank" 
              rel="noreferrer" 
              className="px-3 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00F59B] text-xs font-black uppercase transition-colors"
            >
              CodeChef
            </a>
          </div>

        </div>

        {/* Clean, Uncrowded Navigation Headings (Only headings as requested) */}
        <div className="py-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleNav("home")}
            className="px-4 py-2 rounded-xl border-2 border-black bg-white hover:bg-[#FFE600] shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            Home
          </button>

          <button
            onClick={() => handleNav("events")}
            className="px-4 py-2 rounded-xl border-2 border-black bg-white hover:bg-[#00D2FF] shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            Events
          </button>

          <button
            onClick={() => handleNav("hackathons")}
            className="px-4 py-2 rounded-xl border-2 border-black bg-white hover:bg-[#FF5A5F] shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            Hackathons
          </button>

          <button
            onClick={() => handleNav("wings")}
            className="px-4 py-2 rounded-xl border-2 border-black bg-white hover:bg-[#00F59B] shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            Roadmaps
          </button>

          <button
            onClick={() => handleNav("team")}
            className="px-4 py-2 rounded-xl border-2 border-black bg-white hover:bg-[#B388FF] shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            Join Core Team
          </button>

          <button
            onClick={() => openAuthModal("student")}
            className="px-4 py-2 rounded-xl border-2 border-black bg-white hover:bg-[#00D2FF] shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            {currentUser?.role === "student" ? "My Profile" : "Student Sign In"}
          </button>

          <button
            onClick={() => {
              if (currentUser?.role === "admin") {
                handleNav("admin");
              } else {
                openAuthModal("admin");
              }
            }}
            className="px-4 py-2 rounded-xl border-2 border-black bg-black text-[#FFE600] hover:bg-neutral-800 shadow-[2px_2px_0px_0px_#000] font-black text-xs sm:text-sm uppercase transition-all cursor-pointer"
          >
            Admin Portal
          </button>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="pt-6 border-t-2 border-black/20 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-black/70 gap-3">
          <p>© {new Date().getFullYear()} CodeChef Campus Chapter</p>
          <div className="flex items-center gap-1.5 font-black text-black">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5A5F] fill-[#FF5A5F]" />
            <span>for Student Developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
