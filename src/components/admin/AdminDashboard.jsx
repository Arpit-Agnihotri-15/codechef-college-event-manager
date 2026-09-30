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
  Sparkles
} from "lucide-react";

export const AdminDashboard = () => {
  const { 
    events, 
    registrations, 
    setCurrentView, 
    resetDemoData, 
    setAdminEventModalData,
    currentUser,
    loginAdmin,
    logout
  } = useClub();

  const [activeAdminTab, setActiveAdminTab] = useState("events");
  const [selectedEventForRegs, setSelectedEventForRegs] = useState("All");

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

  // Logged-in Admin Dashboard View
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  
  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.date) >= now).length;

  const totalCapacity = events.reduce((sum, e) => sum + (e.capacity || 0), 0);
  const totalOccupied = events.reduce((sum, e) => sum + (e.registeredCount || 0), 0);
  const utilizationPercent = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

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
              Club Lead Control Center
            </h2>
          </div>
          <p className="text-xs font-bold text-black/70 mt-1">
            Logged in as <span className="font-black text-black underline">codechef_admin</span> (Executive Campus Coordinator).
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

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#FFE600] shadow-[5px_5px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase text-black">
            <span>Total Events</span>
            <Calendar className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black text-black">{totalEvents}</div>
          <p className="text-[11px] font-bold text-black/75">Published in chapter catalog</p>
        </div>

        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#00F59B] shadow-[5px_5px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase text-black">
            <span>Verified Registrations</span>
            <Users className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black text-black">{totalRegistrations}</div>
          <p className="text-[11px] font-bold text-black/75">Active attendee records</p>
        </div>

        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#00D2FF] shadow-[5px_5px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase text-black">
            <span>Upcoming Dates</span>
            <Clock className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black text-black">{upcomingEvents}</div>
          <p className="text-[11px] font-bold text-black/75">Active in calendar pipeline</p>
        </div>

        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#FF5A5F] shadow-[5px_5px_0px_0px_#000] text-white space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase">
            <span>Hall Capacity</span>
            <Award className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black">{utilizationPercent}%</div>
          <p className="text-[11px] font-bold text-white/90">{totalOccupied} of {totalCapacity} seats claimed</p>
        </div>
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
