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
  ArrowLeft 
} from "lucide-react";

export const AdminDashboard = () => {
  const { 
    events, 
    registrations, 
    setCurrentView, 
    resetDemoData, 
    setAdminEventModalData 
  } = useClub();

  const [activeAdminTab, setActiveAdminTab] = useState("events");
  const [selectedEventForRegs, setSelectedEventForRegs] = useState("All");

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
            Real-time management for campus hackathons, division contests, student attendance, and official CSV records.
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
            onClick={() => {
              setCurrentView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="brutal-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-black text-white hover:bg-slate-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Site</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#FFE600] shadow-[5px_5px_0px_0px_#000] text-black space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase">
            <span>Total Events</span>
            <Calendar className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black">{totalEvents}</div>
          <p className="text-[11px] font-bold text-black/75">Published across tracks</p>
        </div>

        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#00F59B] shadow-[5px_5px_0px_0px_#000] text-black space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase">
            <span>Registrations</span>
            <Users className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black">{totalRegistrations}</div>
          <p className="text-[11px] font-bold text-black/75">Verified student delegates</p>
        </div>

        <div className="p-5 rounded-2xl border-[3px] border-black bg-[#00D2FF] shadow-[5px_5px_0px_0px_#000] text-black space-y-1">
          <div className="flex items-center justify-between text-xs font-black uppercase">
            <span>Upcoming Dates</span>
            <Clock className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="text-3xl font-black">{upcomingEvents}</div>
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
          className={`pb-3 px-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-4 -mb-1 transition-all flex items-center gap-2 ${
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
          className={`pb-3 px-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-4 -mb-1 transition-all flex items-center gap-2 ${
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
