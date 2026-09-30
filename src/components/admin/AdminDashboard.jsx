import React, { useState } from "react";
import { useClub } from "../../context/ClubContext";
import { AdminEventsList } from "./AdminEventsList";
import { AdminRegistrations } from "./AdminRegistrations";
import { EventFormModal } from "./EventFormModal";
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Clock, 
  Award, 
  RotateCcw, 
  ArrowLeft,
  Key,
  Lock,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  BarChart3,
  TrendingUp,
  PieChart,
  ChevronRight,
  Info
} from "lucide-react";

export const AdminDashboard = () => {
  const { 
    events, 
    registrations, 
    setCurrentView, 
    resetDemoData, 
    currentUser, 
    loginAdmin, 
    logout 
  } = useClub();

  const [activeAdminTab, setActiveAdminTab] = useState("events");
  const [selectedEventForRegs, setSelectedEventForRegs] = useState("All");

  // Interactive KPI Deep Dive Selection: 'events' | 'registrations' | 'upcoming' | 'capacity'
  const [selectedKpi, setSelectedKpi] = useState("capacity");

  // Gate Form State if unauthenticated
  const [gateAdminId, setGateAdminId] = useState("");
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState("");

  const handleGateSubmit = (e) => {
    e.preventDefault();
    setGateError("");
    const res = loginAdmin(gateAdminId, gatePassword);
    if (!res.success) {
      setGateError(res.message);
    }
  };

  const quickFillGate = () => {
    setGateAdminId("codechef_admin");
    setGatePassword("admin@2026");
    setGateError("");
  };

  // If not logged in as Admin, show Security Login Gate
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="py-12 md:py-20 max-w-xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border-4 border-black bg-white shadow-[10px_10px_0px_0px_#000] overflow-hidden">
          
          <div className="bg-[#FFE600] border-b-4 border-black p-6 text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-black text-[#FFE600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
              <Lock className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              Chapter Coordinator Access
            </h2>
            <p className="text-xs font-bold text-black/80 max-w-sm mx-auto">
              Please enter your unique Admin ID and password to access the event management suite.
            </p>
          </div>

          <form onSubmit={handleGateSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Quick Demo Credentials Box */}
            <div className="p-3.5 rounded-xl bg-[#FFE600]/25 border-2 border-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Official Admin Credentials</span>
                </span>
                <button
                  type="button"
                  onClick={quickFillGate}
                  className="px-2.5 py-1 text-[11px] font-black uppercase bg-[#FFE600] text-black border border-black rounded-lg shadow-[1px_1px_0px_0px_#000] hover:bg-[#ffe033] cursor-pointer"
                >
                  ⚡ Auto-Fill
                </button>
              </div>
              <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-black/40 text-black/90">
                <div><strong>Admin ID:</strong> <code className="bg-neutral-100 px-1 py-0.5 rounded">codechef_admin</code></div>
                <div><strong>Password:</strong> <code className="bg-neutral-100 px-1 py-0.5 rounded">admin@2026</code></div>
              </div>
            </div>

            {gateError && (
              <div className="p-3 rounded-xl bg-red-100 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{gateError}</span>
              </div>
            )}

            {/* Admin ID */}
            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Unique Admin ID *
              </label>
              <input
                type="text"
                required
                value={gateAdminId}
                onChange={(e) => setGateAdminId(e.target.value)}
                placeholder="Enter unique ID (codechef_admin)"
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Security Password *
              </label>
              <input
                type="password"
                required
                value={gatePassword}
                onChange={(e) => setGatePassword(e.target.value)}
                placeholder="Enter password (admin@2026)"
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView("home")}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border-2 border-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer text-center"
              >
                ← Return to Student Portal
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 brutal-btn py-2.5 px-5 bg-[#00F59B] text-black font-black text-xs uppercase flex items-center justify-center gap-2 rounded-xl"
              >
                <Key className="w-4 h-4 stroke-[2.5]" />
                <span>Unlock Admin Dashboard</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    );
  }

  // Analytics Computation
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  
  const now = new Date();
  const upcomingEventsList = events.filter((e) => new Date(e.date) >= now);
  const upcomingCount = upcomingEventsList.length;

  const totalCapacity = events.reduce((sum, e) => sum + (e.capacity || 0), 0);
  const totalOccupied = events.reduce((sum, e) => sum + (e.registeredCount || 0), 0);
  const utilizationPercent = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  // Category counts
  const categoryCounts = events.reduce((acc, ev) => {
    acc[ev.category] = (acc[ev.category] || 0) + 1;
    return acc;
  }, {});

  // Attendance Check-in stats
  const checkedInCount = registrations.filter(r => r.status === "Checked In").length;
  const confirmedCount = registrations.filter(r => r.status === "Confirmed").length;
  const checkInRate = totalRegistrations > 0 ? Math.round((checkedInCount / totalRegistrations) * 100) : 0;

  // Department distribution
  const deptCounts = registrations.reduce((acc, r) => {
    const dept = (r.collegeYear || "CSE").split("•")[0].trim();
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const handleSelectEventForRegistrations = (eventId) => {
    setSelectedEventForRegs(eventId);
    setActiveAdminTab("registrations");
  };

  return (
    <div className="py-10 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner & Control Actions */}
      <div className="p-6 rounded-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#FFE600] border-2 border-black">
              <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
              Chapter Coordinator Suite
            </h2>
          </div>
          <p className="text-xs font-bold text-black/70 mt-1">
            Logged in as <span className="font-black text-black underline">codechef_admin</span>. Click any metric card below for detailed live analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              if (window.confirm("Reset all events and registrations back to initial sample demo data?")) {
                resetDemoData();
              }
            }}
            title="Reset data back to seed state"
            className="brutal-btn flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-[#FFE600] text-black"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={logout}
            title="Sign out of admin session"
            className="px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-red-100 text-red-700 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase bg-[#FFFDF8] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Exit to Site</span>
          </button>
        </div>
      </div>

      {/* Interactive Metric KPI Cards (Touch/Click to explore detailed analysis) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-black uppercase text-black/70 px-1">
          <span className="flex items-center gap-1.5">
            <Info className="w-4 h-4 stroke-[2.5]" />
            <span>Touch or click any metric below to expand real-time analytics</span>
          </span>
          <span className="hidden sm:inline">Active view: {selectedKpi.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* KPI 1: Total Events */}
          <button
            onClick={() => setSelectedKpi("events")}
            className={`p-5 rounded-2xl border-[3px] border-black text-left transition-all cursor-pointer ${
              selectedKpi === "events"
                ? "bg-[#FFE600] shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px] ring-2 ring-black"
                : "bg-white hover:bg-[#FFE600]/30 shadow-[4px_4px_0px_0px_#000]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black uppercase text-black">
              <span>Total Events</span>
              <Calendar className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-3xl font-black text-black my-1">{totalEvents}</div>
            <p className="text-[11px] font-bold text-black/75 flex items-center justify-between">
              <span>Category Mix</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </button>

          {/* KPI 2: Verified Registrations */}
          <button
            onClick={() => setSelectedKpi("registrations")}
            className={`p-5 rounded-2xl border-[3px] border-black text-left transition-all cursor-pointer ${
              selectedKpi === "registrations"
                ? "bg-[#00F59B] shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px] ring-2 ring-black"
                : "bg-white hover:bg-[#00F59B]/30 shadow-[4px_4px_0px_0px_#000]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black uppercase text-black">
              <span>Registrations</span>
              <Users className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-3xl font-black text-black my-1">{totalRegistrations}</div>
            <p className="text-[11px] font-bold text-black/75 flex items-center justify-between">
              <span>Attendance & OD</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </button>

          {/* KPI 3: Upcoming Dates */}
          <button
            onClick={() => setSelectedKpi("upcoming")}
            className={`p-5 rounded-2xl border-[3px] border-black text-left transition-all cursor-pointer ${
              selectedKpi === "upcoming"
                ? "bg-[#00D2FF] shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px] ring-2 ring-black"
                : "bg-white hover:bg-[#00D2FF]/30 shadow-[4px_4px_0px_0px_#000]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black uppercase text-black">
              <span>Upcoming</span>
              <Clock className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-3xl font-black text-black my-1">{upcomingCount}</div>
            <p className="text-[11px] font-bold text-black/75 flex items-center justify-between">
              <span>Kickoff Schedule</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </button>

          {/* KPI 4: Hall Capacity Utilization */}
          <button
            onClick={() => setSelectedKpi("capacity")}
            className={`p-5 rounded-2xl border-[3px] border-black text-left transition-all cursor-pointer ${
              selectedKpi === "capacity"
                ? "bg-[#FF5A5F] text-white shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px] ring-2 ring-black"
                : "bg-white text-black hover:bg-[#FF5A5F]/20 shadow-[4px_4px_0px_0px_#000]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black uppercase">
              <span>Seat Capacity</span>
              <Award className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-3xl font-black my-1">{utilizationPercent}%</div>
            <p className="text-[11px] font-bold opacity-90 flex items-center justify-between">
              <span>{totalOccupied}/{totalCapacity} Claimed</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </button>

        </div>
      </div>

      {/* DETAIL ANALYSIS EXPANSION PANEL (Revealed when a section is touched) */}
      <div className="p-6 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] space-y-4 animate-in fade-in duration-200">
        
        {/* PANEL 1: EVENTS ANALYSIS */}
        {selectedKpi === "events" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#FFE600] border border-black font-black text-xs">
                  ANALYSIS
                </span>
                <h3 className="font-black text-lg text-black uppercase">Events Portfolio Breakdown</h3>
              </div>
              <span className="text-xs font-bold text-black/70">{events.length} active initiatives</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const percent = Math.round((count / totalEvents) * 100);
                return (
                  <div key={cat} className="p-4 rounded-xl border-2 border-black bg-[#FFFDF8] shadow-[3px_3px_0px_0px_#000] space-y-2">
                    <div className="flex items-center justify-between text-xs font-black uppercase">
                      <span>{cat}</span>
                      <span className="px-2 py-0.5 rounded bg-black text-white text-[10px]">{count} Event(s)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full border border-black overflow-hidden">
                      <div className="bg-[#FFE600] h-full" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="text-[11px] font-bold text-black/70 flex justify-between">
                      <span>Share of calendar</span>
                      <span>{percent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PANEL 2: REGISTRATIONS & ATTENDANCE ANALYSIS */}
        {selectedKpi === "registrations" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#00F59B] border border-black font-black text-xs">
                  ANALYSIS
                </span>
                <h3 className="font-black text-lg text-black uppercase">Attendance & Student Engagement</h3>
              </div>
              <span className="text-xs font-bold text-black/70">{totalRegistrations} total delegate records</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl border-2 border-black bg-[#00F59B]/20 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="text-xs font-black uppercase text-black">Check-in Conversion</div>
                <div className="text-2xl font-black text-black">{checkInRate}%</div>
                <p className="text-[11px] font-bold text-black/75">{checkedInCount} students marked OD at entrance</p>
              </div>

              <div className="p-4 rounded-xl border-2 border-black bg-[#00D2FF]/20 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="text-xs font-black uppercase text-black">Confirmed Pending Check-in</div>
                <div className="text-2xl font-black text-black">{confirmedCount}</div>
                <p className="text-[11px] font-bold text-black/75">Ready with digital scannable passes</p>
              </div>

              <div className="p-4 rounded-xl border-2 border-black bg-[#FFE600]/25 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="text-xs font-black uppercase text-black">Top Department</div>
                <div className="text-2xl font-black text-black">{Object.keys(deptCounts)[0] || "B.Tech CSE"}</div>
                <p className="text-[11px] font-bold text-black/75">Highest engagement across branches</p>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: UPCOMING DATES & DEADLINES ANALYSIS */}
        {selectedKpi === "upcoming" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#00D2FF] border border-black font-black text-xs">
                  ANALYSIS
                </span>
                <h3 className="font-black text-lg text-black uppercase">Upcoming Kickoff Timeline</h3>
              </div>
              <span className="text-xs font-bold text-black/70">{upcomingCount} events scheduled</span>
            </div>

            <div className="space-y-2 pt-1">
              {upcomingEventsList.slice(0, 4).map((ev) => {
                const dateObj = new Date(ev.date);
                const daysDiff = Math.ceil((dateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={ev.id} className="p-3.5 rounded-xl border-2 border-black bg-[#FFFDF8] shadow-[2px_2px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-black">{ev.title}</span>
                      <div className="text-[11px] font-bold text-black/70">
                        {dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })} • Venue: {ev.venue}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#FFE600] border border-black font-black text-xs text-black shadow-[1px_1px_0px_0px_#000]">
                        {daysDiff <= 0 ? "Today" : `In ${daysDiff} days`}
                      </span>
                      <button
                        onClick={() => handleSelectEventForRegistrations(ev.id)}
                        className="px-2.5 py-1 rounded-lg bg-black text-white font-black text-xs hover:bg-neutral-800 cursor-pointer"
                      >
                        Inspect Attendees
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PANEL 4: CAPACITY OCCUPANCY RADAR ANALYSIS */}
        {selectedKpi === "capacity" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#FF5A5F] text-white border border-black font-black text-xs">
                  ANALYSIS
                </span>
                <h3 className="font-black text-lg text-black uppercase">Hall Seat Occupancy Radar</h3>
              </div>
              <span className="text-xs font-bold text-black/70">{totalOccupied} of {totalCapacity} seats claimed ({utilizationPercent}%)</span>
            </div>

            <div className="space-y-3 pt-1">
              {events.map((ev) => {
                const percent = Math.min(100, Math.round(((ev.registeredCount || 0) / ev.capacity) * 100));
                const isNearFull = percent >= 80;
                return (
                  <div key={ev.id} className="p-3 rounded-xl border-2 border-black bg-[#FFFDF8] shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-black">
                      <span className="text-black truncate max-w-md">{ev.title}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border border-black ${
                          isNearFull ? "bg-[#FF5A5F] text-white" : "bg-[#00F59B] text-black"
                        }`}>
                          {isNearFull ? "Almost Full" : "Open"}
                        </span>
                        <span className="text-black/80">{ev.registeredCount || 0} / {ev.capacity} Seats ({percent}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full border border-black overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          percent >= 85 ? "bg-[#FF5A5F]" : percent >= 60 ? "bg-[#FFE600]" : "bg-[#00F59B]"
                        }`} 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Tabs */}
      <div className="flex border-b-4 border-black space-x-3">
        <button
          onClick={() => setActiveAdminTab("events")}
          className={`pb-3 px-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-4 -mb-1 transition-all flex items-center gap-2 cursor-pointer ${
            activeAdminTab === "events"
              ? "border-black bg-[#FFE600] text-black px-4 pt-2 rounded-t-xl"
              : "border-transparent text-black/60 hover:text-black"
          }`}
        >
          <Calendar className="w-4 h-4 stroke-[2.5]" />
          <span>Events Manager ({events.length})</span>
        </button>

        <button
          onClick={() => {
            setSelectedEventForRegs("All");
            setActiveAdminTab("registrations");
          }}
          className={`pb-3 px-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-4 -mb-1 transition-all flex items-center gap-2 cursor-pointer ${
            activeAdminTab === "registrations"
              ? "border-black bg-[#00D2FF] text-black px-4 pt-2 rounded-t-xl"
              : "border-transparent text-black/60 hover:text-black"
          }`}
        >
          <Users className="w-4 h-4 stroke-[2.5]" />
          <span>Attendance & Registrations ({registrations.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeAdminTab === "events" ? (
          <AdminEventsList onSelectEventForRegistrations={handleSelectEventForRegistrations} />
        ) : (
          <AdminRegistrations initialSelectedEventId={selectedEventForRegs} />
        )}
      </div>

      {/* Add / Edit Event Modal */}
      <EventFormModal />

    </div>
  );
};
