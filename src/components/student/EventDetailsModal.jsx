import React from "react";
import { Modal } from "../common/Modal";
import { useClub } from "../../context/ClubContext";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  Phone, 
  CheckCircle2,
  FileText,
  ShieldCheck
} from "lucide-react";

export const EventDetailsModal = () => {
  const { detailsModalEvent, setDetailsModalEvent, setRegisterModalEvent } = useClub();

  if (!detailsModalEvent) return null;

  const dateObj = new Date(detailsModalEvent.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const seatsLeft = Math.max(0, detailsModalEvent.capacity - (detailsModalEvent.registeredCount || 0));
  const isFull = seatsLeft === 0;

  const handleRegisterClick = () => {
    const target = detailsModalEvent;
    setDetailsModalEvent(null);
    setRegisterModalEvent(target);
  };

  return (
    <Modal
      isOpen={Boolean(detailsModalEvent)}
      onClose={() => setDetailsModalEvent(null)}
      title="Event Schedule & Rules"
      headerColor="bg-[#00D2FF]"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        
        {/* Banner with Badge */}
        <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_#000] bg-slate-100">
          <img
            src={detailsModalEvent.banner}
            alt={detailsModalEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              {detailsModalEvent.category}
            </span>
          </div>
        </div>

        {/* Title & Timing Grid */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight leading-snug">
            {detailsModalEvent.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000]">
              <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
              <div>
                <div className="font-black uppercase text-black">{formattedDate}</div>
                <div className="text-black/70 font-bold">{formattedTime} onwards</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000]">
              <MapPin className="w-4 h-4 text-black stroke-[2.5]" />
              <div>
                <div className="font-black uppercase text-black">Venue Location</div>
                <div className="text-black/70 font-bold truncate max-w-[200px]">{detailsModalEvent.venue}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-black uppercase text-black">
            Event Overview
          </h4>
          <p className="text-sm font-medium text-black/80 leading-relaxed bg-[#FFFDF8] p-3 rounded-xl border-2 border-black">
            {detailsModalEvent.description}
          </p>
        </div>

        {/* Agenda / Schedule */}
        {detailsModalEvent.agenda && detailsModalEvent.agenda.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" /> Agenda Timeline
            </h4>
            <div className="rounded-xl border-2 border-black bg-white divide-y-2 divide-black shadow-[3px_3px_0px_0px_#000]">
              {detailsModalEvent.agenda.map((item, idx) => (
                <div key={idx} className="p-2.5 flex items-center gap-3 text-xs">
                  <span className="font-mono font-black text-black bg-[#FFE600] px-2 py-0.5 rounded border border-black shrink-0 w-28 text-center">
                    {item.time}
                  </span>
                  <span className="text-black font-bold">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guidelines & Coordinator */}
        <div className="p-3.5 rounded-xl border-2 border-black bg-[#00F59B]/20 text-xs font-bold text-black space-y-1">
          {detailsModalEvent.eligibility && (
            <div>
              <span className="font-black uppercase">Eligibility:</span> {detailsModalEvent.eligibility}
            </div>
          )}
          {detailsModalEvent.rules && (
            <div>
              <span className="font-black uppercase">Guidelines:</span> {detailsModalEvent.rules}
            </div>
          )}
          {detailsModalEvent.coordinator && (
            <div className="pt-1">
              <span className="font-black uppercase">Coordinator:</span> {detailsModalEvent.coordinator}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-black">
          <div className="text-xs font-black text-black">
            {seatsLeft > 0 ? (
              <span className="bg-[#00F59B] px-2 py-1 rounded border border-black">{seatsLeft} slots remaining</span>
            ) : (
              <span className="bg-[#FF5A5F] text-white px-2 py-1 rounded border border-black">Sold Out</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDetailsModalEvent(null)}
              className="px-4 py-2 font-black text-xs uppercase text-black hover:underline"
            >
              Close
            </button>

            <button
              disabled={isFull}
              onClick={handleRegisterClick}
              className={`brutal-btn flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
                isFull
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed border-black"
                  : "bg-[#FFE600] text-black shadow-[3px_3px_0px_0px_#000]"
              }`}
            >
              <span>{isFull ? "Housefull" : "Register Now"}</span>
              {!isFull && <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
