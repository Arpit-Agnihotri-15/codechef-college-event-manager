import React, { useState } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  Code2, 
  Calendar, 
  Home, 
  Trophy, 
  Compass, 
  Users, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";

export const Navbar = () => {
  const { currentView, setCurrentView, events } = useClub();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", icon: Home, color: "bg-[#FFE600]" },
    { 
      id: "events", 
      label: "All Events", 
      icon: Calendar, 
      color: "bg-[#00D2FF]",
      badge: events.length 
    },
    { id: "hackathons", label: "Hall of Fame", icon: Trophy, color: "bg-[#FF5A5F]" },
    { id: "wings", label: "Roadmaps & Wings", icon: Compass, color: "bg-[#00F59B]" },
    { id: "team", label: "Team & Apply", icon: Users, color: "bg-[#B388FF]" }
  ];

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-black shadow-[0_4px_0_0_#000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 bg-[#FFE600] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-center justify-center transform group-hover:-rotate-6 transition-transform">
              <Code2 className="w-7 h-7 text-black stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-black">
                  CODECHEF
                </span>
                <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-[#FF5A5F] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  CAMPUS
                </span>
              </div>
              <p className="text-[11px] font-bold text-black/70 uppercase tracking-wider hidden sm:block">
                Dept of Computer Science & Engg
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wide border-[3px] border-black transition-all ${
                    isActive
                      ? `${link.color} shadow-[4px_4px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]`
                      : "bg-white text-black hover:bg-slate-100 hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="px-1.5 py-0.2 rounded-full bg-black text-white text-[10px] font-black">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Admin Coordinator Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate(currentView === "admin" ? "home" : "admin")}
              className={`brutal-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider ${
                currentView === "admin"
                  ? "bg-[#FFE600] text-black"
                  : "bg-black text-[#FFE600] hover:bg-slate-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#FFE600]" />
              <span>{currentView === "admin" ? "Exit Admin" : "Admin Panel"}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border-[3px] border-black bg-[#FFE600] text-black shadow-[3px_3px_0px_0px_#000]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-[3px] border-black bg-[#FFFDF8] p-4 space-y-2.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-[3px] border-black font-black text-sm uppercase ${
                  isActive ? `${link.color} shadow-[4px_4px_0px_0px_#000]` : "bg-white text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-black">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => handleNavigate(currentView === "admin" ? "home" : "admin")}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-[3px] border-black bg-black text-[#FFE600] font-black text-sm uppercase shadow-[4px_4px_0px_0px_#000]"
          >
            <ShieldCheck className="w-4 h-4 text-[#FFE600]" />
            <span>{currentView === "admin" ? "Back to Student Portal" : "Admin Dashboard"}</span>
          </button>
        </div>
      )}
    </header>
  );
};
