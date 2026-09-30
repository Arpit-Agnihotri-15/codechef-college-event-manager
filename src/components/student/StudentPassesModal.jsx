import React, { useState } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  X, 
  QrCode, 
  Calendar, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Ticket,
  GraduationCap
} from "lucide-react";

export const StudentPassesModal = () => {
  const { 
    myPassesModalOpen, 
    setMyPassesModalOpen, 
    currentUser, 
    getUserRegistrations, 
    setTicketModalData, 
    deleteRegistration,
    setCurrentView
  } = useClub();

  const [deletingId, setDeletingId] = useState(null);

  if (!myPassesModalOpen) return null;

  const userRegs = getUserRegistrations();

  const handleCancelRegistration = (regId) => {
    deleteRegistration(regId);
    setDeletingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-[#00D2FF] border-b-4 border-black p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-black text-[#00D2FF] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000]">
              <Ticket className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                My Event Registrations & Passes
              </h3>
              <p className="text-xs font-bold text-black/80">
                Track your active delegate tickets and venue check-in status
              </p>
            </div>
          </div>

          <button
            onClick={() => setMyPassesModalOpen(false)}
            className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Student Profile Info Bar */}
        {currentUser && (
          <div className="bg-[#FFFDF8] border-b-2 border-dashed border-black/20 p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-black">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center font-black">
                {currentUser.studentName ? currentUser.studentName.charAt(0) : "S"}
              </div>
              <div>
                <span className="font-black text-sm block">{currentUser.studentName}</span>
                <span className="text-[11px] text-black/70">{currentUser.rollNumber} • {currentUser.email}</span>
              </div>
            </div>

            <div className="px-3 py-1 bg-black text-white rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_#00D2FF]">
              {userRegs.length} {userRegs.length === 1 ? "Active Ticket" : "Active Tickets"}
            </div>
          </div>
        )}

        {/* Modal Body / Registrations List */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">
          
          {userRegs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#F4F4F0] border-[3px] border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                <Ticket className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-lg font-black text-black">No Registered Events Found</h4>
              <p className="text-xs sm:text-sm font-bold text-black/70 max-w-sm mx-auto">
                You haven't reserved seats for upcoming events yet. Explore our calendar for upcoming hackathons, workshops, and contests!
              </p>
              <button
                onClick={() => {
                  setMyPassesModalOpen(false);
                  setCurrentView("events");
                }}
                className="brutal-btn inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE600] text-black font-black text-xs uppercase rounded-xl"
              >
                <span>Browse Chapter Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {userRegs.map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] space-y-3 hover:translate-x-0.5 transition-transform"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#FFE600] border border-black font-black text-[10px] uppercase">
                          {reg.ticketCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border border-black ${
                          reg.status === "Checked In" 
                            ? "bg-[#00F59B] text-black" 
                            : "bg-[#00D2FF] text-black"
                        }`}>
                          {reg.status === "Checked In" ? "OD Verified (Checked In)" : reg.status}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-black leading-snug">
                        {reg.eventTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => setTicketModalData(reg)}
                      className="self-start brutal-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFE600] text-black font-black text-xs uppercase"
                    >
                      <QrCode className="w-4 h-4 stroke-[2.5]" />
                      <span>View QR Pass</span>
                    </button>
                  </div>

                  {/* Date & Venue Info */}
                  <div className="pt-2 border-t border-black/15 flex flex-wrap items-center justify-between text-xs font-bold text-black/80 gap-2">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{new Date(reg.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{reg.eventVenue}</span>
                      </span>
                    </div>

                    {/* Cancellation Action */}
                    <div>
                      {deletingId === reg.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-black text-red-600">Cancel seat?</span>
                          <button
                            onClick={() => handleCancelRegistration(reg.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-black border border-black cursor-pointer"
                          >
                            Yes, Cancel
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-1 bg-neutral-200 text-black rounded text-[10px] font-black border border-black cursor-pointer"
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(reg.id)}
                          className="text-[11px] font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Cancel Ticket</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FFFDF8] border-t-3 border-black p-4 flex items-center justify-between">
          <p className="text-[11px] font-bold text-black/75">
            Display your QR badge on your mobile at the Turing Hall registration desk for instant On-Duty attendance.
          </p>
          <button
            onClick={() => setMyPassesModalOpen(false)}
            className="px-4 py-2 bg-black text-white font-black text-xs uppercase rounded-xl border border-black hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
