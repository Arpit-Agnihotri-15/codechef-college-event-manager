import React from "react";
import { ClubProvider, useClub } from "./context/ClubContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { ToastContainer } from "./components/common/ToastContainer";
import { MovableStickerBoard } from "./components/common/MovableStickerBoard";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { HackathonsPage } from "./pages/HackathonsPage";
import { WingsRoadmapsPage } from "./pages/WingsRoadmapsPage";
import { TeamJoinPage } from "./pages/TeamJoinPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { RegistrationModal } from "./components/student/RegistrationModal";
import { TicketPassModal } from "./components/student/TicketPassModal";
import { EventDetailsModal } from "./components/student/EventDetailsModal";
import { AuthModal } from "./components/common/AuthModal";
import { StudentPassesModal } from "./components/student/StudentPassesModal";

const AppContent = () => {
  const { currentView } = useClub();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-black">
      {/* Sticky Neo-Brutalist Navbar */}
      <Navbar />

      {/* Main Multi-Landing Pages Router */}
      <main className="flex-1">
        {currentView === "home" && <HomePage />}
        {currentView === "events" && <EventsPage />}
        {currentView === "hackathons" && <HackathonsPage />}
        {currentView === "wings" && <WingsRoadmapsPage />}
        {currentView === "team" && <TeamJoinPage />}
        {currentView === "admin" && <AdminDashboard />}
      </main>

      {/* Interactive Movable Sticker Board & Playground */}
      <MovableStickerBoard />

      {/* Modals & Dialogs */}
      <RegistrationModal />
      <TicketPassModal />
      <EventDetailsModal />
      <AuthModal />
      <StudentPassesModal />

      {/* Floating Retro Toasts */}
      <ToastContainer />

      {/* Branded Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ClubProvider>
      <AppContent />
    </ClubProvider>
  );
}
