import React from "react";
import { 
  Code2, 
  Heart, 
  Shield, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  Calendar, 
  Trophy, 
  Compass, 
  Users, 
  Key, 
  HelpCircle,
  QrCode,
  ArrowRight
} from "lucide-react";
import { useClub } from "../../context/ClubContext";

export const Footer = () => {
  const { setCurrentView, openAuthModal, currentUser, registrations, setTicketModalData } = useClub();

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenLatestPass = () => {
    if (registrations && registrations.length > 0) {
      setTicketModalData(registrations[0]);
    } else {
      handleNav("events");
    }
  };

  return (
    <footer className="mt-20 border-t-4 border-black bg-white shadow-[0_-4px_0_0_#000]">
      {/* Decorative Caution Hazard Stripe */}
      <div className="h-3.5 stripe-caution border-b-2 border-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Main 4-Column Grid with explicit Headings for each section and button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Col 1: Chapter Brand & Identity */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-[#FFE600] border-2 border-black font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]">
                Official Chapter
              </span>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-9 h-9 rounded-xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-black">
                  <Code2 className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-black text-lg text-black uppercase tracking-tight">CodeChef Campus</h3>
              </div>
            </div>

            <p className="text-xs font-bold text-black/75 leading-relaxed">
              Official student technical community affiliated with the Department of Computer Science & Engineering. Empowering campus builders through rated algorithm contests, open source bootcamps, and 24h hackathons.
            </p>

            {/* Social & Community Buttons with clear headings */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-black uppercase text-black/70">Connect With Chapter:</div>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://github.com/Arpit-Agnihotri-15/codechef-college-event-manager" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FFE600] transition-colors text-xs font-black"
                  title="View Source on GitHub"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>

                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00D2FF] transition-colors text-xs font-black"
                  title="Join Campus Discord"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Discord</span>
                </a>

                <a 
                  href="https://codechef.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00F59B] transition-colors text-xs font-black"
                  title="CodeChef Official Website"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>CodeChef</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Landing Pages & Directory with Proper Headings */}
          <div className="space-y-3">
            <div className="border-b-2 border-black pb-1">
              <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Directory</span>
              <h4 className="text-sm font-black uppercase text-black">Portal Navigation</h4>
            </div>

            <div className="space-y-2">
              <div className="group">
                <span className="block text-[10px] font-black text-black/60 uppercase">Main Chapter Hub</span>
                <button 
                  onClick={() => handleNav("home")} 
                  className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-[#2563EB] hover:underline cursor-pointer"
                >
                  <span>→ Home Landing Page</span>
                </button>
              </div>

              <div className="group">
                <span className="block text-[10px] font-black text-black/60 uppercase">Contests & Workshops</span>
                <button 
                  onClick={() => handleNav("events")} 
                  className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-[#2563EB] hover:underline cursor-pointer"
                >
                  <span>→ Events & Timeline Catalog</span>
                </button>
              </div>

              <div className="group">
                <span className="block text-[10px] font-black text-black/60 uppercase">Past Hackathon Records</span>
                <button 
                  onClick={() => handleNav("hackathons")} 
                  className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-[#2563EB] hover:underline cursor-pointer"
                >
                  <span>→ Hall of Fame & Hackathons</span>
                </button>
              </div>

              <div className="group">
                <span className="block text-[10px] font-black text-black/60 uppercase">Curated Learning Tracks</span>
                <button 
                  onClick={() => handleNav("wings")} 
                  className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-[#2563EB] hover:underline cursor-pointer"
                >
                  <span>→ Wings & Roadmaps</span>
                </button>
              </div>

              <div className="group">
                <span className="block text-[10px] font-black text-black/60 uppercase">Join Volunteer Team</span>
                <button 
                  onClick={() => handleNav("team")} 
                  className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-[#2563EB] hover:underline cursor-pointer"
                >
                  <span>→ Chapter Divisions & Join Us</span>
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Student Utilities with Proper Headings */}
          <div className="space-y-3">
            <div className="border-b-2 border-black pb-1">
              <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Attendee Hub</span>
              <h4 className="text-sm font-black uppercase text-black">Student Utilities</h4>
            </div>

            <div className="space-y-3">
              {/* Button 1: Digital Ticket Pass */}
              <div className="p-2.5 rounded-xl bg-neutral-50 border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-black/70 block">Desk Check-in Pass</span>
                <button
                  onClick={handleOpenLatestPass}
                  className="w-full text-left inline-flex items-center justify-between font-black text-xs text-black hover:underline cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>View Digital Ticket Badge</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Button 2: Student Sign In */}
              <div className="p-2.5 rounded-xl bg-[#00D2FF]/20 border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-black/70 block">Profile & Auto-Fill</span>
                <button
                  onClick={() => openAuthModal("student")}
                  className="w-full text-left inline-flex items-center justify-between font-black text-xs text-black hover:underline cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{currentUser?.role === "student" ? "Switch / View Profile" : "Student Sign In / Register"}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Button 3: FAQs */}
              <div className="p-2.5 rounded-xl bg-[#FFE600]/25 border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-black/70 block">OD & Attendance Doubts</span>
                <button
                  onClick={() => {
                    handleNav("home");
                    setTimeout(() => {
                      const faq = document.querySelector("section:has(.faqs)");
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full text-left inline-flex items-center justify-between font-black text-xs text-black hover:underline cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Frequently Asked Questions</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Coordinator Access with Proper Headings */}
          <div className="space-y-3">
            <div className="border-b-2 border-black pb-1 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Executive Suite</span>
                <h4 className="text-sm font-black uppercase text-black">Admin Access</h4>
              </div>
              <span className="px-2 py-0.5 rounded bg-black text-[#FFE600] font-black text-[9px] uppercase">
                Unique ID
              </span>
            </div>

            <p className="text-xs font-bold text-black/75 leading-relaxed">
              Protected portal for chapter organizers. Manage events, update schedules, mark attendance, and export university CSV sheets.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="text-[11px] font-black uppercase text-black">
                {currentUser?.role === "admin" ? "Status: Authenticated (Admin)" : "Protected with Unique ID & Key"}
              </div>

              <button
                onClick={() => {
                  if (currentUser?.role === "admin") {
                    handleNav("admin");
                  } else {
                    openAuthModal("admin");
                  }
                }}
                className="w-full brutal-btn py-2 px-3 rounded-lg text-xs font-black uppercase bg-black text-white flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>{currentUser?.role === "admin" ? "Open Admin Dashboard" : "Admin Sign In Portal"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-black/70 gap-4">
          <p>© {new Date().getFullYear()} CodeChef Campus Chapter • Built for Student Builders</p>
          <div className="flex items-center gap-1.5 font-black text-black">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-[#FF5A5F] fill-[#FF5A5F]" />
            <span>for Campus Developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
