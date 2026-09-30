import React from "react";
import { Code2, Heart, Shield, Globe, ExternalLink, Sparkles } from "lucide-react";
import { useClub } from "../../context/ClubContext";

export const Footer = () => {
  const { setCurrentView } = useClub();

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t-4 border-black bg-white shadow-[0_-4px_0_0_#000]">
      {/* Decorative Caution Stripe */}
      <div className="h-3 stripe-caution border-b-2 border-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Club Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-black">
                <Code2 className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <span className="font-black text-lg text-black uppercase tracking-tight">CodeChef Campus</span>
            </div>
            <p className="text-xs font-bold text-black/75 leading-relaxed">
              Official student developer community under the Department of Computer Science & Engineering. Contests, bootcamps, and hackathons.
            </p>
            <div className="flex items-center gap-2 text-black">
              {/* GitHub SVG */}
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FFE600] transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              {/* Discord SVG */}
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00D2FF] transition-colors" aria-label="Discord">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              {/* CodeChef Global link */}
              <a href="https://codechef.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00F59B] transition-colors" aria-label="CodeChef Global">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Landing Pages Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase text-black mb-3">Portal Navigation</h4>
            <ul className="space-y-2 text-xs font-bold text-black/80">
              <li>
                <button onClick={() => handleNav("home")} className="hover:underline hover:text-[#2563EB]">
                  → Home Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("events")} className="hover:underline hover:text-[#2563EB]">
                  → Events & Contest Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("hackathons")} className="hover:underline hover:text-[#2563EB]">
                  → Hall of Fame & Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("wings")} className="hover:underline hover:text-[#2563EB]">
                  → Wings & Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("team")} className="hover:underline hover:text-[#2563EB]">
                  → Core Committee & Apply
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tracks */}
          <div>
            <h4 className="text-xs font-black uppercase text-black mb-3">Specializations</h4>
            <ul className="space-y-2 text-xs font-bold text-black/80">
              <li>• Competitive Programming (CP)</li>
              <li>• Full Stack Web & Systems</li>
              <li>• AI, Machine Learning & LLMs</li>
              <li>• Open Source & Hackathons</li>
            </ul>
          </div>

          {/* Col 4: Admin Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-black mb-3">Coordinator Access</h4>
            <p className="text-xs font-bold text-black/75 leading-relaxed">
              Club leads can publish events, manage attendees, and export official attendance rosters.
            </p>
            <button
              onClick={() => handleNav("admin")}
              className="brutal-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-[#FFE600] text-black"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Control Center</span>
            </button>
          </div>

        </div>

        <div className="pt-8 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-black/70 gap-4">
          <p>© {new Date().getFullYear()} CodeChef Campus Chapter • Built for Student Builders</p>
          <div className="flex items-center gap-1 font-black text-black">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5A5F] fill-[#FF5A5F]" />
            <span>by Student Developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
