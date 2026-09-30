// Rich dataset for CodeChef Campus Chapter

export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "CodeChef Starters: Campus Division Clash",
    category: "Competitive Programming",
    date: "2026-10-15T17:30",
    venue: "Alan Turing Computer Lab (Tech Block - 3rd Floor)",
    description: "The official campus round of CodeChef Starters! Compete across 6 algorithmic problems. Rating changes will be published on the campus leaderboard with certificates and goodies for top 10 rankers.",
    capacity: 120,
    registeredCount: 94,
    isFeatured: true,
    accentColor: "#FFE600",
    badgeBg: "bg-[#FFE600]",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tags: ["Algorithms", "Campus Rating", "OD Approved", "Cash Prizes"],
    coordinator: "Rohan Varma (Final Yr, CSE) • +91 98765 43210",
    entryFee: "Free Entry",
    eligibility: "Open to 1st, 2nd, 3rd & 4th Year B.Tech students",
    agenda: [
      { time: "05:15 PM", title: "Reporting & Seating Verification" },
      { time: "05:30 PM", title: "Contest Live on CodeChef Platform" },
      { time: "07:30 PM", title: "Contest Ends & Anti-Cheat Screening" },
      { time: "07:45 PM", title: "Editorial Walkthrough & Top Rankers Swag" }
    ],
    rules: "Bring college ID card and laptop. LAN cables and high-speed Wi-Fi provided. CodeChef account required."
  },
  {
    id: "evt-2",
    title: "DevHacks '26: 24-Hour Annual Campus Hackathon",
    category: "Hackathons",
    date: "2026-11-06T09:00",
    venue: "Main University Auditorium & Innovation Hub",
    description: "Our flagship annual 24-hour hackathon! Form teams of 2 to 4 and build working prototypes in Web3, Healthcare, AI Agents, or Campus Utility. Mentors from top startups will assist teams overnight.",
    capacity: 200,
    registeredCount: 168,
    isFeatured: false,
    accentColor: "#FF5A5F",
    badgeBg: "bg-[#FF5A5F]",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Hackathon", "₹1,00,000 Cash Pool", "Mentorship", "Meals Included"],
    coordinator: "Ananya Iyer (3rd Yr, IT) • +91 91234 56789",
    entryFee: "Free Entry",
    eligibility: "Teams of 2-4 students (Inter-department allowed)",
    agenda: [
      { time: "09:00 AM (Day 1)", title: "Opening Ceremony & Problem Tracks Released" },
      { time: "11:00 AM", title: "Hacking Begins & Mentor Review 1" },
      { time: "08:00 PM", title: "Mid-way Progress Evaluation & Dinner" },
      { time: "09:00 AM (Day 2)", title: "Code Freeze & Pitching to Industry Jury" }
    ],
    rules: "All code must be written during the hackathon. Pre-built libraries allowed. Overnight stay with college approval."
  },
  {
    id: "evt-3",
    title: "Zero to Production: Full-Stack React & Node Workshop",
    category: "Web Development",
    date: "2026-10-24T14:00",
    venue: "Seminar Hall 2, Dept of CSE",
    description: "Hands-on, zero-fluff workshop designed to take you from core JavaScript to deploying a full-stack web application with React 19, Tailwind CSS, and a Node/Express backend on Vercel.",
    capacity: 75,
    registeredCount: 68,
    isFeatured: false,
    accentColor: "#00D2FF",
    badgeBg: "bg-[#00D2FF]",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 19", "Hands-on", "Beginner Friendly", "Project-Based"],
    coordinator: "Devansh Nair (3rd Yr, CSE) • +91 99887 76655",
    entryFee: "Free Entry",
    eligibility: "All students interested in web development",
    agenda: [
      { time: "02:00 PM", title: "Modern Web Architecture & Tooling" },
      { time: "02:45 PM", title: "Building Responsive UI with React & Tailwind" },
      { time: "04:00 PM", title: "Connecting APIs and Authentication" },
      { time: "05:00 PM", title: "Live Production Deployment on Cloud" }
    ],
    rules: "Please install Node.js (LTS version) and VS Code on your laptop beforehand."
  },
  {
    id: "evt-4",
    title: "Cracking Top Tech: DSA Interview Prep Sprint",
    category: "Competitive Programming",
    date: "2026-11-14T16:00",
    venue: "Smart Classroom 102, Block A",
    description: "Interactive problem-solving session led by 4th-year seniors placed at Cisco, Amazon, and Atlassian. We will break down high-frequency patterns: Two Pointers, Dynamic Programming, and Graph Traversals.",
    capacity: 90,
    registeredCount: 82,
    isFeatured: false,
    accentColor: "#00F59B",
    badgeBg: "bg-[#00F59B]",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Interview Prep", "Placements", "DSA Patterns", "Q&A with Seniors"],
    coordinator: "Siddharth Rao (4th Yr, CSE)",
    entryFee: "Free Entry",
    eligibility: "2nd, 3rd, and 4th Year students preparing for interviews",
    agenda: [
      { time: "04:00 PM", title: "Interview Trends & Core LeetCode Patterns" },
      { time: "04:45 PM", title: "Live Problem Walkthroughs (Medium to Hard)" },
      { time: "05:30 PM", title: "Mock Technical Interview Demonstration" },
      { time: "06:00 PM", title: "Open Q&A and Resume Review" }
    ],
    rules: "Notebook and laptop recommended for coding along."
  },
  {
    id: "evt-5",
    title: "Intro to Open Source & Google Summer of Code (GSoC)",
    category: "Workshops & Talks",
    date: "2026-10-30T16:30",
    venue: "Mechanical Dept Auditorium (Auditorium 2)",
    description: "Learn how to make your very first pull request to open-source software and prepare a winning proposal for GSoC, LFX Mentorship, and Hacktoberfest. Features past student GSoC scholars from our college.",
    capacity: 150,
    registeredCount: 110,
    isFeatured: false,
    accentColor: "#B388FF",
    badgeBg: "bg-[#B388FF]",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    tags: ["Open Source", "GSoC Guide", "Git & GitHub", "Fellowships"],
    coordinator: "Pooja Hegde (GSoC '24 Contributor)",
    entryFee: "Free Entry",
    eligibility: "Open to all semesters and departments",
    agenda: [
      { time: "04:30 PM", title: "What is Open Source & Why it Matters" },
      { time: "05:00 PM", title: "Hands-on: Forking, Branching, PRs on GitHub" },
      { time: "05:45 PM", title: "How to Draft a Strong GSoC Proposal" },
      { time: "06:15 PM", title: "Interactive Student AMA" }
    ],
    rules: "Must have an active GitHub account."
  },
  {
    id: "evt-6",
    title: "Practical AI & LLM Applications Bootcamp",
    category: "AI & Machine Learning",
    date: "2026-11-21T14:30",
    venue: "CSE Department Research Lab (Room 405)",
    description: "Build practical AI applications using OpenAI / Gemini APIs, LangChain, and Vector Databases. Learn how Retrieval-Augmented Generation (RAG) works under the hood and build an interactive Campus FAQ Bot.",
    capacity: 60,
    registeredCount: 45,
    isFeatured: false,
    accentColor: "#FF9F1C",
    badgeBg: "bg-[#FF9F1C]",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["GenAI", "LangChain", "RAG Pipeline", "Hands-on"],
    coordinator: "Karan Johar (M.Tech AI Scholar)",
    entryFee: "Free Entry",
    eligibility: "Basic knowledge of Python is required",
    agenda: [
      { time: "02:30 PM", title: "Foundations of Large Language Models & APIs" },
      { time: "03:15 PM", title: "Embeddings & Vector Databases (ChromaDB)" },
      { time: "04:15 PM", title: "Building a RAG Document QA System" },
      { time: "05:15 PM", title: "Deployment and Next Steps" }
    ],
    rules: "Bring a laptop with Python 3.10+ and Jupyter Notebook / VS Code."
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: "reg-101",
    eventId: "evt-1",
    eventTitle: "CodeChef Starters: Campus Division Clash",
    studentName: "Aditya Verma",
    rollNumber: "22BCSE104",
    email: "aditya.v22@college.edu",
    collegeYear: "B.Tech CSE • 3rd Year",
    phone: "9876543210",
    codingHandle: "aditya_coder",
    registeredAt: "2026-09-25T10:14:00",
    status: "Confirmed",
    ticketCode: "CC-CP-4912"
  },
  {
    id: "reg-102",
    eventId: "evt-1",
    eventTitle: "CodeChef Starters: Campus Division Clash",
    studentName: "Priya Sundaram",
    rollNumber: "23BIT082",
    email: "priya.s23@college.edu",
    collegeYear: "B.Tech IT • 2nd Year",
    phone: "9812345678",
    codingHandle: "priya_algo",
    registeredAt: "2026-09-26T14:22:00",
    status: "Confirmed",
    ticketCode: "CC-CP-7231"
  },
  {
    id: "reg-103",
    eventId: "evt-2",
    eventTitle: "DevHacks '26: 24-Hour Annual Campus Hackathon",
    studentName: "Kunal Mehra",
    rollNumber: "21BCSE015",
    email: "kunal.m21@college.edu",
    collegeYear: "B.Tech CSE • 4th Year",
    phone: "9765432109",
    codingHandle: "kunal_builds",
    registeredAt: "2026-09-27T09:40:00",
    status: "Confirmed",
    ticketCode: "CC-HCK-3840"
  },
  {
    id: "reg-104",
    eventId: "evt-3",
    eventTitle: "Zero to Production: Full-Stack React & Node Workshop",
    studentName: "Sneha Sen",
    rollNumber: "23BECE049",
    email: "sneha.s23@college.edu",
    collegeYear: "B.Tech ECE • 2nd Year",
    phone: "9988776655",
    codingHandle: "sneha_web",
    registeredAt: "2026-09-27T18:05:00",
    status: "Confirmed",
    ticketCode: "CC-WEB-8119"
  },
  {
    id: "reg-105",
    eventId: "evt-4",
    eventTitle: "Cracking Top Tech: DSA Interview Prep Sprint",
    studentName: "Devansh Rastogi",
    rollNumber: "22BAIDS028",
    email: "devansh.r22@college.edu",
    collegeYear: "B.Tech AI & DS • 3rd Year",
    phone: "9123456789",
    codingHandle: "devansh_algo",
    registeredAt: "2026-09-28T11:15:00",
    status: "Confirmed",
    ticketCode: "CC-CP-6294"
  }
];

export const CATEGORIES = [
  "All",
  "Competitive Programming",
  "Web Development",
  "Hackathons",
  "AI & Machine Learning",
  "Workshops & Talks"
];

// Movable Interactive Stickers for user interactivity
export const INITIAL_STICKERS = [
  { id: "st-1", text: "🏆 5★ CodeChef", x: 20, y: 30, color: "#FFE600", rotate: -5 },
  { id: "st-2", text: "⚡ Hackathon Champion", x: 240, y: 15, color: "#00F59B", rotate: 4 },
  { id: "st-3", text: "☕ 404: Sleep Not Found", x: 490, y: 40, color: "#FF5A5F", rotate: -3 },
  { id: "st-4", text: "🚀 Ship to Production", x: 740, y: 20, color: "#00D2FF", rotate: 6 },
  { id: "st-5", text: "🍕 Free Pizza & OD", x: 960, y: 35, color: "#B388FF", rotate: -4 }
];

// Past Hackathons for the Hall of Fame Landing Page
export const PAST_HACKATHONS = [
  {
    edition: "DevHacks '25",
    date: "November 2025",
    participants: "420+ Hackers",
    projectsBuilt: "86 Projects",
    winnerTeam: "Team Algoverse (3rd Yr CSE)",
    project: "CampusSync: Decentralized Attendance & OD Verification",
    prize: "₹50,000 First Place",
    color: "#FFE600"
  },
  {
    edition: "CodeClash 2.0",
    date: "April 2025",
    participants: "280+ Coders",
    projectsBuilt: "48 Problem Sets",
    winnerTeam: "Solo Rank 1: Ananya Iyer",
    project: "Solved 7/7 problems in 1h 42m",
    prize: "₹25,000 & CodeChef Goodies",
    color: "#00F59B"
  },
  {
    edition: "InnoSprint Winter '24",
    date: "December 2024",
    participants: "350+ Hackers",
    projectsBuilt: "64 Prototypes",
    winnerTeam: "Team NeuralAid",
    project: "Real-time Sign Language Speech Converter via MediaPipe",
    prize: "₹40,000 & Incubation Grant",
    color: "#00D2FF"
  }
];

export const CLUB_STATS = [
  { label: "Active Student Coders", value: "1,200+", color: "bg-[#FFE600]" },
  { label: "Events & Contests", value: "48+", color: "bg-[#00F59B]" },
  { label: "CodeChef Submissions", value: "15,000+", color: "bg-[#00D2FF]" },
  { label: "Placements Impact", value: "180+", color: "bg-[#FF5A5F]" }
];

export const CLUB_LEADERSHIP = [
  {
    name: "Dr. K. S. Venkatesh",
    role: "Faculty Advisor",
    department: "Associate Professor, Dept. of CSE",
    color: "bg-[#FFE600]",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Aarav Sharma",
    role: "Chapter President",
    department: "Final Year B.Tech CSE",
    color: "bg-[#00F59B]",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Ananya Iyer",
    role: "CP Wing Lead",
    department: "3rd Year B.Tech CSE (5★ CodeChef)",
    color: "bg-[#FF5A5F]",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Devansh Nair",
    role: "Technical Lead",
    department: "3rd Year B.Tech IT",
    color: "bg-[#00D2FF]",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Rhea Thomas",
    role: "Events & Ops Lead",
    department: "3rd Year B.Tech CSE",
    color: "bg-[#B388FF]",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
  }
];

export const CLUB_FAQS = [
  {
    q: "Who can register and participate in chapter events?",
    a: "All events are completely open to undergraduate and postgraduate students across all semesters and branches. No entry fee required!"
  },
  {
    q: "Will On-Duty (OD) / Attendance letters be granted?",
    a: "Yes! The CodeChef Student Chapter is recognized under the Department of CSE. HOD-signed OD letters are provided to all attendees who check in at the venue desk."
  },
  {
    q: "Do I need to be an expert coder to attend?",
    a: "Not at all! We organize beginner tracks with dedicated peer mentors in every workshop so you can learn from scratch."
  },
  {
    q: "How does the digital delegate pass work?",
    a: "When you submit your registration, a unique delegate badge with a scannable QR code is generated. Just display it on your phone at entry for instant check-in."
  }
];
