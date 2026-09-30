import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useClub } from "../../context/ClubContext";
import { 
  User, 
  Mail, 
  GraduationCap, 
  Phone, 
  Code, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Hash,
  Sparkles
} from "lucide-react";

export const RegistrationModal = () => {
  const { registerModalEvent, setRegisterModalEvent, registerStudent } = useClub();

  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    email: "",
    collegeYear: "B.Tech CSE • 3rd Year",
    phone: "",
    codingHandle: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!registerModalEvent) return null;

  const validateField = (name, value) => {
    switch (name) {
      case "studentName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "rollNumber":
        if (!value.trim()) return "College Roll No / Reg No is required for OD letter";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address";
        return "";
      case "collegeYear":
        if (!value.trim()) return "Please select your department and year";
        return "";
      case "phone":
        if (!value.trim()) return "WhatsApp / phone number is required";
        if (!/^\+?[0-9\s\-()]{8,15}$/.test(value.trim())) return "Enter a valid phone number";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const fields = ["studentName", "rollNumber", "email", "collegeYear", "phone"];
    fields.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });

    setTouched({
      studentName: true,
      rollNumber: true,
      email: true,
      collegeYear: true,
      phone: true
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      registerStudent({
        eventId: registerModalEvent.id,
        ...formData
      });

      setRegisterModalEvent(null);
      setFormData({
        studentName: "",
        rollNumber: "",
        email: "",
        collegeYear: "B.Tech CSE • 3rd Year",
        phone: "",
        codingHandle: ""
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = new Date(registerModalEvent.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Modal
      isOpen={Boolean(registerModalEvent)}
      onClose={() => setRegisterModalEvent(null)}
      title="Delegate Registration"
      headerColor="bg-[#FFE600]"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        
        {/* Event Preview Banner */}
        <div className="p-4 rounded-xl bg-[#FFFDF8] border-[3px] border-black shadow-[4px_4px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase bg-[#00D2FF] text-black px-2 py-0.5 rounded border border-black">
              {registerModalEvent.category}
            </span>
            <span className="text-xs font-black uppercase text-[#00F59B] bg-black px-2 py-0.5 rounded">
              FREE CAMPUS ENTRY
            </span>
          </div>
          <h4 className="text-base font-black text-black leading-snug pt-1">
            {registerModalEvent.title}
          </h4>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-black/75 pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
              {registerModalEvent.venue}
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          
          {/* Full Name & Roll Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-black">
                Full Name <span className="text-[#FF5A5F]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Aryan Sharma"
                  className={`w-full px-3 py-2 rounded-lg bg-white border-2 border-black font-bold text-xs text-black placeholder-black/40 focus:outline-none focus:bg-[#FFE600]/10 ${
                    touched.studentName && errors.studentName ? "border-[#FF5A5F]" : "border-black"
                  }`}
                />
              </div>
              {touched.studentName && errors.studentName && (
                <p className="text-[11px] font-black text-[#FF5A5F]">{errors.studentName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-black">
                Roll No / Reg No <span className="text-[#FF5A5F]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 22BCSE104"
                  className={`w-full px-3 py-2 rounded-lg bg-white border-2 border-black font-bold text-xs text-black placeholder-black/40 focus:outline-none focus:bg-[#FFE600]/10 ${
                    touched.rollNumber && errors.rollNumber ? "border-[#FF5A5F]" : "border-black"
                  }`}
                />
              </div>
              {touched.rollNumber && errors.rollNumber && (
                <p className="text-[11px] font-black text-[#FF5A5F]">{errors.rollNumber}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-black">
                Email Address <span className="text-[#FF5A5F]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="student@college.edu"
                className={`w-full px-3 py-2 rounded-lg bg-white border-2 border-black font-bold text-xs text-black placeholder-black/40 focus:outline-none focus:bg-[#FFE600]/10 ${
                  touched.email && errors.email ? "border-[#FF5A5F]" : "border-black"
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-[11px] font-black text-[#FF5A5F]">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-black uppercase text-black">
                WhatsApp / Phone <span className="text-[#FF5A5F]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="9876543210"
                className={`w-full px-3 py-2 rounded-lg bg-white border-2 border-black font-bold text-xs text-black placeholder-black/40 focus:outline-none focus:bg-[#FFE600]/10 ${
                  touched.phone && errors.phone ? "border-[#FF5A5F]" : "border-black"
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="text-[11px] font-black text-[#FF5A5F]">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Department & Year */}
          <div className="space-y-1">
            <label className="block text-xs font-black uppercase text-black">
              Department & Year of Study <span className="text-[#FF5A5F]">*</span>
            </label>
            <input
              type="text"
              name="collegeYear"
              value={formData.collegeYear}
              onChange={handleChange}
              placeholder="e.g. B.Tech CSE • 3rd Year"
              className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black font-bold text-xs text-black focus:outline-none"
            />
          </div>

          {/* CodeChef Handle */}
          <div className="space-y-1">
            <label className="block text-xs font-black uppercase text-black flex items-center justify-between">
              <span>CodeChef Handle / GitHub username</span>
              <span className="text-[10px] text-black/50 font-bold">OPTIONAL</span>
            </label>
            <input
              type="text"
              name="codingHandle"
              value={formData.codingHandle}
              onChange={handleChange}
              placeholder="e.g. aryan_coder"
              className="w-full px-3 py-2 rounded-lg bg-white border-2 border-black font-bold text-xs text-black placeholder-black/40 focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t-2 border-black">
            <button
              type="button"
              onClick={() => setRegisterModalEvent(null)}
              className="px-4 py-2 font-black text-xs uppercase text-black hover:underline"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="brutal-btn flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-black text-xs uppercase bg-[#FFE600] text-black shadow-[4px_4px_0px_0px_#000] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Generating Ticket..." : "Confirm & Get Pass"}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

        </form>

      </div>
    </Modal>
  );
};
