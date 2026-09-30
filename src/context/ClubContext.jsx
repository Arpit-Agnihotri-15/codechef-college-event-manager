import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from "../data/initialData";
import confetti from "canvas-confetti";

const ClubContext = createContext(null);

export const ClubProvider = ({ children }) => {
  // Load events
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("codechef_neo_events");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EVENTS;
  });

  // Load registrations
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem("codechef_neo_registrations");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REGISTRATIONS;
  });

  // Active View / Landing Page: 'home' | 'events' | 'hackathons' | 'wings' | 'team' | 'admin'
  const [currentView, setCurrentView] = useState("home");

  // Modals
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [detailsModalEvent, setDetailsModalEvent] = useState(null);
  const [ticketModalData, setTicketModalData] = useState(null);
  const [adminEventModalData, setAdminEventModalData] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem("codechef_neo_events", JSON.stringify(events));
    } catch (e) {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem("codechef_neo_registrations", JSON.stringify(registrations));
    } catch (e) {}
  }, [registrations]);

  const addToast = (title, message, type = "info") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Event CRUD
  const addEvent = (eventData) => {
    const newId = `evt-${Date.now().toString(36)}`;
    const colors = ["#FFE600", "#FF5A5F", "#00F59B", "#00D2FF", "#B388FF", "#FF9F1C"];
    const accentColor = colors[Math.floor(Math.random() * colors.length)];

    const newEvent = {
      ...eventData,
      id: newId,
      registeredCount: 0,
      accentColor,
      tags: Array.isArray(eventData.tags) 
        ? eventData.tags 
        : (eventData.tags || "").split(",").map(t => t.trim()).filter(Boolean),
    };

    setEvents((prev) => {
      const updated = newEvent.isFeatured
        ? prev.map(ev => ({ ...ev, isFeatured: false }))
        : [...prev];
      return [newEvent, ...updated];
    });

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}

    addToast("Event Created!", `"${newEvent.title}" published with full interactivity.`, "success");
    return newEvent;
  };

  const updateEvent = (id, updatedFields) => {
    setEvents((prev) => {
      return prev.map((ev) => {
        if (ev.id === id) {
          const tags = Array.isArray(updatedFields.tags)
            ? updatedFields.tags
            : (typeof updatedFields.tags === "string"
              ? updatedFields.tags.split(",").map(t => t.trim()).filter(Boolean)
              : ev.tags);
          return { ...ev, ...updatedFields, tags };
        }
        if (updatedFields.isFeatured) {
          return { ...ev, isFeatured: false };
        }
        return ev;
      });
    });

    addToast("Event Updated", "All event details have been saved.", "success");
  };

  const deleteEvent = (id) => {
    const target = events.find(e => e.id === id);
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    addToast("Event Deleted", `"${target ? target.title : 'Event'}" has been removed.`, "warning");
  };

  const setFeaturedEvent = (id) => {
    setEvents((prev) =>
      prev.map((ev) => ({
        ...ev,
        isFeatured: ev.id === id
      }))
    );
    addToast("Flagship Spotlight Changed", "Featured banner updated on the homepage.", "info");
  };

  // Student Registration
  const registerStudent = (formData) => {
    const event = events.find((e) => e.id === formData.eventId);
    if (!event) throw new Error("Event not found");

    if (event.registeredCount >= event.capacity) {
      addToast("Event Full", "Sorry, this event is already fully booked!", "error");
      return null;
    }

    const prefix = event.category.split(" ")[0].substring(0, 3).toUpperCase();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const ticketCode = `CC-${prefix}-${randNum}`;

    const newReg = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventVenue: event.venue,
      eventDate: event.date,
      studentName: formData.studentName.trim(),
      rollNumber: formData.rollNumber ? formData.rollNumber.trim().toUpperCase() : "N/A",
      email: formData.email.trim(),
      collegeYear: formData.collegeYear.trim(),
      phone: formData.phone.trim(),
      codingHandle: formData.codingHandle ? formData.codingHandle.trim() : "",
      registeredAt: new Date().toISOString(),
      status: "Confirmed",
      ticketCode
    };

    setRegistrations((prev) => [newReg, ...prev]);

    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id ? { ...e, registeredCount: (e.registeredCount || 0) + 1 } : e
      )
    );

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTicketModalData(newReg);
    addToast("Registration Confirmed!", `Boom! Delegate badge generated for ${newReg.studentName}.`, "success");
    return newReg;
  };

  const deleteRegistration = (regId) => {
    const target = registrations.find(r => r.id === regId);
    if (target) {
      setEvents(prev => prev.map(e => e.id === target.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e));
    }
    setRegistrations((prev) => prev.filter((r) => r.id !== regId));
    addToast("Registration Cancelled", "Attendee was removed from event list.", "info");
  };

  const updateRegistrationStatus = (regId, newStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === regId ? { ...r, status: newStatus } : r))
    );
    addToast("Status Updated", `Attendee marked as ${newStatus}.`, "info");
  };

  const resetDemoData = () => {
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    localStorage.removeItem("codechef_neo_events");
    localStorage.removeItem("codechef_neo_registrations");
    addToast("Demo Reset", "Default bright neo-brutalist events & registrations restored.", "info");
  };

  return (
    <ClubContext.Provider
      value={{
        events,
        registrations,
        currentView,
        setCurrentView,
        registerModalEvent,
        setRegisterModalEvent,
        detailsModalEvent,
        setDetailsModalEvent,
        ticketModalData,
        setTicketModalData,
        adminEventModalData,
        setAdminEventModalData,
        addEvent,
        updateEvent,
        deleteEvent,
        setFeaturedEvent,
        registerStudent,
        deleteRegistration,
        updateRegistrationStatus,
        resetDemoData,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error("useClub must be used within a ClubProvider");
  }
  return context;
};
