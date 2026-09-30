import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "../common/Modal";
import { useClub } from "../../context/ClubContext";
import { 
  CheckCircle2, 
  Printer, 
  Calendar, 
  MapPin, 
  User, 
  Code2, 
  Download,
  Sparkles
} from "lucide-react";

export const TicketPassModal = () => {
  const { ticketModalData, setTicketModalData } = useClub();

  if (!ticketModalData) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(ticketModalData.eventDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const qrPayload = JSON.stringify({
    ticket: ticketModalData.ticketCode,
    name: ticketModalData.studentName,
    roll: ticketModalData.rollNumber,
    event: ticketModalData.eventTitle,
    verified: true
  });

  return (
    <Modal
      isOpen={Boolean(ticketModalData)}
      onClose={() => setTicketModalData(null)}
      title="Official Delegate Pass"
      headerColor="bg-[#00F59B]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        
        {/* Success Notice */}
        <div className="p-3 rounded-xl bg-[#00F59B] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-2.5 text-xs font-black text-black">
          <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0" />
          <span>Seat confirmed! Present this badge at the venue registration desk for OD check-in.</span>
        </div>

        {/* Printable Delegate Pass Stub */}
        <div
          id="printable-ticket"
          className="rounded-2xl border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] overflow-hidden"
        >
          {/* Top Header */}
          <div className="bg-[#FFE600] p-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black text-[#FFE600] flex items-center justify-center font-black">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-black leading-tight">CodeChef Campus Chapter</div>
                <div className="text-[10px] font-bold text-black/70">Verified Delegate Badge</div>
              </div>
            </div>

            <div className="font-mono text-xs font-black px-2.5 py-1 rounded bg-black text-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              {ticketModalData.ticketCode}
            </div>
          </div>

          {/* Pass Body */}
          <div className="p-5 space-y-4 bg-[#FFFDF8]">
            
            {/* Event Title */}
            <div>
              <div className="text-[10px] uppercase font-black text-black/60">Registered Event</div>
              <h4 className="text-base font-black text-black mt-0.5 leading-snug">
                {ticketModalData.eventTitle}
              </h4>
            </div>

            {/* Attendee Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs border-y-2 border-black py-3">
              <div>
                <div className="text-[10px] text-black/60 uppercase font-black">Attendee Name</div>
                <div className="font-black text-black truncate mt-0.5">{ticketModalData.studentName}</div>
              </div>

              <div>
                <div className="text-[10px] text-black/60 uppercase font-black">Roll No / Reg No</div>
                <div className="font-mono font-black text-black truncate mt-0.5">
                  {ticketModalData.rollNumber || "N/A"}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-black/60 uppercase font-black">Department & Year</div>
                <div className="font-bold text-black truncate mt-0.5">{ticketModalData.collegeYear}</div>
              </div>

              <div>
                <div className="text-[10px] text-black/60 uppercase font-black">WhatsApp Contact</div>
                <div className="font-bold text-black truncate mt-0.5">{ticketModalData.phone}</div>
              </div>
            </div>

            {/* Venue & Time with QR */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-1.5 font-bold text-black">
                  <Calendar className="w-3.5 h-3.5 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <span className="text-[11px] leading-tight">{formattedDate}</span>
                </div>
                <div className="flex items-start gap-1.5 font-bold text-black">
                  <MapPin className="w-3.5 h-3.5 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <span className="text-[11px] leading-tight line-clamp-2">{ticketModalData.eventVenue}</span>
                </div>
                <div className="text-[10px] font-black uppercase text-[#00F59B] bg-black px-2 py-0.5 rounded inline-block">
                  ✓ VERIFIED OD ATTENDEE
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] shrink-0">
                <QRCodeSVG
                  value={qrPayload}
                  size={80}
                  level="M"
                />
              </div>
            </div>

          </div>

          {/* Footer Perforated Bar */}
          <div className="bg-black text-[#FFE600] px-4 py-2 border-t-2 border-black flex items-center justify-between text-[10px] font-black uppercase">
            <span>Pass ID: {ticketModalData.id}</span>
            <span>Non-Transferable • Carry ID</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={handlePrint}
            className="brutal-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase bg-white text-black"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={() => setTicketModalData(null)}
            className="brutal-btn px-6 py-2 rounded-xl text-xs font-black uppercase bg-[#FFE600] text-black"
          >
            Done
          </button>
        </div>

      </div>
    </Modal>
  );
};
