import React, { useState } from "react";
import { CLUB_LEADERSHIP } from "../data/initialData";
import { useClub } from "../context/ClubContext";
import { Users, Send, CheckCircle2, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export const TeamJoinPage = () => {
  const { addToast } = useClub();

  const [joinForm, setJoinForm] = useState({
    name: "",
    rollNumber: "",
    email: "",
    branchYear: "2nd Year CSE",
    wing: "Competitive Programming",
    motivation: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!joinForm.name.trim() || !joinForm.email.trim() || !joinForm.rollNumber.trim()) {
      alert("Please fill in your name, roll number, and email.");
      return;
    }

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setSubmitted(true);
    addToast("Application Received!", `Thanks ${joinForm.name}, our leads will contact you for interviews.`, "success");
  };

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#B388FF] border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
          <Users className="w-4 h-4 stroke-[2.5]" />
          <span>Chapter Leadership & Recruitment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
          CORE TEAM & JOIN US
        </h1>
        <p className="text-base font-bold text-black/80 max-w-3xl leading-relaxed">
          Meet the student organizers and faculty mentors running CodeChef Campus Chapter, and apply to join our executive committee for the upcoming academic semester!
        </p>
      </div>

      {/* Team Roster Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
          <span>// Executive Committee & Faculty</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CLUB_LEADERSHIP.map((member, i) => (
            <div
              key={i}
              className="brutal-card rounded-2xl bg-white p-5 flex flex-col items-center text-center space-y-3"
            >
              <div className={`w-24 h-24 rounded-2xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_#000] ${member.color}`}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-black text-black">
                  {member.name}
                </h4>
                <div className="text-xs font-black uppercase text-black bg-[#FFE600] px-2 py-0.5 rounded border border-black inline-block">
                  {member.role}
                </div>
                <div className="text-[11px] font-bold text-black/70 mt-1">
                  {member.department}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Application Form Section */}
      <div className="rounded-3xl border-4 border-black bg-[#FFE600] p-6 sm:p-10 shadow-[10px_10px_0px_0px_#000]">
        <div className="max-w-2xl space-y-4 mb-8">
          <span className="bg-black text-[#FFE600] text-xs font-black uppercase px-3 py-1 rounded border border-black shadow-[2px_2px_0px_0px_#000]">
            SEMESTER RECRUITMENT OPEN
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-black">
            Apply to Join the Core Team!
          </h3>
          <p className="text-sm font-bold text-black/85 leading-relaxed">
            Want to help organize campus hackathons, set algorithmic contest problems, or manage web platforms? Fill out this quick application below.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_#000] text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#00F59B] mx-auto stroke-[2.5]" />
            <h4 className="text-xl font-black text-black">Application Submitted Successfully!</h4>
            <p className="text-xs font-bold text-black/70 max-w-md mx-auto">
              We have received your response. Shortlisted candidates will be invited for a friendly interview in Turing Lab next week!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="brutal-btn px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#FFE600] text-black"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_0px_#000]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-black">Your Name *</label>
                <input
                  type="text"
                  required
                  value={joinForm.name}
                  onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                  placeholder="e.g. Rahul Dev"
                  className="w-full px-3 py-2 border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:bg-[#FFE600]/10"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-black">Roll No / Reg No *</label>
                <input
                  type="text"
                  required
                  value={joinForm.rollNumber}
                  onChange={(e) => setJoinForm({ ...joinForm, rollNumber: e.target.value })}
                  placeholder="e.g. 23BCSE042"
                  className="w-full px-3 py-2 border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:bg-[#FFE600]/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-black">College Email *</label>
                <input
                  type="email"
                  required
                  value={joinForm.email}
                  onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                  placeholder="rahul@college.edu"
                  className="w-full px-3 py-2 border-2 border-black rounded-lg text-xs font-bold focus:outline-none focus:bg-[#FFE600]/10"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-black">Wing of Interest</label>
                <select
                  value={joinForm.wing}
                  onChange={(e) => setJoinForm({ ...joinForm, wing: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black rounded-lg text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Competitive Programming">Competitive Programming (Problem Setter)</option>
                  <option value="Web Development">Web & Systems Engineering</option>
                  <option value="AI & Machine Learning">AI / ML Workshop Lead</option>
                  <option value="Event Operations">Event Operations & Sponsorships</option>
                  <option value="Design & Media">Design & Social Media</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-black">
                Why do you want to join? (Short motivation)
              </label>
              <textarea
                rows={3}
                value={joinForm.motivation}
                onChange={(e) => setJoinForm({ ...joinForm, motivation: e.target.value })}
                placeholder="Tell us about your interests, past projects, or why you want to contribute to the chapter..."
                className="w-full px-3 py-2 border-2 border-black rounded-lg text-xs font-bold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="brutal-btn flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-xs uppercase bg-[#00F59B] text-black shadow-[4px_4px_0px_0px_#000]"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Submit Core Team Application</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
