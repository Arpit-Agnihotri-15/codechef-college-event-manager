import React, { useState, useEffect } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  Image, 
  FileText, 
  Star,
  Check
} from "lucide-react";

const CATEGORIES = [
  "Competitive Programming",
  "Web Development",
  "Hackathon",
  "AI & Machine Learning",
  "Open Source & Systems",
  "Workshop"
];

const BANNER_PRESETS = [
  { label: "Coding / CP", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" },
  { label: "Hackathon", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" },
  { label: "Web Dev", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" },
  { label: "AI & ML", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" }
];

export const EventFormModal = () => {
  const { adminEventModalData, setAdminEventModalData, addEvent, updateEvent } = useClub();

  const isOpen = Boolean(adminEventModalData);
  const isEditing = Boolean(adminEventModalData && typeof adminEventModalData === "object" && adminEventModalData.id);

  const [formData, setFormData] = useState({
    title: "",
    category: "Competitive Programming",
    date: "",
    venue: "",
    capacity: 100,
    entryFee: "Free Entry",
    eligibility: "Open to all students across all branches",
    coordinator: "Chapter Technical Core Lead",
    description: "",
    tags: "CodeChef, Algorithms, Campus Clash",
    banner: BANNER_PRESETS[0].url,
    isFeatured: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (adminEventModalData && typeof adminEventModalData === "object" && adminEventModalData.id) {
      setFormData({
        title: adminEventModalData.title || "",
        category: adminEventModalData.category || "Competitive Programming",
        date: adminEventModalData.date ? adminEventModalData.date.substring(0, 16) : "",
        venue: adminEventModalData.venue || "",
        capacity: adminEventModalData.capacity || 100,
        entryFee: adminEventModalData.entryFee || "Free Entry",
        eligibility: adminEventModalData.eligibility || "Open to all students across all branches",
        coordinator: adminEventModalData.coordinator || "Chapter Technical Core Lead",
        description: adminEventModalData.description || "",
        tags: Array.isArray(adminEventModalData.tags) ? adminEventModalData.tags.join(", ") : (adminEventModalData.tags || ""),
        banner: adminEventModalData.banner || BANNER_PRESETS[0].url,
        isFeatured: Boolean(adminEventModalData.isFeatured)
      });
      setErrors({});
    } else if (adminEventModalData === "new") {
      setFormData({
        title: "",
        category: "Competitive Programming",
        date: "2026-11-15T10:00",
        venue: "CSE Main Seminar Hall",
        capacity: 120,
        entryFee: "Free Entry",
        eligibility: "Open to all students across all branches",
        coordinator: "Chapter Technical Core Lead",
        description: "",
        tags: "CodeChef, Speed Coding, Leaderboard",
        banner: BANNER_PRESETS[0].url,
        isFeatured: false
      });
      setErrors({});
    }
  }, [adminEventModalData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.date) newErrors.date = "Date and time is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.capacity || Number(formData.capacity) <= 0) newErrors.capacity = "Valid capacity required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      capacity: Number(formData.capacity)
    };

    if (isEditing) {
      updateEvent(adminEventModalData.id, payload);
    } else {
      addEvent(payload);
    }

    setAdminEventModalData(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#FFE600] border-b-4 border-black p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-[#FFE600] flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
                {isEditing ? "Edit Campus Event" : "Create New Campus Event"}
              </h3>
              <p className="text-xs font-bold text-black/80">
                {isEditing ? `Modifying event ID: ${adminEventModalData.id}` : "Publish an interactive event to the student calendar"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminEventModalData(null)}
            className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. CodeClash: 24-Hour Inter-College Hackathon"
              className={`w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 ${
                errors.title ? "border-red-500" : "border-black"
              } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFE600]`}
            />
            {errors.title && <p className="text-xs font-black text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Category & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Seat Capacity (Limit) *
              </label>
              <input
                type="number"
                name="capacity"
                min="10"
                max="1000"
                value={formData.capacity}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 ${
                  errors.capacity ? "border-red-500" : "border-black"
                } rounded-xl focus:bg-white focus:outline-none`}
              />
              {errors.capacity && <p className="text-xs font-black text-red-600 mt-1">{errors.capacity}</p>}
            </div>
          </div>

          {/* Date & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Date & Time *
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 ${
                  errors.date ? "border-red-500" : "border-black"
                } rounded-xl focus:bg-white focus:outline-none`}
              />
              {errors.date && <p className="text-xs font-black text-red-600 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Venue Location *
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="e.g. CSE Lab 3 / Tech Park Auditorium"
                className={`w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 ${
                  errors.venue ? "border-red-500" : "border-black"
                } rounded-xl focus:bg-white focus:outline-none`}
              />
              {errors.venue && <p className="text-xs font-black text-red-600 mt-1">{errors.venue}</p>}
            </div>
          </div>

          {/* Entry Fee & Eligibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Entry Fee
              </label>
              <input
                type="text"
                name="entryFee"
                value={formData.entryFee}
                onChange={handleChange}
                placeholder="Free Entry or ₹50"
                className="w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-1">
                Eligibility
              </label>
              <input
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                placeholder="Open to all semesters / branches"
                className="w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Coordinator */}
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Lead Coordinator / Speaker
            </label>
            <input
              type="text"
              name="coordinator"
              value={formData.coordinator}
              onChange={handleChange}
              placeholder="e.g. Ananya Iyer (CP Wing Lead)"
              className="w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Detailed Description *
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="What will students learn or build during this event?"
              className={`w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 ${
                errors.description ? "border-red-500" : "border-black"
              } rounded-xl focus:bg-white focus:outline-none`}
            />
            {errors.description && <p className="text-xs font-black text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Pills & Tags (Comma Separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. Competitive Programming, Algorithms, Cash Prizes"
              className="w-full px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          {/* Banner URL & Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-black">
              Cover Banner Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                placeholder="https://..."
                className="flex-1 px-3 py-2 text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-black text-black/70 uppercase">Quick Presets:</span>
              {BANNER_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, banner: p.url }))}
                  className="px-2.5 py-1 text-xs font-black rounded-lg border border-black bg-white hover:bg-neutral-100 cursor-pointer shadow-[1px_1px_0px_0px_#000]"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Spotlight Checkbox */}
          <div className="p-3.5 rounded-xl border-2 border-black bg-[#FFE600]/30 flex items-center justify-between">
            <div>
              <div className="text-sm font-black text-black flex items-center gap-1.5">
                <Star className="w-4 h-4 text-black fill-black" />
                <span>Feature as Homepage Flagship Spotlight</span>
              </div>
              <p className="text-xs font-bold text-black/70">
                Puts this event on the main hero countdown banner with live flip timer.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 accent-black rounded border-2 border-black cursor-pointer"
              />
            </label>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t-2 border-black flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setAdminEventModalData(null)}
              className="px-4 py-2.5 rounded-xl border-2 border-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="brutal-btn px-6 py-2.5 rounded-xl bg-[#00F59B] text-black font-black text-xs uppercase flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isEditing ? "Save Changes" : "Publish Event"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
