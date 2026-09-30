import React from "react";
import { Sparkles, Terminal, Flame, Trophy } from "lucide-react";

export const MarqueeStrip = ({ 
  bgColor = "bg-[#FFE600]", 
  textColor = "text-black",
  borderColor = "border-y-[3px] border-black" 
}) => {
  const items = [
    "⚡ CODECHEF CAMPUS CHAPTER",
    "🏆 STARTERS INVITATIONAL CLASH",
    "💻 24-HR HACKATHONS",
    "📜 ON-DUTY (OD) APPROVED",
    "🍕 MIDNIGHT PIZZA & CODING",
    "🚀 100% FREE FOR STUDENTS",
    "⭐ 1,200+ ACTIVE CAMPUS CODERS",
    "🎁 CASH PRIZES & RATINGS"
  ];

  return (
    <div className={`overflow-hidden py-2.5 ${bgColor} ${textColor} ${borderColor} shadow-[0_4px_0_0_#000]`}>
      <div className="animate-marquee flex items-center whitespace-nowrap gap-8 text-xs sm:text-sm font-black tracking-wider uppercase select-none">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span>{item}</span>
            <span className="w-2 h-2 rounded-full bg-black shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
};
