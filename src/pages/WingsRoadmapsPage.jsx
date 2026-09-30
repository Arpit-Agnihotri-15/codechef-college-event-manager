import React, { useState } from "react";
import { Code2, Globe, Cpu, GitPullRequest, CheckSquare, Square, Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useClub } from "../context/ClubContext";

export const WingsRoadmapsPage = () => {
  const { setCurrentView } = useClub();

  const [checkedItems, setCheckedItems] = useState({});

  const wingsData = [
    {
      id: "cp",
      title: "Competitive Programming Wing",
      badge: "Core Track",
      color: "bg-[#FFE600]",
      icon: Code2,
      description: "Master high-speed problem solving and algorithms for rated CodeChef contests and top tech company hiring assessments.",
      milestones: [
        "Time & Space Complexity Analysis (Big-O)",
        "C++ Standard Template Library (Vectors, Sets, Maps)",
        "Sorting & Binary Search Paradigms",
        "Two Pointers & Sliding Window Patterns",
        "Graph Traversals (BFS, DFS, Dijkstra)",
        "Dynamic Programming (Knapsack & Subsequences)"
      ]
    },
    {
      id: "web",
      title: "Full-Stack Web Engineering",
      badge: "Project Track",
      color: "bg-[#00D2FF]",
      icon: Globe,
      description: "Ship scalable modern web applications from frontend interfaces to cloud-deployed database backends.",
      milestones: [
        "Modern ES6+ JavaScript & TypeScript Basics",
        "React 19 Hooks, State, and Component Architecture",
        "Tailwind CSS & Responsive Layout Systems",
        "REST APIs & Node.js/Express Server Development",
        "Database Modeling (PostgreSQL / MongoDB)",
        "Cloud Deployment with Vercel & Docker"
      ]
    },
    {
      id: "ai",
      title: "Artificial Intelligence & ML",
      badge: "Frontier Wing",
      color: "bg-[#00F59B]",
      icon: Cpu,
      description: "Build intelligent systems, integrate modern generative AI APIs, and develop vector search applications.",
      milestones: [
        "Python for Data Science (NumPy, Pandas)",
        "Machine Learning Foundations (Scikit-Learn)",
        "Deep Learning Basics with PyTorch",
        "Vector Embeddings & ChromaDB / Pinecone",
        "Building RAG Applications with LangChain",
        "Model Quantization & Local LLM Serving"
      ]
    },
    {
      id: "oss",
      title: "Open Source & Hackathon Sprints",
      badge: "Community Wing",
      color: "bg-[#B388FF]",
      icon: GitPullRequest,
      description: "Collaborate on real-world open-source repositories and prepare winning proposals for GSoC and Hacktoberfest.",
      milestones: [
        "Git Branching, Rebasing & Resolving Merge Conflicts",
        "Writing High-Quality GitHub Pull Requests",
        "Understanding Open Source Licenses & Codebases",
        "Cracking Google Summer of Code (GSoC) Proposals",
        "Rapid 24-Hour Hackathon Prototyping",
        "Pitching Technical Projects to Juries"
      ]
    }
  ];

  const handleToggle = (itemId) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      if (!prev[itemId]) {
        try {
          confetti({ particleCount: 20, spread: 50 });
        } catch (e) {}
      }
      return next;
    });
  };

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00F59B] border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
          <Sparkles className="w-4 h-4 stroke-[2.5]" />
          <span>Interactive Learning Roadmaps</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
          SPECIALIZED CHAPTER WINGS
        </h1>
        <p className="text-base font-bold text-black/80 max-w-3xl leading-relaxed">
          Track your progress through our curated technical roadmaps. Click on any milestone checkbox to mark it as completed and see your engineer readiness rise!
        </p>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {wingsData.map((wing) => {
          const Icon = wing.icon;
          const completedCount = wing.milestones.filter((_, idx) => checkedItems[`${wing.id}-${idx}`]).length;
          const progressPercent = Math.round((completedCount / wing.milestones.length) * 100);

          return (
            <div
              key={wing.id}
              className="brutal-card rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${wing.color} border-[3px] border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-black stroke-[2.5]" />
                  </div>

                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] ${wing.color}`}>
                    {wing.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-black tracking-tight">
                    {wing.title}
                  </h3>
                  <p className="text-xs font-bold text-black/70 mt-1 leading-relaxed">
                    {wing.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 p-3 rounded-xl bg-[#FFFDF8] border-2 border-black">
                  <div className="flex items-center justify-between text-xs font-black text-black">
                    <span>Readiness Progress</span>
                    <span>{completedCount} / {wing.milestones.length} Milestones ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 border-2 border-black rounded-full overflow-hidden">
                    <div
                      className={`h-full ${wing.color} transition-all duration-300`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Milestones Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-black">
                    Interactive Skill Milestones (Click to Check):
                  </span>
                  <div className="space-y-1.5">
                    {wing.milestones.map((milestone, idx) => {
                      const itemKey = `${wing.id}-${idx}`;
                      const isChecked = Boolean(checkedItems[itemKey]);

                      return (
                        <div
                          key={idx}
                          onClick={() => handleToggle(itemKey)}
                          className={`p-2.5 rounded-lg border-2 border-black flex items-center gap-3 cursor-pointer transition-all select-none ${
                            isChecked
                              ? `${wing.color} shadow-[2px_2px_0px_0px_#000] font-bold`
                              : "bg-white hover:bg-slate-50 text-black/80 font-medium"
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-black shrink-0 stroke-[3]" />
                          ) : (
                            <Square className="w-4 h-4 text-black/40 shrink-0 stroke-[2.5]" />
                          )}
                          <span className={`text-xs ${isChecked ? "line-through text-black" : ""}`}>
                            {milestone}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  setCurrentView("events");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="brutal-btn w-full py-2.5 rounded-xl font-black text-xs uppercase bg-[#FFE600] text-black text-center flex items-center justify-center gap-2"
              >
                <span>Find Upcoming {wing.title.split(" ")[0]} Events</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
