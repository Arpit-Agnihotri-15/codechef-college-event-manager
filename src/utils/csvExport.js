// Utility to export registrations array to downloadable CSV

export const exportRegistrationsToCSV = (registrations, filename = "CodeChef_Campus_Registrations.csv") => {
  if (!registrations || registrations.length === 0) {
    alert("No registrations available to export.");
    return false;
  }

  const headers = [
    "Ticket Code",
    "Student Name",
    "Roll Number",
    "Email",
    "College / Year",
    "Phone Number",
    "Coding Handle",
    "Event Title",
    "Attendance Status",
    "Registration Date"
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const cleanStr = String(str).replace(/"/g, '""');
    return `"${cleanStr}"`;
  };

  const rows = registrations.map((r) => [
    escapeCSV(r.ticketCode || r.id),
    escapeCSV(r.studentName),
    escapeCSV(r.rollNumber || "N/A"),
    escapeCSV(r.email),
    escapeCSV(r.collegeYear),
    escapeCSV(r.phone),
    escapeCSV(r.codingHandle || "N/A"),
    escapeCSV(r.eventTitle),
    escapeCSV(r.status || "Confirmed"),
    escapeCSV(new Date(r.registeredAt).toLocaleString())
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
