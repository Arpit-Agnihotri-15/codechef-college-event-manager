import React, { useState } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users
} from "lucide-react";

export const AdminEventsList = ({ onSelectEventForRegistrations }) => {
  const { 
    events, 
    setAdminEventModalData, 
    deleteEvent, 
    setFeaturedEvent 
  } = useClub();

  const [deletingId, setDeletingId] = useState(null);

  const confirmDelete = (id) => {
    deleteEvent(id);
    setDeletingId(null);
  };

  return (
    <div className="space-y-4">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
        <div>
          <h3 className="text-base font-black uppercase text-black tracking-tight">Active Events ({events.length})</h3>
          <p className="text-xs font-bold text-black/70">
            Publish, edit venue/schedule, or toggle the homepage spotlight event.
          </p>
        </div>

        <button
          onClick={() => setAdminEventModalData("new")}
          className="brutal-btn flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs uppercase bg-[#FFE600] text-black"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Events Table / Card list */}
      <div className="grid grid-cols-1 gap-3">
        {events.map((event) => {
          const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });

          const capacityPercent = Math.min(100, Math.round(((event.registeredCount || 0) / event.capacity) * 100));

          return (
            <div
              key={event.id}
              className="p-4 rounded-xl bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              
              {/* Event Image & Details */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border-2 border-black">
                  <img
                    src={event.banner || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFE600] border border-black">
                      {event.category}
                    </span>

                    {event.isFeatured && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black text-[#FFE600] border border-black flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FFE600]" /> Spotlight
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-black text-black tracking-tight truncate">
                    {event.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-black/75">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span className="truncate max-w-[250px]">{event.venue}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Registration Capacity Column */}
              <div className="w-full md:w-44 space-y-1 shrink-0 bg-[#FFFDF8] p-2.5 rounded-lg border-2 border-black">
                <div className="flex items-center justify-between text-[11px] font-black text-black">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 stroke-[2.5]" />
                    Slots
                  </span>
                  <span>
                    {event.registeredCount || 0} / {event.capacity}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 border border-black rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      capacityPercent > 85 ? "bg-[#FF5A5F]" : "bg-[#00F59B]"
                    }`}
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
              </div>

              {/* Actions Button Group */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/20">
                <button
                  onClick={() => onSelectEventForRegistrations(event.id)}
                  title="View registered attendees"
                  className="brutal-btn px-2.5 py-1.5 rounded-lg text-xs font-black uppercase bg-[#00D2FF] text-black flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Delegates</span>
                </button>

                <button
                  onClick={() => setFeaturedEvent(event.id)}
                  title={event.isFeatured ? "Currently featured" : "Set as featured"}
                  className={`p-1.5 rounded-lg border-2 border-black ${
                    event.isFeatured
                      ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-black/60 hover:text-black"
                  }`}
                >
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => setAdminEventModalData(event)}
                  title="Edit event"
                  className="p-1.5 rounded-lg bg-white border-2 border-black hover:bg-[#FFE600] transition-colors"
                >
                  <Edit3 className="w-4 h-4 stroke-[2.5]" />
                </button>

                {deletingId === event.id ? (
                  <div className="flex items-center gap-1 bg-black p-1 rounded-lg">
                    <button
                      onClick={() => confirmDelete(event.id)}
                      className="px-2 py-0.5 bg-[#FF5A5F] text-white text-[11px] font-black uppercase rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="px-2 py-0.5 text-white text-[11px] font-bold"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingId(event.id)}
                    title="Delete event"
                    className="p-1.5 rounded-lg bg-white border-2 border-black hover:bg-[#FF5A5F] hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
