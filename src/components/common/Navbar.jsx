import React, { useState } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  Code2, 
  Calendar, 
  Home, 
  Compass, 
  Users, 
  ShieldCheck, 
  Menu, 
  X,
  LogOut,
  User,
  GraduationCap
} from "lucide-react";

export const Navbar = () => {
  const { 
    currentView, 
    setCurrentView, 
    events, 
    currentUser, 
    logout, 
    openAuthModal,
    setMyPassesModalOpen,
    getUserRegistrations 
  } = useClub();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined 4 Core Navigation Links
  const navLinks = [
    { id: "home", label: "Home", icon: Home, color: "bg-[#FFE600]" },
    { 
      id: "events", 
      label: "Events", 
      icon: Calendar, 
      color: "bg-[#00D2FF]",
      badge: events.length 
    },
    { id: "wings", label: "Roadmaps", icon: Compass, color: "bg-[#00F59B]" },
    { id: "team", label: "Join Core", icon: Users, color: "bg-[#B388FF]" }
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

          {/* Desktop Nav Items - Clean & Unclustered (4 items only) */}
          <nav className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide border-[3px] border-black transition-all cursor-pointer ${
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

          {/* Right Action: Clean Single Button Auth System */}
          <div className="flex items-center gap-3">
            
            {/* 1. NOT Logged In: Only 1 Single "Sign In" Button */}
            {!currentUser && (
              <button
                onClick={() => openAuthModal("student")}
                className="brutal-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase bg-[#FFE600] text-black"
              >
                <User className="w-4 h-4 stroke-[2.5]" />
                <span>Sign In</span>
              </button>
            )}

            {/* 2. Logged In as Student: Just Name + Logout Button */}
            {currentUser && currentUser.role === "student" && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => setMyPassesModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black bg-[#00D2FF]/20 hover:bg-[#00D2FF]/40 shadow-[2px_2px_0px_0px_#000] cursor-pointer transition-all"
                  title="Click to view and manage your registered event passes"
                >
                  <GraduationCap className="w-4 h-4 text-black stroke-[2.5]" />
                  <span className="text-xs font-black text-black max-w-[120px] sm:max-w-none truncate">
                    {currentUser.studentName}
                  </span>
                  {getUserRegistrations().length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-md bg-black text-[#00D2FF] font-black text-[10px]">
                      {getUserRegistrations().length}
                    </span>
                  )}
                </button>

                <button
                  onClick={logout}
                  className="brutal-btn px-3 py-1.5 rounded-xl text-xs font-black uppercase bg-neutral-100 hover:bg-red-50 text-black hover:text-red-700 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* 3. Logged In as Admin: Just Admin + Logout Button */}
            {currentUser && currentUser.role === "admin" && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleNavigate(currentView === "admin" ? "home" : "admin")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-black bg-[#FFE600] font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                  title="Toggle Admin Control Suite"
                >
                  <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Admin</span>
                </button>

                <button
                  onClick={logout}
                  className="brutal-btn px-3 py-1.5 rounded-xl text-xs font-black uppercase bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border-[3px] border-black bg-[#FFE600] text-black shadow-[3px_3px_0px_0px_#000] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-[3px] border-black bg-[#FFFDF8] p-4 space-y-2.5 animate-in slide-in-from-top-2">
          
          {/* User Status Bar in Mobile Menu */}
          {currentUser ? (
            <div className="p-3 rounded-xl border-2 border-black bg-white flex items-center justify-between">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if (currentUser.role === "student") {
                    setMyPassesModalOpen(true);
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <span className="text-xl">
                  {currentUser.role === "admin" ? "🛡️" : "🎓"}
                </span>
                <div>
                  <div className="text-xs font-black text-black">
                    {currentUser.role === "admin" ? "Chapter Admin" : currentUser.studentName}
                  </div>
                  {currentUser.role === "student" && (
                    <div className="text-[10px] font-bold text-[#0066CC] underline">
                      Manage Passes ({getUserRegistrations().length})
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg border-2 border-black font-black text-xs uppercase"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal("student");
              }}
              className="w-full p-2.5 bg-[#FFE600] text-black font-black text-xs uppercase rounded-xl border-2 border-black text-center shadow-[3px_3px_0px_0px_#000]"
            >
              Sign In
            </button>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-[3px] border-black font-black text-sm uppercase cursor-pointer ${
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
        </div>
      )}
    </header>
  );
};
