import React, { useState, useMemo } from "react";
import { useClub } from "../../context/ClubContext";
import { exportRegistrationsToCSV } from "../../utils/csvExport";
import { 
  Search, 
  Download, 
  CheckCircle, 
  Trash2, 
  QrCode, 
  Filter, 
  UserCheck, 
  Phone, 
  Mail, 
  Calendar,
  AlertCircle
} from "lucide-react";

export const AdminRegistrations = ({ initialSelectedEventId = "All" }) => {
  const { 
    events, 
    registrations, 
    deleteRegistration, 
    updateRegistrationStatus, 
    setTicketModalData 
  } = useClub();

  const [selectedEventId, setSelectedEventId] = useState(initialSelectedEventId);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Filter registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // Event filter
      if (selectedEventId !== "All" && r.eventId !== selectedEventId) {
        return false;
      }
      // Status filter
      if (statusFilter !== "All" && r.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = (r.studentName || "").toLowerCase().includes(query);
        const matchesRoll = (r.rollNumber || "").toLowerCase().includes(query);
        const matchesEmail = (r.email || "").toLowerCase().includes(query);
        const matchesPhone = (r.phone || "").toLowerCase().includes(query);
        const matchesHandle = (r.codingHandle || "").toLowerCase().includes(query);
        const matchesTicket = (r.ticketCode || "").toLowerCase().includes(query);
        const matchesEvent = (r.eventTitle || "").toLowerCase().includes(query);
        return matchesName || matchesRoll || matchesEmail || matchesPhone || matchesHandle || matchesTicket || matchesEvent;
      }
      return true;
    });
  }, [registrations, selectedEventId, statusFilter, searchQuery]);

  const handleExportCSV = () => {
    const filename = selectedEventId !== "All" 
      ? `Event_Attendees_${selectedEventId}.csv` 
      : "CodeChef_Campus_All_Registrations.csv";
    exportRegistrationsToCSV(filteredRegistrations, filename);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Checked In":
        return "bg-[#00F59B] text-black border-black";
      case "Waitlisted":
        return "bg-[#FF5A5F] text-white border-black";
      case "Confirmed":
      default:
        return "bg-[#00D2FF] text-black border-black";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Control & Filter Header */}
      <div className="p-5 rounded-2xl bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_#000] space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-black tracking-tight uppercase flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-black stroke-[2.5]" />
              <span>Registered Students & Attendance</span>
            </h3>
            <p className="text-xs sm:text-sm font-bold text-black/75 mt-0.5">
              Showing {filteredRegistrations.length} of {registrations.length} total registrations across chapters
            </p>
          </div>

          {/* Export to CSV Button */}
          <button
            onClick={handleExportCSV}
            className="brutal-btn inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase bg-[#00F59B] text-black"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export CSV Sheet ({filteredRegistrations.length})</span>
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t-2 border-dashed border-black/20">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/60 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, roll no, email..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFE600]"
            />
          </div>

          {/* Event Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Events ({registrations.length})</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.registeredCount || 0} registered)
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Dropdown / Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {["All", "Confirmed", "Checked In", "Waitlisted"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black uppercase transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]"
                    : "bg-[#FFFDF8] text-black/70 hover:bg-neutral-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Registrations Table */}
      {filteredRegistrations.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_#000] space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
            <AlertCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h4 className="text-lg font-black text-black">No Registrations Found</h4>
          <p className="text-xs sm:text-sm font-bold text-black/70 max-w-md mx-auto">
            No student matches the current search query or filter. Try clearing the search box or selecting "All Events".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedEventId("All");
              setStatusFilter("All");
            }}
            className="brutal-btn px-4 py-2 bg-black text-white text-xs font-black rounded-lg uppercase"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-black text-white border-b-2 border-black font-black uppercase tracking-wider text-[11px] sm:text-xs">
                  <th className="py-3.5 px-4">Attendee</th>
                  <th className="py-3.5 px-4">Roll No / Year</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Registered Event</th>
                  <th className="py-3.5 px-4">Ticket / Pass</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/10 font-bold">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-neutral-50 transition-colors">
                    
                    {/* Attendee Name & CodeChef Handle */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center font-black text-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
                          {reg.studentName ? reg.studentName.charAt(0).toUpperCase() : "S"}
                        </div>
                        <div>
                          <div className="font-black text-black leading-tight">{reg.studentName}</div>
                          {reg.codingHandle && (
                            <div className="text-[11px] font-black text-[#5B34EB]">
                              @{reg.codingHandle}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Roll Number & College / Year */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-neutral-100 border border-black font-black text-[11px]">
                        {reg.rollNumber || "N/A"}
                      </span>
                      <div className="text-[11px] text-black/70 mt-0.5">{reg.collegeYear}</div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[11px] text-black">
                        <Mail className="w-3 h-3 text-black/60 shrink-0" />
                        <span className="truncate max-w-[140px]">{reg.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-black/75 mt-0.5">
                        <Phone className="w-3 h-3 text-black/60 shrink-0" />
                        <span>{reg.phone}</span>
                      </div>
                    </td>

                    {/* Event Title */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-black text-black text-xs line-clamp-1">
                        {reg.eventTitle}
                      </div>
                      <div className="text-[10px] text-black/60">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Ticket Code & QR Preview */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setTicketModalData(reg)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFE600] border-2 border-black font-black text-xs text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffe033] transition-colors cursor-pointer"
                        title="Click to view full digital badge pass"
                      >
                        <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{reg.ticketCode || "VIEW PASS"}</span>
                      </button>
                    </td>

                    {/* Status Badge & Fast Toggle */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border-2 text-[11px] font-black uppercase shadow-[1px_1px_0px_0px_#000] ${getStatusBadge(reg.status)}`}>
                        {reg.status || "Confirmed"}
                      </span>
                    </td>

                    {/* Quick Desk Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {reg.status !== "Checked In" ? (
                          <button
                            onClick={() => updateRegistrationStatus(reg.id, "Checked In")}
                            className="px-2.5 py-1 rounded-lg bg-[#00F59B] border-2 border-black font-black text-[11px] text-black hover:bg-[#00e08c] shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer flex items-center gap-1"
                            title="Mark attendance at entrance desk"
                          >
                            <CheckCircle className="w-3 h-3 stroke-[2.5]" />
                            <span className="hidden sm:inline">Check In</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => updateRegistrationStatus(reg.id, "Confirmed")}
                            className="px-2.5 py-1 rounded-lg bg-neutral-200 border-2 border-black font-black text-[11px] text-black hover:bg-neutral-300 transition-all cursor-pointer"
                            title="Revert check-in to confirmed"
                          >
                            Undo Check-in
                          </button>
                        )}

                        {deletingId === reg.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => {
                                deleteRegistration(reg.id);
                                setDeletingId(null);
                              }}
                              className="px-2 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black border border-black cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeletingId(null)}
                              className="px-2 py-1 bg-neutral-200 text-black rounded-lg text-[10px] font-black border border-black cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeletingId(reg.id)}
                            className="p-1.5 rounded-lg border-2 border-black bg-white hover:bg-red-50 text-red-600 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                            title="Cancel registration"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
