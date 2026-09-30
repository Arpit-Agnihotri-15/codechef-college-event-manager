import React, { useState, useMemo } from "react";
import { useClub } from "../context/ClubContext";
import { CATEGORIES } from "../data/initialData";
import { EventCard } from "../components/student/EventCard";
import { 
  Search, 
  Calendar, 
  X, 
  LayoutGrid, 
  ListOrdered,
  MapPin,
  Clock,
  ArrowRight
} from "lucide-react";

export const EventsPage = () => {
  const { events, setDetailsModalEvent, setRegisterModalEvent } = useClub();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "timeline"

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Filter by Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) => {
        const titleMatch = e.title.toLowerCase().includes(q);
        const descMatch = (e.description || "").toLowerCase().includes(q);
        const venueMatch = (e.venue || "").toLowerCase().includes(q);
        const tagMatch = (e.tags || []).some((t) => t.toLowerCase().includes(q));
        return titleMatch || descMatch || venueMatch || tagMatch;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "popularity") {
        return (b.registeredCount || 0) - (a.registeredCount || 0);
      }
      return 0;
    });

    return result;
  }, [events, selectedCategory, searchQuery, sortBy]);

  const categoryColors = {
    "All": "bg-white",
    "Competitive Programming": "bg-[#FFE600]",
    "Web Development": "bg-[#00D2FF]",
    "Hackathons": "bg-[#FF5A5F] text-white",
    "AI & Machine Learning": "bg-[#00F59B]",
    "Workshops & Talks": "bg-[#B388FF]"
  };

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00D2FF] border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
          <Calendar className="w-4 h-4 stroke-[2.5]" />
          <span>Full Semester Schedule</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
          EVENTS & CONTESTS CATALOG
        </h1>
        <p className="text-base font-bold text-black/80 max-w-3xl leading-relaxed">
          Filter by category, search by topic, or switch to the Interactive Timeline Roadmap. All events are open for free student delegate registration.
        </p>
      </div>

      {/* Search and Filters Control Center */}
      <div className="p-5 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] space-y-4">
        
        {/* Top Row: Search Input, View Mode, and Sort Selector */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event name, topic, or venue..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FFFDF8] border-2 border-black text-xs sm:text-sm font-bold text-black placeholder-black/50 focus:outline-none focus:bg-[#FFE600]/10 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-[#FF5A5F]"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Grid vs Timeline */}
          <div className="flex items-center border-2 border-black rounded-xl overflow-hidden shrink-0 bg-[#FFFDF8]">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase transition-colors ${
                viewMode === "grid" ? "bg-[#FFE600] text-black" : "text-black/70 hover:bg-slate-100"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase border-l-2 border-black transition-colors ${
                viewMode === "timeline" ? "bg-[#00D2FF] text-black" : "text-black/70 hover:bg-slate-100"
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#FFFDF8] border-2 border-black text-xs font-black uppercase text-black focus:outline-none cursor-pointer"
            >
              <option value="date-asc">Date: Earliest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="popularity">Most Popular (Seats Filled)</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const customColor = categoryColors[category] || "bg-white";

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide border-2 border-black whitespace-nowrap transition-all ${
                  isSelected
                    ? `${customColor} shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]`
                    : "bg-[#FFFDF8] text-black hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs font-black uppercase text-black px-1">
        <span>
          Showing {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </span>
        {(searchQuery || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-[#FF5A5F] hover:underline"
          >
            Clear Filters [X]
          </button>
        )}
      </div>

      {/* Grid View vs Timeline View */}
      {filteredEvents.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] space-y-3">
          <h3 className="text-xl font-black text-black">No matching events found</h3>
          <p className="text-xs font-bold text-black/70 max-w-sm mx-auto">
            Try adjusting your search keyword or select "All" categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="brutal-btn px-5 py-2.5 rounded-xl text-xs font-black uppercase bg-[#FFE600] text-black"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        /* Timeline Roadmap View */
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-8 before:w-1 before:bg-black">
          {filteredEvents.map((event, idx) => {
            const dateObj = new Date(event.date);
            const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const timeStr = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

            return (
              <div key={event.id} className="relative pl-16">
                {/* Node on Timeline */}
                <div className="absolute left-6 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-black text-[10px]">
                  {idx + 1}
                </div>

                <div className="brutal-card rounded-2xl bg-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFE600] border border-black">
                        {event.category}
                      </span>
                      <span className="text-xs font-bold text-black/70 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 stroke-[2.5]" /> {dateStr} • {timeStr}
                      </span>
                    </div>

                    <h4 
                      onClick={() => setDetailsModalEvent(event)}
                      className="text-base font-black text-black hover:text-[#2563EB] cursor-pointer truncate"
                    >
                      {event.title}
                    </h4>

                    <div className="text-xs font-bold text-black/70 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setDetailsModalEvent(event)}
                      className="brutal-btn px-3 py-2 rounded-xl text-xs font-black uppercase bg-white text-black"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setRegisterModalEvent(event)}
                      className="brutal-btn px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#00F59B] text-black"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
