import React, { useState, useEffect } from "react";
import { useClub } from "../../context/ClubContext";
import { 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Key, 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  Check, 
  AlertCircle,
  Hash
} from "lucide-react";

export const AuthModal = () => {
  const { 
    authModalOpen, 
    closeAuthModal, 
    authModalTab, 
    setAuthModalTab, 
    loginAdmin, 
    loginStudent,
    setCurrentView
  } = useClub();

  // Admin Form State
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    rollNumber: "",
    email: "",
    collegeYear: "B.Tech CSE • 3rd Year",
    phone: "",
    codingHandle: ""
  });
  const [studentError, setStudentError] = useState("");

  useEffect(() => {
    setAdminError("");
    setStudentError("");
  }, [authModalTab, authModalOpen]);

  if (!authModalOpen) return null;

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError("");
    const res = loginAdmin(adminId, adminPassword);
    if (!res.success) {
      setAdminError(res.message);
    } else {
      setCurrentView("admin");
    }
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setStudentError("");
    const res = loginStudent(studentForm);
    if (!res.success) {
      setStudentError(res.message);
    }
  };

  const quickFillAdmin = () => {
    setAdminId("codechef_admin");
    setAdminPassword("admin@2026");
    setAdminError("");
  };

  const quickFillStudent = () => {
    setStudentForm({
      studentName: "Aditya Verma",
      rollNumber: "22BCSE104",
      email: "aditya.v22@college.edu",
      collegeYear: "B.Tech CSE • 3rd Year",
      phone: "9876543210",
      codingHandle: "aditya_coder"
    });
    setStudentError("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_#000] overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="bg-[#FFE600] border-b-4 border-black p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-black text-[#FFE600] flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000]">
              <Key className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                Campus Portal Sign In
              </h3>
              <p className="text-xs font-bold text-black/75">
                Sign in as a student attendee or chapter coordinator
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab Selection Switch */}
        <div className="grid grid-cols-2 border-b-3 border-black bg-neutral-100">
          <button
            type="button"
            onClick={() => setAuthModalTab("student")}
            className={`py-3 px-4 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-r-2 border-black transition-all cursor-pointer ${
              authModalTab === "student"
                ? "bg-white text-black border-b-4 border-b-[#00D2FF]"
                : "text-black/60 hover:text-black"
            }`}
          >
            <GraduationCap className="w-4 h-4 stroke-[2.5]" />
            <span>Student Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthModalTab("admin")}
            className={`py-3 px-4 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              authModalTab === "admin"
                ? "bg-white text-black border-b-4 border-b-[#FFE600]"
                : "text-black/60 hover:text-black"
            }`}
          >
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6">
          
          {/* TAB 1: STUDENT SIGN IN */}
          {authModalTab === "student" && (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              
              <div className="p-3 rounded-xl bg-[#00D2FF]/20 border-2 border-black flex items-start justify-between gap-3">
                <div className="text-xs font-bold text-black/85">
                  <span className="font-black">Student Sign In:</span> Save your details to auto-fill event registrations and manage your scannable passes.
                </div>
                <button
                  type="button"
                  onClick={quickFillStudent}
                  className="shrink-0 px-2.5 py-1 text-[11px] font-black uppercase bg-[#00D2FF] text-black border border-black rounded-lg shadow-[1px_1px_0px_0px_#000] hover:bg-[#00c0eb] cursor-pointer"
                >
                  ⚡ Auto-Fill Demo
                </button>
              </div>

              {studentError && (
                <div className="p-3 rounded-xl bg-red-100 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{studentError}</span>
                </div>
              )}

              {/* Student Name */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                  <input
                    type="text"
                    required
                    value={studentForm.studentName}
                    onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                    placeholder="e.g. Aditya Verma"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Roll Number & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    University Roll No *
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                    <input
                      type="text"
                      required
                      value={studentForm.rollNumber}
                      onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                      placeholder="e.g. 22BCSE104"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl uppercase focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Department & Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.collegeYear}
                    onChange={(e) => setStudentForm({ ...studentForm, collegeYear: e.target.value })}
                    placeholder="e.g. B.Tech CSE • 3rd Year"
                    className="w-full px-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    College Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                    <input
                      type="email"
                      required
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      placeholder="aditya@college.edu"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    WhatsApp Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                    <input
                      type="tel"
                      value={studentForm.phone}
                      onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CodeChef Handle */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  CodeChef Username (Optional)
                </label>
                <input
                  type="text"
                  value={studentForm.codingHandle}
                  onChange={(e) => setStudentForm({ ...studentForm, codingHandle: e.target.value })}
                  placeholder="e.g. aditya_coder"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="px-4 py-2 rounded-xl border-2 border-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="brutal-btn px-6 py-2 rounded-xl bg-[#00D2FF] text-black font-black text-xs uppercase flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Sign In as Student</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: ADMIN PORTAL (UNIQUE ID & PASSWORD) */}
          {authModalTab === "admin" && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              
              <div className="p-3.5 rounded-xl bg-[#FFE600]/30 border-2 border-black space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-black uppercase">
                    <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
                    <span>Executive Coordinator Authentication</span>
                  </div>
                  <button
                    type="button"
                    onClick={quickFillAdmin}
                    className="px-2.5 py-1 text-[11px] font-black uppercase bg-[#FFE600] text-black border border-black rounded-lg shadow-[1px_1px_0px_0px_#000] hover:bg-[#ffe033] cursor-pointer"
                  >
                    ⚡ Auto-Fill Credentials
                  </button>
                </div>
                <p className="text-xs font-bold text-black/80">
                  Protected with a unique Chapter Administrator ID and security key.
                </p>
                <div className="text-[11px] font-mono bg-white p-2 rounded-lg border border-black/40 text-black/90">
                  <div><strong>ID:</strong> <code className="bg-neutral-100 px-1 py-0.5 rounded">codechef_admin</code></div>
                  <div><strong>Password:</strong> <code className="bg-neutral-100 px-1 py-0.5 rounded">admin@2026</code></div>
                </div>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-red-100 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              {/* Unique Admin ID */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Unique Admin ID *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                  <input
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="Enter ID (e.g. codechef_admin)"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Admin Password */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Admin Security Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/60" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#F4F4F0] border-2 border-black rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="px-4 py-2 rounded-xl border-2 border-black font-black text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="brutal-btn px-6 py-2 rounded-xl bg-[#FFE600] text-black font-black text-xs uppercase flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>Authenticate & Open Admin Suite</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
