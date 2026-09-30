import React from "react";
import { useClub } from "../../context/ClubContext";
import { Code2, Globe, Cpu, GitPullRequest, ArrowRight, Sparkles } from "lucide-react";

export const ClubDomains = () => {
  const { setCurrentView } = useClub();

  const domains = [
    {
      id: "cp",
      title: "Competitive Programming",
      badge: "Rated Contests",
      color: "bg-[#FFE600]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#000]",
      icon: Code2,
      description: "Data structures, algorithms, dynamic programming, and speed-coding drills for rated CodeChef rounds and ICPC qualifiers.",
      tags: ["C++ STL", "Graph Theory", "DP", "Greedy", "Binary Search"]
    },
    {
      id: "web",
      title: "Full-Stack Web & Mobile",
      badge: "Production Ready",
      color: "bg-[#00D2FF]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#000]",
      icon: Globe,
      description: "Modern JavaScript, React, TypeScript, Next.js, and Node.js microservices. We build actual software shipped to students.",
      tags: ["React 19", "Tailwind CSS", "Node.js", "REST APIs", "PostgreSQL"]
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      badge: "Frontier Tech",
      color: "bg-[#00F59B]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#000]",
      icon: Cpu,
      description: "Generative AI, LangChain, RAG pipelines, fine-tuning LLMs, computer vision, and building intelligent autonomous agents.",
      tags: ["PyTorch", "HuggingFace", "RAG Systems", "Vector DBs", "OpenAI"]
    },
    {
      id: "oss",
      title: "Open Source & Systems",
      badge: "Global Community",
      color: "bg-[#B388FF]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#000]",
      icon: GitPullRequest,
      description: "Master Git, Linux kernel workflows, contributing to world-class repositories, GSoC mentorship, and LFX fellowships.",
      tags: ["Git & GitHub", "GSoC Mentorship", "Linux CLI", "Docker", "DevOps"]
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#FFFDF8] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FF5A5F] text-white border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Specialized Wings</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
              FOUR CORE CHAPTER WINGS
            </h2>
            <p className="text-base font-bold text-black/80 max-w-2xl">
              Whether you want to climb the global competitive programming leaderboards or ship production cloud apps, we have a structured mentorship path for you.
            </p>
          </div>

          <button
            onClick={() => setCurrentView("wings")}
            className="self-start md:self-end inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE600] text-black font-black border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            <span>Explore Full Roadmaps</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* 4 Neo-Brutalist Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((dom) => {
            const Icon = dom.icon;
            return (
              <div
                key={dom.id}
                className={`p-6 sm:p-8 rounded-2xl border-4 border-black ${dom.color} shadow-[6px_6px_0px_0px_#000] transition-all transform hover:-translate-y-1 hover:translate-x-1 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]">
                      <Icon className="w-6 h-6 text-black stroke-[2.5]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black text-white font-black text-xs uppercase tracking-wider">
                      {dom.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-black tracking-tight">
                      {dom.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base font-bold text-black/85 leading-relaxed">
                      {dom.description}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {dom.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-black bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] text-black"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t-2 border-black/40 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentView("wings")}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-black hover:underline cursor-pointer"
                  >
                    <span>View Interactive Checklist</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={() => setCurrentView("events")}
                    className="px-3 py-1 bg-black text-white rounded-lg text-xs font-black border border-black hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    View Events
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
