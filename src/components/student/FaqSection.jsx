import React, { useState } from "react";
import { CLUB_FAQS } from "../../data/initialData";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ArrowRight } from "lucide-react";
import { useClub } from "../../context/ClubContext";

export const FaqSection = () => {
  const { setCurrentView } = useClub();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-12 md:py-16 bg-[#F4F4F0] border-b-4 border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FFE600] border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
            <HelpCircle className="w-4 h-4 text-black stroke-[2.5]" />
            <span>Got Doubts?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base font-bold text-black/80 max-w-xl mx-auto">
            Everything you need to know about registering for events, scoring attendance ODs, and team recruitment.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {CLUB_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const accentColors = ["bg-[#FFE600]", "bg-[#00F59B]", "bg-[#00D2FF]", "bg-[#FF5A5F]"];
            const currentAccent = accentColors[index % accentColors.length];

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_#000] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg ${currentAccent} border-2 border-black flex items-center justify-center font-black text-sm text-black shrink-0 shadow-[2px_2px_0px_0px_#000]`}>
                      {index + 1}
                    </span>
                    <span className="font-black text-base sm:text-lg text-black">
                      {faq.q}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 border-t-2 border-dashed border-black/20 text-sm sm:text-base font-bold text-neutral-800 leading-relaxed bg-[#FFFDF8]">
                    <div className="p-4 rounded-xl bg-neutral-100 border-2 border-black/10">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="p-6 rounded-2xl bg-[#FFE600] border-3 border-black shadow-[6px_6px_0px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] shrink-0">
              <MessageSquare className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-black text-lg text-black">Have a specific question not listed?</h4>
              <p className="text-xs sm:text-sm font-bold text-black/80">Connect directly with our core campus leads or join as a volunteer.</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView("team")}
            className="px-5 py-2.5 bg-black text-white font-black text-sm rounded-xl border-2 border-black hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#FFE600]"
          >
            <span>Ask Chapter Leads</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
