import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Constants ─── */
const NAV_LINKS  = ["about", "skills", "certificates", "projects", "coding", "education", "contact"];
const NAV_LABEL  = {
  about: "About", skills: "Skills", certificates: "Certificates",
  projects: "Projects", coding: "{} Profiles", education: "Education", contact: "Contact",
};

/* ── Change 3: Dev Skills ── */
const SKILLS = [
  { name: "C++",           svg: "https://cdn.simpleicons.org/cplusplus/f97316" },
  { name: "JavaScript",    svg: "https://cdn.simpleicons.org/javascript/f97316" },
  { name: "Python",        svg: "https://cdn.simpleicons.org/python/f97316" },
  { name: "HTML5",         svg: "https://cdn.simpleicons.org/html5/f97316" },
  { name: "CSS3",          svg: "https://cdn.simpleicons.org/css3/f97316" },
  { name: "React.js",      svg: "https://cdn.simpleicons.org/react/f97316" },
  { name: "Node.js",       svg: "https://cdn.simpleicons.org/nodedotjs/f97316" },
  { name: "Express.js",    svg: "https://cdn.simpleicons.org/express/f97316" },
  { name: "Tailwind CSS",  svg: "https://cdn.simpleicons.org/tailwindcss/f97316" },
  { name: "Bootstrap",     svg: "https://cdn.simpleicons.org/bootstrap/f97316" },
  { name: "MySQL",         svg: "https://cdn.simpleicons.org/mysql/f97316" },
  { name: "MongoDB",       svg: "https://cdn.simpleicons.org/mongodb/f97316" },
  { name: "PostgreSQL",    svg: "https://cdn.simpleicons.org/postgresql/f97316" },
  { name: "Docker",        svg: "https://cdn.simpleicons.org/docker/f97316" },
  { name: "Git",           svg: "https://cdn.simpleicons.org/git/f97316" },
  { name: "GitHub",        svg: "https://cdn.simpleicons.org/github/f97316" },
  { name: "Vite",          svg: "https://cdn.simpleicons.org/vite/f97316" },
  { name: "Figma",         svg: "https://cdn.simpleicons.org/figma/f97316" },
  { name: "VS Code",       svg: "https://cdn.simpleicons.org/visualstudiocode/f97316" },
  { name: "Socket.io",     svg: "https://cdn.simpleicons.org/socketdotio/f97316" },
  { name: "RESTful APIs",  svg: null, fallbackIcon: "🔌" },
  { name: "JWT Auth",      svg: null, fallbackIcon: "🔐" },
  { name: "CI/CD",         svg: null, fallbackIcon: "⚙️" },
];

/* ── Change 4: Dev Certificates ── */
const CERTIFICATES = [
  {
    id: 1,
    title: "Learn Complete JavaScript",
    issuer: "Scrimba",
    link: "https://scrimba.com/learn-javascript-c0v;cert24zAwPPowRN475oxpMEHrk4mCo4dCoi9ujPrk",
    gradient: "from-yellow-500/25 to-yellow-900/10",
    borderColor: "border-yellow-500/30",
    icon: "🟨",
    skills: ["JavaScript", "ES6+", "DOM", "Async/Await"],
  },
  {
    id: 2,
    title: "Learn Node.js",
    issuer: "Scrimba",
    link: "https://scrimba.com/learn-nodejs-c00ho9qqh6;cert2ffentAFN4zsAoDLyjHMpYcuEKYe7YYur5U1UGEgR7kutk",
    gradient: "from-green-500/25 to-green-900/10",
    borderColor: "border-green-500/30",
    icon: "🟢",
    skills: ["Node.js", "npm", "Modules", "File System"],
  },
  {
    id: 3,
    title: "React Essential Training",
    issuer: "LinkedIn Learning",
    link: "http://linkedin.com/learning/certificates/959631b90b7870db661fe069b68b011d0519b72fec5a4ed75f6b62f71f91e74e",
    gradient: "from-blue-500/25 to-blue-900/10",
    borderColor: "border-blue-500/30",
    icon: "⚛️",
    skills: ["React", "Hooks", "Components", "State"],
  },
  {
    id: 4,
    title: "React.js: Building an Interface",
    issuer: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/08b82b700e8c2eb6188852e610218a807c330b658914dddd6bc1b8597d4be02b",
    gradient: "from-cyan-500/25 to-cyan-900/10",
    borderColor: "border-cyan-500/30",
    icon: "🖥️",
    skills: ["React", "UI Design", "Props", "Events"],
  },
  {
    id: 5,
    title: "Certificate of Excellence",
    issuer: "Coding Ninjas",
    link: "https://certificate.codingninjas.com/verify/89a9a840c5e5f368",
    pdfLink: "https://ninjasfiles.s3.amazonaws.com/certificate309928180d71dd61513e8358ba1649f0feafc92.pdf",
    gradient: "from-red-500/25 to-red-900/10",
    borderColor: "border-red-500/30",
    icon: "🏆",
    skills: ["DSA", "Problem Solving", "C++"],
  },
  {
    id: 6,
    title: "Certificate of Completion",
    issuer: "Coding Ninjas",
    link: "https://certificate.codingninjas.com/verify/4a4ca480555cf642",
    pdfLink: "https://ninjasfiles.s3.amazonaws.com/certificate309928160f3c09a190ebf0c8850fb65cdce8fb6.pdf",
    gradient: "from-purple-500/25 to-purple-900/10",
    borderColor: "border-purple-500/30",
    icon: "🎓",
    skills: ["Course Completion", "Logic Building"],
  },
];

/* ── Change 5: Real Projects ── */
const PROJECTS = [
  {
    id: 1,
    title: "AI Health Prediction App",
    subtitle: "ai-health-prediction-application",
    description: "An AI-powered disease prediction system that performs EDA on 20+ health variables, builds ML models, and presents risk distribution (low/medium/high) through an interactive Power BI dashboard.",
    url: "https://github.com/ShivGupta12234/ai-health-prediction-application",
    gradient: "from-red-500/20 to-orange-900/10",
    borderColor: "border-red-500/30",
    glowColor: "rgba(239,68,68,0.12)",
    accentColor: "text-red-400",
    tech: ["React.js", "Node.js", "Express.js", "RESTFul APIs", "Vite", "Tailwind CSS", "HTML", "JavaScript", "SQL","HuggingFace API integration", "Recharts", "Git/Github"],
    icon: "🧠",
    status: "Completed",
    statusColor: "text-green-400 border-green-500/40 bg-green-500/10",
  },
  {
    id: 2,
    title: "TradeFlick",
    subtitle: "Stock & Trade Analytics Platform",
    description: "A full-stack trading analytics platform that loads, cleans, and transforms financial data, delivering interactive visualisations and insights through a modern, responsive web interface.",
    url: "https://github.com/ShivGupta12234/TradeFlick",
    gradient: "from-blue-500/20 to-blue-900/10",
    borderColor: "border-blue-500/30",
    glowColor: "rgba(59,130,246,0.12)",
    accentColor: "text-blue-400",
    tech: ["React.js", "Node.js", "Express.js", "RESTFul APIs", "Vite", "Tailwind CSS", "HTML", "JavaScript", "SQL","HuggingFace API integration", "Recharts", "Git/Github"],
    icon: "📈",
    status: "Completed",
    statusColor: "text-green-400 border-green-500/40 bg-green-500/10",
  },
  {
    id: 3,
    title: "MyDataApplied.com",
    subtitle: "Personal Portfolio Website",
    description: "This very portfolio — a production-grade, fully responsive React application with Framer Motion animations, dark theme, multi-section navigation, contact form, and separate Data & Dev sub-portfolios.",
    url: "https://mydataapplied.vercel.app/",
    gradient: "from-orange-500/20 to-orange-900/10",
    borderColor: "border-orange-500/30",
    glowColor: "rgba(249,115,22,0.12)",
    accentColor: "text-orange-400",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite", "JSX", "HTML"],
    icon: "🌐",
    status: "Live",
    statusColor: "text-orange-400 border-orange-500/40 bg-orange-500/10",
  },
];

/* ── Coding Profiles (same as Data) ── */
const LeetCodeSVG  = () => <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#f97316"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>;
const GitHubSVG    = () => <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#f97316"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
const HackerRankSVG= () => <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#f97316"><path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 11.885 0 13S13.287 24 12 24C10.712 24 2.25 19.114 1.608 18 .963 16.885.963 6.115 1.608 5 2.25 3.886 10.715 0 12 0zm-.92 9.009H9.912v2.014c0 1.33-.759 1.93-1.658 1.93-1.196 0-1.527-.945-1.527-1.93v-4.04C6.727 5.78 7.244 5 8.254 5c.828 0 1.658.53 1.658 1.986V7.5H9.08v-.4c0-.557-.26-.88-.664-.88-.468 0-.67.323-.67.88v4.404c0 .557.202.88.67.88.405 0 .664-.323.664-.88v-1.5H9.08v-1zm5.766 0h-1.826v2.014c0 1.33-.759 1.93-1.658 1.93-1.196 0-1.527-.945-1.527-1.93V7.009c0-1.203.517-2.009 1.527-2.009.828 0 1.658.53 1.658 1.986V7.5h-.832v-.4c0-.557-.26-.88-.664-.88-.468 0-.67.323-.67.88v4.404c0 .557.202.88.67.88.405 0 .664-.323.664-.88v-1.5h-.832v-1h1.826v2.02h.832V9.009z"/></svg>;
const DataLemurSVG = () => <svg viewBox="0 0 40 40" className="w-9 h-9"><rect width="40" height="40" rx="10" fill="#f97316" opacity="0.18"/><text x="20" y="26" textAnchor="middle" fontSize="14" fontWeight="900" fill="#f97316" fontFamily="'Courier New', monospace">DL</text></svg>;

const CODING_PROFILES = [
  { id:"leetcode",  name:"LeetCode",  handle:"@shivpgupta001",   url:"https://leetcode.com/u/shivpgupta001/",  description:"Solving DSA problems with optimal solutions — focused on runtime efficiency and algorithmic thinking.", stats:[{label:"Solved",value:"170+"},{label:"Focus",value:"DSA/SQL"},{label:"Lang",value:"C++/Python"}], Logo:LeetCodeSVG,  gradient:"from-yellow-500/15 to-yellow-900/5", borderColor:"border-yellow-500/30", glowColor:"rgba(234,179,8,0.12)",    accentColor:"text-yellow-400", pillBorder:"border-yellow-500/25" },
  { id:"github",    name:"GitHub",    handle:"@ShivGupta12234", url:"https://github.com/ShivGupta12234",      description:"Full-stack projects, React apps, REST APIs and data pipelines — all versioned, documented, and open.", stats:[{label:"Repos",value:"10+"},{label:"Focus",value:"Web+Data"},{label:"Lang",value:"JS/Python"}], Logo:GitHubSVG,    gradient:"from-gray-500/15 to-gray-900/5",   borderColor:"border-gray-500/30",   glowColor:"rgba(156,163,175,0.10)", accentColor:"text-gray-300",   pillBorder:"border-gray-500/25"  },
  { id:"hackerrank",name:"HackerRank",handle:"@prakashguptashiv",url:"https://www.hackerrank.com/profile/prakashguptashiv", description:"Practising SQL, Python and problem solving challenges — earning domain badges consistently.",          stats:[{label:"Badge",value:"5★ Problem Solving"},{label:"Focus",value:"SQL/Python/C++"},{label:"Domain",value:"Dev"}],   Logo:HackerRankSVG,gradient:"from-green-500/15 to-green-900/5",  borderColor:"border-green-500/30",  glowColor:"rgba(34,197,94,0.10)",   accentColor:"text-green-400",  pillBorder:"border-green-500/25"  },
  { id:"datalemur", name:"DataLemur", handle:"Shiv Prakash Gupta",url:"https://datalemur.com/profile",        description:"Practising SQL interview questions used at top tech companies to sharpen real-world query skills.",      stats:[{label:"Focus",value:"SQL"},{label:"Platform",value:"DataLemur"},{label:"Goal",value:"SQL Practice"}],    Logo:DataLemurSVG, gradient:"from-orange-500/15 to-red-900/5",  borderColor:"border-orange-500/30", glowColor:"rgba(249,115,22,0.10)",  accentColor:"text-orange-400", pillBorder:"border-orange-500/25" },
];

/* ─── Reusable Components ─── */
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 36 }, (_, i) => {
      const bright = i % 5 === 0;
      const large  = i % 9 === 0;
      return {
        id: i, x: Math.random()*100, y: Math.random()*100,
        size: large ? Math.random()*5+3 : Math.random()*2.5+1,
        duration: Math.random()*9+5, delay: Math.random()*6,
        bright, large, drift: (Math.random()-0.5)*30,
      };
    })
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div key={p.id}
          className={`absolute rounded-full ${p.bright?"bg-orange-400":p.large?"bg-orange-500/40":"bg-orange-500/20"}`}
          style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size,
            boxShadow: p.bright?`0 0 ${p.size*4}px rgba(249,115,22,0.6)`:p.large?`0 0 ${p.size*2}px rgba(249,115,22,0.3)`:"none" }}
          animate={{
            y:[0,-(40+Math.random()*60),0], x:[0,p.drift,0],
            opacity:p.bright?[0.5,1,0.5]:[0.1,0.55,0.1], scale:[1,p.bright?2:1.6,1],
          }}
          transition={{ duration:p.duration, delay:p.delay, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </div>
  );
}

function FadeIn({ children, delay=0, className="" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:40, filter:"blur(4px)" }}
      animate={inView ? { opacity:1, y:0, filter:"blur(0px)" } : {}}
      transition={{ duration:0.65, delay, ease:[0.22,1,0.36,1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ comment, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div className="mb-12" ref={ref}>
      <motion.span
        initial={{ opacity:0, x:-12 }} animate={inView ? { opacity:1, x:0 } : {}}
        transition={{ duration:0.5, ease:"easeOut" }}
        className="text-orange-500 text-sm tracking-[0.3em] uppercase block"
        style={{ fontFamily:"'Courier New', monospace" }}>{comment}
      </motion.span>
      <div className="relative mt-3 overflow-hidden">
        <motion.h2
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.1, ease:[0.22,1,0.36,1] }}
          className="text-4xl sm:text-5xl font-bold" style={{ fontFamily:"'Courier New', monospace" }}>
          {title}<span className="text-orange-500">.</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}}
          transition={{ duration:0.7, delay:0.3, ease:"easeOut" }}
          style={{ originX:0 }}
          className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-orange-500 to-transparent"
        />
      </div>
    </div>
  );
}

function SkillItem({ skill }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div whileHover={{ scale:1.14, y:-7, boxShadow:"0 12px 40px rgba(249,115,22,0.25)" }}
      className="flex flex-col items-center gap-3 min-w-[110px] px-4 py-5
        border border-orange-500/20 bg-orange-500/5 rounded-2xl
        hover:border-orange-500/60 hover:bg-orange-500/10 transition-colors duration-300 cursor-default">
      {skill.svg && !err
        ? <img src={skill.svg} alt={skill.name} className="w-10 h-10 object-contain" onError={()=>setErr(true)} />
        : <span className="text-3xl leading-none">{skill.fallbackIcon||skill.name[0]}</span>
      }
      <span className="text-[11px] text-orange-200/80 text-center whitespace-nowrap" style={{ fontFamily:"'Courier New', monospace" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function SkillsStrip() {
  const doubled = [...SKILLS,...SKILLS];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <motion.div className="flex gap-5 w-max"
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:40, repeat:Infinity, ease:"linear" }}>
        {doubled.map((skill,idx)=><SkillItem key={`${skill.name}-${idx}`} skill={skill} />)}
      </motion.div>
    </div>
  );
}

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:60 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.55, delay:index*0.1 }}
      whileHover={{ y:-10, scale:1.03, boxShadow:"0 20px 50px rgba(0,0,0,0.5)" }}
      className={`relative rounded-2xl border ${cert.borderColor} bg-gradient-to-br ${cert.gradient}
        backdrop-blur-sm p-6 flex flex-col gap-4 overflow-hidden group cursor-pointer`}
      onClick={()=>window.open(cert.link,"_blank")}>
      <motion.div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-orange-500/10 blur-xl"
        animate={{ scale:[1,1.5,1], opacity:[0.5,1,0.5] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ boxShadow:"inset 0 0 50px rgba(249,115,22,0.08)" }} />
      <div className="flex items-start gap-4">
        <span className="text-4xl flex-shrink-0">{cert.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-snug mb-1" style={{ fontFamily:"'Courier New', monospace" }}>{cert.title}</h3>
          <p className="text-orange-400 text-[11px] tracking-widest uppercase" style={{ fontFamily:"'Courier New', monospace" }}>{cert.issuer}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {cert.skills.map((s)=>(
          <span key={s} className="px-2 py-0.5 text-[10px] border border-orange-500/30 text-orange-300/80 rounded-full" style={{ fontFamily:"'Courier New', monospace" }}>{s}</span>
        ))}
      </div>
      <div className="flex gap-3 mt-auto pt-2">
        <a href={cert.link} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}
          className="text-[11px] text-orange-400 border border-orange-500/40 px-3 py-1.5 rounded-full hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all"
          style={{ fontFamily:"'Courier New', monospace" }}>🔗 Verify</a>
        {cert.pdfLink && (
          <a href={cert.pdfLink} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}
            className="text-[11px] text-orange-400 border border-orange-500/40 px-3 py-1.5 rounded-full hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all"
            style={{ fontFamily:"'Courier New', monospace" }}>📄 PDF</a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Change 5: Project Card ── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:70, scale:0.95 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.6, delay:index*0.13, type:"spring", stiffness:75 }}
      whileHover={{ y:-12, scale:1.025, boxShadow:"0 24px 60px rgba(0,0,0,0.5)" }}
      className={`relative rounded-2xl border ${project.borderColor} bg-gradient-to-br ${project.gradient}
        backdrop-blur-sm p-7 flex flex-col gap-5 overflow-hidden group cursor-pointer`}
      onClick={()=>window.open(project.url,"_blank")}
    >
      {/* Glow blob */}
      <motion.div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background:project.glowColor }}
        animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }}
        transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow:`inset 0 0 60px ${project.glowColor}` }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{project.icon}</span>
          <div>
            <h3 className="text-white font-bold text-base leading-tight" style={{ fontFamily:"'Courier New', monospace" }}>
              {project.title}
            </h3>
            <p className={`text-[11px] mt-0.5 ${project.accentColor}`} style={{ fontFamily:"'Courier New', monospace" }}>
              {project.subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold tracking-widest uppercase ${project.statusColor}`}
            style={{ fontFamily:"'Courier New', monospace" }}>
            {project.status}
          </span>
          <motion.span className={`text-base ${project.accentColor} opacity-0 group-hover:opacity-100 transition-all duration-300`}
            animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>↗</motion.span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-[12px] leading-relaxed relative z-10" style={{ fontFamily:"'Courier New', monospace" }}>
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t)=>(
          <span key={t} className={`px-2.5 py-1 text-[10px] border ${project.borderColor} ${project.accentColor} rounded-full bg-black/20`}
            style={{ fontFamily:"'Courier New', monospace" }}>{t}</span>
        ))}
      </div>

      {/* CTA */}
      <motion.a href={project.url} target="_blank" rel="noreferrer"
        onClick={(e)=>e.stopPropagation()}
        whileHover={{ scale:1.03, boxShadow:`0 0 20px ${project.glowColor}` }}
        whileTap={{ scale:0.97 }}
        className={`relative z-10 mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5
          border ${project.borderColor} ${project.accentColor} text-[11px] font-bold tracking-widest uppercase
          rounded-xl hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300`}
        style={{ fontFamily:"'Courier New', monospace" }}>
        View on GitHub ↗
      </motion.a>
    </motion.div>
  );
}

function CodingProfileCard({ profile, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const { Logo } = profile;
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:70, scale:0.95 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.6, delay:index*0.13, type:"spring", stiffness:75 }}
      whileHover={{ y:-12, scale:1.025, boxShadow:"0 24px 60px rgba(0,0,0,0.5)" }}
      className={`relative rounded-2xl border ${profile.borderColor} bg-gradient-to-br ${profile.gradient}
        backdrop-blur-sm p-7 flex flex-col gap-5 overflow-hidden group cursor-pointer`}
      onClick={()=>window.open(profile.url,"_blank")}>
      <motion.div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background:profile.glowColor }}
        animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }}
        transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow:`inset 0 0 60px ${profile.glowColor}` }} />
      <div className="flex items-center gap-4 relative z-10">
        <motion.div whileHover={{ rotate:[0,-10,10,0] }} transition={{ duration:0.5 }}
          className={`p-3 rounded-xl border ${profile.borderColor} bg-black/30 flex-shrink-0`}>
          <Logo />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg" style={{ fontFamily:"'Courier New', monospace" }}>{profile.name}</h3>
          <p className={`text-xs tracking-widest mt-0.5 ${profile.accentColor}`} style={{ fontFamily:"'Courier New', monospace" }}>{profile.handle}</p>
        </div>
        <motion.span className={`text-lg ${profile.accentColor} opacity-0 group-hover:opacity-100 transition-all duration-300`}
          animate={{ x:[0,5,0] }} transition={{ duration:1.5, repeat:Infinity }}>↗</motion.span>
      </div>
      <p className="text-gray-400 text-[12px] leading-relaxed relative z-10" style={{ fontFamily:"'Courier New', monospace" }}>{profile.description}</p>
      <div className="grid grid-cols-3 gap-3 relative z-10">
        {profile.stats.map((stat)=>(
          <div key={stat.label} className={`p-2.5 rounded-xl border ${profile.pillBorder} bg-black/25 text-center`}>
            <p className={`text-[12px] font-bold ${profile.accentColor}`} style={{ fontFamily:"'Courier New', monospace" }}>{stat.value}</p>
            <p className="text-gray-600 text-[9px] mt-0.5 uppercase tracking-wider" style={{ fontFamily:"'Courier New', monospace" }}>{stat.label}</p>
          </div>
        ))}
      </div>
      <motion.a href={profile.url} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}
        whileHover={{ scale:1.03, boxShadow:`0 0 20px ${profile.glowColor}` }} whileTap={{ scale:0.97 }}
        className={`relative z-10 mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5
          border ${profile.borderColor} ${profile.accentColor} text-[11px] font-bold tracking-widest uppercase
          rounded-xl hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300`}
        style={{ fontFamily:"'Courier New', monospace" }}>View Profile ↗</motion.a>
    </motion.div>
  );
}

function EducationCard({ edu }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x:-40 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.65, delay:edu.delay, type:"spring", stiffness:80 }}
      className="relative pl-12 sm:pl-16 md:pl-20">
      <motion.div initial={{ scale:0 }} animate={inView ? { scale:1 } : {}}
        transition={{ duration:0.4, delay:edu.delay+0.2, type:"spring" }}
        className={`absolute left-2 sm:left-3 md:left-5 top-7 w-5 h-5 rounded-full border-2 ${edu.borderColor} bg-black flex items-center justify-center`}>
        <motion.div animate={{ scale:[1,1.6,1], opacity:[0.8,0.3,0.8] }} transition={{ duration:2.5, repeat:Infinity }}
          className={`w-2 h-2 rounded-full ${edu.dotColor}`} />
      </motion.div>
      <motion.div whileHover={{ y:-8, scale:1.018, boxShadow:"0 20px 50px rgba(0,0,0,0.45)" }}
        className={`relative rounded-2xl border ${edu.borderColor} bg-gradient-to-br ${edu.gradient} backdrop-blur-sm p-4 sm:p-6 md:p-8 overflow-hidden group`}>
        <motion.div className="absolute -top-6 -right-6 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ background:edu.glowColor }} animate={{ scale:[1,1.4,1], opacity:[0.5,1,0.5] }} transition={{ duration:4, repeat:Infinity }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ boxShadow:`inset 0 0 60px ${edu.glowColor}` }} />
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5 relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{edu.icon}</span>
            <div>
              <p className={`text-[10px] tracking-[0.3em] uppercase ${edu.accentColor} mb-1`} style={{ fontFamily:"'Courier New', monospace" }}>{edu.level}</p>
              <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily:"'Courier New', monospace" }}>{edu.degree}</h3>
              <p className="text-gray-400 text-[12px] mt-0.5" style={{ fontFamily:"'Courier New', monospace" }}>{edu.stream}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className={`text-[10px] px-3 py-1 rounded-full border font-bold tracking-widest uppercase ${edu.statusColor}`}
              style={{ fontFamily:"'Courier New', monospace" }}>{edu.status}</span>
            <span className="text-[11px] text-gray-500 tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>{edu.period}</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl border ${edu.borderColor} bg-black/20 relative z-10`}>
          <span className="text-base">🏫</span>
          <p className="text-gray-300 text-[12px]" style={{ fontFamily:"'Courier New', monospace" }}>{edu.institution}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${edu.borderColor} bg-black/20`}>
            <span className="text-sm">📊</span>
            <span className={`text-sm font-bold ${edu.accentColor}`} style={{ fontFamily:"'Courier New', monospace" }}>Grade: {edu.grade}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {edu.skills.map((s)=>(
              <span key={s} className={`px-2.5 py-1 text-[10px] border ${edu.borderColor} ${edu.accentColor} rounded-full bg-black/20`}
                style={{ fontFamily:"'Courier New', monospace" }}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle");
  const handleChange = (e) => setForm((f)=>({ ...f, [e.target.name]:e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name||!form.email||!form.message) return;
    setStatus("sending");
    const mailto=`mailto:prakashguptashiv911@gmail.com?subject=${encodeURIComponent(form.subject||"Dev Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    setTimeout(()=>{ window.location.href=mailto; setStatus("sent"); setTimeout(()=>{ setForm({name:"",email:"",subject:"",message:""}); setStatus("idle"); },3000); },800);
  };
  const inputClass=`w-full bg-black/40 border border-orange-500/20 rounded-xl px-4 py-3 text-white text-[13px] placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 hover:border-orange-500/35 transition-all duration-300`;
  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ duration:0.6, delay:0.2 }}
      className="relative rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/8 to-black/60 backdrop-blur-sm p-5 sm:p-8 flex flex-col gap-5 overflow-hidden">
      <motion.div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-orange-500/8 blur-3xl pointer-events-none"
        animate={{ scale:[1,1.3,1], opacity:[0.5,1,0.5] }} transition={{ duration:5, repeat:Infinity }} />
      <p className="text-orange-500/80 text-[10px] tracking-[0.3em] uppercase relative z-10" style={{ fontFamily:"'Courier New', monospace" }}>// send a message</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {[{name:"name",label:"Name",placeholder:"Your Name",type:"text",required:true},{name:"email",label:"Email",placeholder:"you@example.com",type:"email",required:true}].map((field)=>(
          <div key={field.name} className="flex flex-col gap-1.5">
            <label className="text-orange-500/80 text-[10px] tracking-widest uppercase" style={{ fontFamily:"'Courier New', monospace" }}>{field.label} {field.required&&<span className="text-orange-500/80">*</span>}</label>
            <motion.input whileFocus={{ scale:1.01 }} type={field.type} name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.required} className={inputClass} style={{ fontFamily:"'Courier New', monospace" }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 relative z-10">
        <label className="text-orange-500/70 text-[10px] tracking-widest uppercase" style={{ fontFamily:"'Courier New', monospace" }}>Subject</label>
        <motion.input whileFocus={{ scale:1.005 }} type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Dev Role / Freelance / Collaboration / Other" className={inputClass} style={{ fontFamily:"'Courier New', monospace" }} />
      </div>
      <div className="flex flex-col gap-1.5 relative z-10">
        <label className="text-orange-500/70 text-[10px] tracking-widest uppercase" style={{ fontFamily:"'Courier New', monospace" }}>Message <span className="text-orange-500">*</span></label>
        <motion.textarea whileFocus={{ scale:1.005 }} name="message" value={form.message} onChange={handleChange} placeholder="Hi Shiv, I'd love to connect about..." required rows={5} className={`${inputClass} resize-none`} style={{ fontFamily:"'Courier New', monospace" }} />
      </div>
      <motion.button type="submit" disabled={status==="sending"||status==="sent"}
        whileHover={status==="idle"?{ scale:1.03, boxShadow:"0 0 30px rgba(249,115,22,0.4)" }:{}}
        whileTap={status==="idle"?{ scale:0.97 }:{}}
        className={`relative z-10 w-full py-4 font-bold tracking-widest uppercase text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${status==="sent"?"bg-green-500 text-black":status==="sending"?"bg-orange-500/50 text-black/70 cursor-wait":"bg-orange-500 text-black hover:bg-orange-400"}`}
        style={{ fontFamily:"'Courier New', monospace" }}>
        {status==="sending"&&<motion.div animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:"linear" }} className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full" />}
        {status==="idle"&&"Send Message ↗"}{status==="sending"&&"Opening Mail..."}{status==="sent"&&"✓ Done! Check your mail client"}
      </motion.button>
      <p className="text-gray-700 text-[10px] text-center tracking-wider relative z-10" style={{ fontFamily:"'Courier New', monospace" }}>// this will open your default mail client</p>
    </motion.form>
  );
}


function playDataSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.3);
    master.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
    master.connect(ctx.destination);
    // Low drone
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(80, ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(110, ctx.currentTime + 1.5);
    osc1.connect(master);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 3.5);
    // Mid rising
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0, ctx.currentTime + 0.4);
    g2.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.9);
    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(220, ctx.currentTime + 0.4);
    osc2.frequency.linearRampToValueAtTime(330, ctx.currentTime + 2.0);
    osc2.connect(g2); g2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.4); osc2.stop(ctx.currentTime + 3.5);
    // High sparkle
    const osc3 = ctx.createOscillator();
    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0, ctx.currentTime + 1.0);
    g3.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 1.2);
    g3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(880, ctx.currentTime + 1.0);
    osc3.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 2.5);
    osc3.connect(g3); g3.connect(ctx.destination);
    osc3.start(ctx.currentTime + 1.0); osc3.stop(ctx.currentTime + 3.5);
  } catch(e) {}
}

function DevLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState(0);
  const [lines, setLines]       = useState([]);
  const [glitch, setGlitch]     = useState(false);
  const soundFired               = useRef(false);

  const BOOT_LINES = [
    { text: "BIOS POST.............. OK",   color: "text-gray-500" },
    { text: "Loading kernel modules.......", color: "text-gray-400" },
    { text: "Mounting /dev/portfolio......", color: "text-gray-400" },
    { text: "npm install --production.....", color: "text-orange-400/70" },
    { text: "Starting React runtime.......",  color: "text-orange-400/70" },
    { text: "Bundling with Vite..........",   color: "text-orange-400/70" },
    { text: "\u2713 Dev server ready on :5173",   color: "text-orange-400" },
  ];

  useEffect(() => {
    if (!soundFired.current) { soundFired.current = true; playDataSound(); }
    [100,300].forEach(t => { setTimeout(()=>setGlitch(true),t); setTimeout(()=>setGlitch(false),t+80); });
    const prog = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(prog); return 100; } return p + (p < 50 ? 1.6 : p < 80 ? 1.0 : 0.55); });
    }, 28);
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => { setLines(l => [...l, line]); if (i === BOOT_LINES.length - 1) setPhase(2); }, 200 + i * 300);
    });
    setTimeout(() => onDone(), 3400);
    return () => clearInterval(prog);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity:0, scale:1.02 }} transition={{ duration:0.6, ease:"easeInOut" }}>
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
        style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,#f97316 2px,#f97316 3px)" }}/>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div style={{ backgroundImage:"linear-gradient(#f97316 1px,transparent 1px),linear-gradient(90deg,#f97316 1px,transparent 1px)", backgroundSize:"48px 48px" }} className="w-full h-full"/>
      </div>
      {/* Glitch flash */}
      <AnimatePresence>
        {glitch && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:0.05 }} exit={{ opacity:0 }}
            className="absolute inset-0 bg-orange-400 pointer-events-none z-20"/>
        )}
      </AnimatePresence>
      {/* Panel */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-lg">
        {/* Logo */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
          className="flex flex-col items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.div animate={{ opacity:[1,0.6,1], x:[0,-1,1,-1,0] }} transition={{ duration:0.12, repeat:3, repeatDelay:1.5 }}>
              <span className="text-orange-500 font-black text-3xl select-none" style={{ fontFamily:"'Courier New',monospace" }}>{"{ }"}</span>
            </motion.div>
          </div>
          <p className="text-orange-500 text-[11px] tracking-[0.45em] uppercase" style={{ fontFamily:"'Courier New',monospace" }}>Developer Portfolio Loading...</p>
        </motion.div>
        {/* Terminal */}
        <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.15, duration:0.35 }}
          className="w-full bg-black/80 border border-orange-500/25 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-orange-500/15 bg-orange-500/5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500/90"/><div className="w-2.5 h-2.5 rounded-full bg-orange-500/45"/><div className="w-2.5 h-2.5 rounded-full bg-orange-500/20"/>
            <span className="ml-2 text-orange-500/40 text-[10px] tracking-widest" style={{ fontFamily:"'Courier New',monospace" }}>~/portfolio/dev — zsh</span>
          </div>
          <div className="p-4 space-y-1 min-h-[160px]">
            {lines.map((line, i) => (
              <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.2 }}
                className={`text-[11px] ${line.color} flex items-center gap-2`} style={{ fontFamily:"'Courier New',monospace" }}>
                <span className="text-orange-500/35 text-[9px]">&#9654;</span>
                <span>{line.text}</span>
                {i === lines.length-1 && phase < 2 && (
                  <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:0.6, repeat:Infinity }}
                    className="inline-block w-1.5 h-3.5 bg-orange-400 rounded-sm ml-1"/>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Progress */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-orange-500/40 text-[10px] tracking-widest uppercase" style={{ fontFamily:"'Courier New',monospace" }}>Build Progress</span>
            <span className="text-orange-400 text-[11px] font-bold tabular-nums" style={{ fontFamily:"'Courier New',monospace" }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-[3px] w-full bg-orange-500/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 rounded-full relative overflow-hidden"
              style={{ width:`${progress}%` }}>
              <motion.div className="absolute right-0 top-0 w-8 h-full bg-white/25 blur-sm"
                animate={{ opacity:[0,1,0] }} transition={{ duration:0.5, repeat:Infinity }}/>
            </motion.div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <motion.div animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }}
              className="w-2 h-3 bg-orange-500 rounded-sm"/>
            <span className="text-orange-500/30 text-[10px] tracking-widest" style={{ fontFamily:"'Courier New',monospace" }}>
              {progress < 100 ? "compiling..." : "ready."}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* ─── Main Page ─── */
export default function DevPortfolio() {
  const navigate  = useNavigate();
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [loading,       setLoading]       = useState(true);

  useEffect(()=>{
    const onScroll=()=>{ setScrolled(window.scrollY>30); if(window.scrollY>80) setMenuOpen(false); };
    window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{
    const observer=new IntersectionObserver(
      (entries)=>{ entries.forEach((e)=>{ if(e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold:0.3 }
    );
    NAV_LINKS.forEach((id)=>{ const el=document.getElementById(id); if(el) observer.observe(el); });
    return ()=>observer.disconnect();
  },[]);

  const scrollTo=(id)=>document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  useEffect(()=>{
    if(menuOpen){ document.body.style.overflow="hidden"; }
    else { document.body.style.overflow=""; }
    return ()=>{ document.body.style.overflow=""; };
  },[menuOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <DevLoader onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <div className="min-h-screen bg-black text-white relative">
      <Particles />

      {/* Grid bg */}
      <div className="fixed inset-0 opacity-[0.055] pointer-events-none z-0">
        <div style={{ backgroundImage:"linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)", backgroundSize:"60px 60px" }} className="w-full h-full" />
      </div>

      {/* ── LEFT SOCIAL STRIP ── */}
      <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:0.8, delay:1.2, type:"spring", stiffness:80 }}
        className="fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col items-center justify-center pointer-events-none"
        style={{ width:"52px" }}>
        <motion.div initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.8, delay:1.4 }}
          style={{ originY:0 }} className="w-px flex-1 max-h-32 bg-gradient-to-b from-transparent to-orange-500/50" />
        <div className="flex flex-col items-center gap-1 py-4 pointer-events-auto">
          {[
            { href:"https://www.linkedin.com/in/prakash-gupta-shiv/", label:"LinkedIn", svg:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { href:"https://github.com/ShivGupta12234",              label:"GitHub",   svg:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
            { href:"https://www.instagram.com/",                      label:"Instagram",svg:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
            { href:"https://x.com/",                                   label:"X",        svg:<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.836L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
          ].map((social,i)=>(
            <motion.a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}
              initial={{ opacity:0, x:-15 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.5+i*0.1, duration:0.4 }}
              whileHover={{ scale:1.25, x:5 }} whileTap={{ scale:0.9 }}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-orange-500/40 hover:text-orange-400 border border-transparent hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-300 group">
              {social.svg}
              <motion.span initial={{ opacity:0, x:-8, scale:0.85 }} whileHover={{ opacity:1, x:0, scale:1 }}
                className="absolute left-11 px-2.5 py-1 bg-black/90 border border-orange-500/30 text-orange-400 text-[10px] font-bold tracking-widest uppercase rounded-lg whitespace-nowrap pointer-events-none shadow-lg shadow-orange-500/10"
                style={{ fontFamily:"'Courier New', monospace" }}>{social.label}</motion.span>
            </motion.a>
          ))}
        </div>
        <motion.div initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.8, delay:1.4 }}
          style={{ originY:1 }} className="w-px flex-1 max-h-32 bg-gradient-to-t from-transparent to-orange-500/50" />
      </motion.div>

      {/* ── RIGHT SECTION DOTS ── */}
      <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:0.8, delay:1.3, type:"spring", stiffness:80 }}
        className="fixed right-0 top-0 bottom-0 z-40 hidden lg:flex flex-col items-center justify-center pointer-events-none"
        style={{ width:"52px" }}>
        <motion.div initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.8, delay:1.5 }}
          style={{ originY:0 }} className="w-px flex-1 max-h-32 bg-gradient-to-b from-transparent to-orange-500/50" />
        <div className="flex flex-col items-center gap-2.5 py-4">
          {NAV_LINKS.map((section,i)=>(
            <motion.button key={section} initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:1.6+i*0.08 }} whileHover={{ scale:1.5 }} whileTap={{ scale:0.9 }}
              onClick={()=>scrollTo(section)} aria-label={NAV_LABEL[section]}
              className="relative pointer-events-auto group">
              <motion.div animate={activeSection===section ? { scale:1, backgroundColor:"#f97316", boxShadow:"0 0 8px rgba(249,115,22,0.7)" } : { scale:1, backgroundColor:"rgba(249,115,22,0.2)", boxShadow:"none" }}
                transition={{ duration:0.3 }} className="w-1.5 h-1.5 rounded-full" />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-black/90 border border-orange-500/30 text-orange-400 text-[10px] font-bold tracking-widest uppercase rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg shadow-orange-500/10"
                style={{ fontFamily:"'Courier New', monospace" }}>{NAV_LABEL[section]}</span>
            </motion.button>
          ))}
        </div>
        <motion.div initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.8, delay:1.5 }}
          style={{ originY:1 }} className="w-px flex-1 max-h-32 bg-gradient-to-t from-transparent to-orange-500/50" />
      </motion.div>

      {/* ── NAVBAR ── */}
      <motion.nav initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:0.6, type:"spring", stiffness:100 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-4 transition-all duration-300 ${scrolled?"bg-black/95 backdrop-blur-md border-b border-orange-500/20 shadow-2xl shadow-orange-500/5":"bg-transparent"}`}>
        <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={()=>navigate("/")}
          className="flex items-center gap-2 text-orange-500 font-bold text-sm z-10" style={{ fontFamily:"'Courier New', monospace" }}>
          <span className="text-orange-500/50 text-lg">←</span><span>&lt;MYDATAAPPLIED.COM/&gt;</span>
        </motion.button>
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((section)=>(
            <motion.button key={section} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={()=>scrollTo(section)}
              className={`relative px-4 py-2 text-xs tracking-widest transition-colors duration-200 uppercase ${activeSection===section?"text-orange-500":"text-white/40 hover:text-white/80"}`}
              style={{ fontFamily:"'Courier New', monospace" }}>
              {activeSection===section&&<motion.div layoutId="dev-nav-pill" className="absolute inset-0 bg-orange-500/10 border border-orange-500/30 rounded-full" transition={{ type:"spring", duration:0.45 }} />}
              <span className="relative z-10">{NAV_LABEL[section]}</span>
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-3 z-10">
          <div className="hidden lg:flex text-xs text-orange-500 border border-orange-500/30 px-3 py-1.5 rounded-full tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>
            💻 Dev
          </div>
          {/* Hamburger */}
          <motion.button whileHover={{ scale:1.08 }} whileTap={{ scale:0.93 }}
            onClick={()=>setMenuOpen((v)=>!v)} aria-label="Toggle menu"
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-orange-500/30 bg-orange-500/8 gap-[5px] hover:border-orange-500/60 hover:bg-orange-500/15 transition-all duration-300">
            <motion.span animate={menuOpen?{rotate:45,y:7}:{rotate:0,y:0}} transition={{ duration:0.3, ease:"easeInOut" }} className="block w-5 h-[2px] bg-orange-400 rounded-full origin-center" />
            <motion.span animate={menuOpen?{opacity:0,scaleX:0}:{opacity:1,scaleX:1}} transition={{ duration:0.2 }} className="block w-5 h-[2px] bg-orange-400 rounded-full" />
            <motion.span animate={menuOpen?{rotate:-45,y:-7}:{rotate:0,y:0}} transition={{ duration:0.3, ease:"easeInOut" }} className="block w-5 h-[2px] bg-orange-400 rounded-full origin-center" />
          </motion.button>
        </div>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <motion.div initial={false} animate={menuOpen?{opacity:1,pointerEvents:"auto"}:{opacity:0,pointerEvents:"none"}}
        transition={{ duration:0.3 }} onClick={()=>setMenuOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" />
      <motion.div initial={{ x:"100%" }} animate={menuOpen?{x:0}:{x:"100%"}}
        transition={{ type:"spring", stiffness:300, damping:32 }}
        className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] z-50 lg:hidden bg-black/98 border-l border-orange-500/20 backdrop-blur-xl flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-orange-500/15">
          <div style={{ fontFamily:"'Courier New', monospace" }}>
            <p className="text-orange-500 font-bold text-sm">&lt;MYDATAAPPLIED.COM/&gt;</p>
            <p className="text-gray-600 text-[10px] tracking-widest mt-0.5">dev portfolio</p>
          </div>
          <motion.button whileHover={{ scale:1.1, rotate:90 }} whileTap={{ scale:0.9 }}
            onClick={()=>setMenuOpen(false)}
            className="w-8 h-8 rounded-lg border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/15 hover:border-orange-500/60 transition-all duration-200">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
          </motion.button>
        </div>
        <div className="px-6 py-3 border-b border-orange-500/10">
          <div className="flex items-center gap-2">
            <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }} className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-orange-500/60 text-[10px] tracking-widest uppercase" style={{ fontFamily:"'Courier New', monospace" }}>Currently: {NAV_LABEL[activeSection]}</span>
          </div>
        </div>
        <nav className="flex flex-col px-4 py-4 gap-1 flex-1">
          {NAV_LINKS.map((section,i)=>(
            <motion.button key={section}
              initial={{ opacity:0, x:30 }} animate={menuOpen?{opacity:1,x:0}:{opacity:0,x:30}}
              transition={{ delay:menuOpen?i*0.06:0, duration:0.35, type:"spring", stiffness:200 }}
              whileHover={{ x:6 }} whileTap={{ scale:0.97 }}
              onClick={()=>{ scrollTo(section); setMenuOpen(false); }}
              className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 group ${activeSection===section?"bg-orange-500/12 border border-orange-500/30 text-orange-500":"text-white/50 hover:text-white/90 hover:bg-white/5 border border-transparent"}`}>
              <motion.div animate={activeSection===section?{scaleY:1,opacity:1}:{scaleY:0,opacity:0}} className="absolute left-0 top-2 bottom-2 w-[3px] bg-orange-500 rounded-full" />
              <span className={`text-[10px] font-bold w-5 text-right flex-shrink-0 ${activeSection===section?"text-orange-500":"text-white/20"}`} style={{ fontFamily:"'Courier New', monospace" }}>{String(i+1).padStart(2,"0")}</span>
              <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily:"'Courier New', monospace" }}>{NAV_LABEL[section]}</span>
              <motion.span initial={{ opacity:0, x:-4 }} animate={activeSection===section?{opacity:1,x:0}:{}} className="ml-auto text-orange-500 text-sm">→</motion.span>
            </motion.button>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-orange-500/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-orange-500 border border-orange-500/30 px-3 py-1.5 rounded-full tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>💻 Dev Portfolio</span>
          </div>
          <motion.button whileHover={{ scale:1.02, boxShadow:"0 0 20px rgba(249,115,22,0.25)" }} whileTap={{ scale:0.97 }}
            onClick={()=>{ navigate("/"); setMenuOpen(false); }}
            className="w-full py-3 border border-orange-500/40 text-orange-500 text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-orange-500/10 hover:border-orange-500/70 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontFamily:"'Courier New', monospace" }}>← Back to Home</motion.button>
          <p className="text-gray-700 text-[9px] text-center tracking-wider mt-4" style={{ fontFamily:"'Courier New', monospace" }}>© {new Date().getFullYear()} Shiv Prakash Gupta</p>
        </div>
      </motion.div>

      {/* ── ABOUT (Change 1 + 2) ── */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-20 pt-24 sm:pt-28 pb-28 sm:pb-32 z-10">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/16 blur-[140px] pointer-events-none" />
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* LEFT: Text */}
          <div className="flex flex-col items-start text-left">
            <motion.span initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className="text-orange-500 text-sm tracking-[0.3em] uppercase block mb-5" style={{ fontFamily:"'Courier New', monospace" }}>
              // about me
            </motion.span>
            <motion.h1 initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35, duration:0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ fontFamily:"'Courier New', monospace" }}>
              Hi, I'm <span className="text-orange-500">Shiv</span>
              <br />
              <span className="text-orange-400/70 text-2xl sm:text-3xl font-normal mt-2 block">Full-Stack Developer & Data Analyst</span>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.7 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 max-w-xl" style={{ fontFamily:"'Courier New', monospace" }}>
              I'm a <span className="text-orange-400 font-semibold">Computer Science (Data Science)</span> undergraduate
              building practical, data-driven applications at the intersection of development and analytics — using{" "}
              <span className="text-orange-400">React.js, Node.js, Express.js, MongoDB, SQL, and JavaScript</span> to design structured systems,
              process real-world data, and deliver interactive solutions.
            </motion.p>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
              className="text-gray-500 text-sm leading-relaxed mb-10 max-w-xl" style={{ fontFamily:"'Courier New', monospace" }}>
              My projects span data cleaning, analytical workflows, REST API design, and responsive UI — all aimed at
              translating complex data into usable insights. I strengthen this with active{" "}
              <span className="text-orange-400">DSA practice</span>, writing optimised, scalable code for real-world reliability.
            </motion.p>
            {/* Stat pills */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.72 }}
              className="flex flex-wrap gap-3 mb-10">
              {[
                { label:"Projects",     value:"3+" },
                { label:"Certificates", value:"6+"  },
                { label:"Languages",    value:"5+"  },
                { label:"Year",         value:"Final Year Student" },
              ].map((s)=>(
                <div key={s.label} className="px-4 py-2 border border-orange-500/25 bg-orange-500/8 rounded-xl text-center">
                  <p className="text-orange-400 font-bold text-sm" style={{ fontFamily:"'Courier New', monospace" }}>{s.value}</p>
                  <p className="text-gray-600 text-[9px] tracking-widest uppercase mt-0.5" style={{ fontFamily:"'Courier New', monospace" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
            {/* Buttons */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}
              className="flex gap-4 flex-wrap">
              <motion.button whileHover={{ scale:1.05, boxShadow:"0 0 30px rgba(249,115,22,0.45)" }} whileTap={{ scale:0.97 }}
                onClick={()=>scrollTo("projects")}
                className="px-8 py-3 bg-orange-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-orange-400 transition-all"
                style={{ fontFamily:"'Courier New', monospace" }}>View Projects →</motion.button>
              <motion.a href="/shiv_prakash_gupta_CV.pdf" download="Shiv_Prakash_Gupta_CV.pdf"
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="px-8 py-3 border border-orange-500 text-orange-500 font-bold tracking-widest uppercase text-xs hover:bg-orange-500/10 transition-all inline-flex items-center gap-2"
                style={{ fontFamily:"'Courier New', monospace" }}>↓ Download CV</motion.a>
            </motion.div>
          </div>

          {/* RIGHT: Change 2 — Webpage/Code SVG illustration */}
          <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.5, duration:0.9, type:"spring", stiffness:60 }}
            className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-orange-500/70" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-orange-500/70" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-orange-500/70" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-orange-500/70" />

              <motion.svg viewBox="0 0 480 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto"
                animate={{ y:[0,-16,0], rotate:[0,1,-1,0] }} transition={{ duration:5.5, repeat:Infinity, ease:"easeInOut" }}>
                {/* Browser window */}
                <rect x="20" y="20" width="440" height="380" rx="14" fill="#0d0d0d" stroke="#f97316" strokeWidth="1" strokeOpacity="0.3"/>
                {/* Top bar */}
                <rect x="20" y="20" width="440" height="38" rx="14" fill="#111" stroke="#f97316" strokeWidth="0" strokeOpacity="0"/>
                <rect x="20" y="40" width="440" height="18" fill="#111"/>
                <circle cx="44" cy="39" r="5" fill="#f97316" opacity="0.9"/>
                <circle cx="60" cy="39" r="5" fill="#f97316" opacity="0.45"/>
                <circle cx="76" cy="39" r="5" fill="#f97316" opacity="0.2"/>
                {/* URL bar */}
                <rect x="100" y="29" width="260" height="20" rx="10" fill="#1a1a1a" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.3"/>
                <text x="230" y="43" textAnchor="middle" fontSize="9" fill="#f97316" opacity="0.55" fontFamily="monospace">mydataapplied.com</text>
                <line x1="20" y1="58" x2="460" y2="58" stroke="#f97316" strokeWidth="0.6" strokeOpacity="0.3"/>

                {/* Navbar inside browser */}
                <rect x="30" y="65" width="420" height="28" rx="0" fill="#f97316" fillOpacity="0.08"/>
                <text x="48" y="83" fontSize="10" fontWeight="bold" fill="#f97316" fontFamily="monospace">&lt;MYDATAAPPLIED.COM/&gt;</text>
                {["About","Skills","Projects","Contact"].map((item,i)=>(
                  <text key={item} x={190+i*58} y="83" fontSize="8" fill="#f97316" opacity="0.6" fontFamily="monospace">{item}</text>
                ))}

                {/* Hero text block */}
                <motion.text x="48" y="120" fontSize="18" fontWeight="bold" fill="white" fontFamily="monospace"
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0, duration:0.5 }}>
                  Hi, I'm <tspan fill="#f97316">Shiv</tspan>
                </motion.text>
                <motion.text x="48" y="140" fontSize="10" fill="#f97316" opacity="0.6" fontFamily="monospace"
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.15 }}>
                  Full-Stack Developer & Data Analyst
                </motion.text>

                {/* Paragraph lines */}
                {[155,168,181].map((y,i)=>(
                  <motion.rect key={y} x="48" y={y} width={220-i*25} height="6" rx="3" fill="#f97316" opacity="0.12"
                    initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                    transition={{ delay:1.2+i*0.1, duration:0.5 }} style={{ transformOrigin:"48px center" }}/>
                ))}

                {/* Two CTA buttons */}
                <motion.rect x="48" y="196" width="90" height="22" rx="11" fill="#f97316" fillOpacity="0.9"
                  initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:1.5, type:"spring" }}/>
                <text x="93" y="211" textAnchor="middle" fontSize="8" fontWeight="bold" fill="black" fontFamily="monospace">View Projects</text>
                <motion.rect x="148" y="196" width="80" height="22" rx="11" fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.7"
                  initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:1.6, type:"spring" }}/>
                <text x="188" y="211" textAnchor="middle" fontSize="8" fill="#f97316" opacity="0.8" fontFamily="monospace">Download CV</text>

                {/* Divider */}
                <line x1="30" y1="235" x2="450" y2="235" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.2"/>

                {/* Cards row */}
                {[
                  { x:30,  label:"React.js",  icon:"⚛" },
                  { x:170, label:"Node.js",   icon:"🟢" },
                  { x:310, label:"MongoDB",   icon:"🍃" },
                ].map((card,i)=>(
                  <motion.g key={card.label} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.6+i*0.15 }}>
                    <rect x={card.x} y="245" width="125" height="70" rx="10" fill="#f97316" fillOpacity="0.07" stroke="#f97316" strokeOpacity="0.25" strokeWidth="0.8"/>
                    <text x={card.x+62} y="272" textAnchor="middle" fontSize="16" fontFamily="monospace">{card.icon}</text>
                    <text x={card.x+62} y="292" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f97316" fontFamily="monospace">{card.label}</text>
                    <motion.rect x={card.x+20} y="302" width="86" height="4" rx="2" fill="#f97316" opacity="0.25"
                      animate={{ opacity:[0.15,0.5,0.15] }} transition={{ duration:2+i*0.5, repeat:Infinity }}/>
                  </motion.g>
                ))}

                {/* Code snippet */}
                <rect x="30" y="328" width="420" height="60" rx="8" fill="#0a0a0a" stroke="#f97316" strokeOpacity="0.2" strokeWidth="0.7"/>
                {[
                  { y:346, text:"const app = express();", color:"#f97316", opacity:0.8 },
                  { y:360, text:"app.get('/api', (req, res) => {", color:"white", opacity:0.5 },
                  { y:374, text:"  res.json({ status: 'live' });", color:"#f97316", opacity:0.55 },
                ].map((line,i)=>(
                  <motion.text key={i} x="44" y={line.y} fontSize="9" fill={line.color} opacity={line.opacity} fontFamily="monospace"
                    initial={{ opacity:0 }} animate={{ opacity:line.opacity }} transition={{ delay:1.8+i*0.12 }}>{line.text}</motion.text>
                ))}
                {/* Blinking cursor */}
                <motion.rect x="44" y="378" width="6" height="11" rx="1" fill="#f97316"
                  animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }}/>
              </motion.svg>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }}>
          <span className="text-orange-400 text-[11px] font-bold tracking-[0.4em] uppercase" style={{ fontFamily:"'Courier New', monospace" }}>scroll</span>
          <motion.div className="w-[2px] h-8 bg-gradient-to-b from-orange-300 via-orange-500/80 to-transparent rounded-full"
            animate={{ scaleY:[1,1.3,1], opacity:[1,0.5,1] }} transition={{ duration:1.8, repeat:Infinity }}/>
          <motion.div animate={{ y:[0,5,0], opacity:[1,0.3,1] }} transition={{ duration:1.8, repeat:Infinity }}
            className="text-orange-400 text-xs">▼</motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS (Change 3) ── */}
      <section id="skills" className="relative py-16 sm:py-24 z-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <FadeIn><SectionLabel comment="// tech stack & tools" title="Skills" /></FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {[
                { label:"Languages",   items:"C++, JavaScript, Python, HTML, CSS" },
                { label:"Frameworks",  items:"React.js, Node.js, Express.js, Tailwind CSS, Bootstrap" },
                { label:"Databases",   items:"MySQL, MongoDB, PostgreSQL" },
                { label:"Dev Tools",   items:"Docker, Git, Vite, Figma, VS Code, Socket.io, CI/CD, JWT" },
              ].map((cat)=>(
                <motion.div key={cat.label} whileHover={{ scale:1.03 }}
                  className="p-5 border border-orange-500/20 rounded-xl bg-orange-500/5 transition-colors hover:border-orange-500/40">
                  <p className="text-orange-500 text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily:"'Courier New', monospace" }}>{cat.label}</p>
                  <p className="text-gray-300 text-[11px] leading-relaxed" style={{ fontFamily:"'Courier New', monospace" }}>{cat.items}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}><SkillsStrip /></FadeIn>
        </div>
      </section>

      {/* ── CERTIFICATES (Change 4) ── */}
      <section id="certificates" className="relative py-16 sm:py-24 z-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <FadeIn>
            <SectionLabel comment="// credentials" title="Certificates" />
            <p className="text-gray-500 text-xs -mt-8 mb-12 tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>// click any card to verify</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {CERTIFICATES.map((cert,i)=><CertCard key={cert.id} cert={cert} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS (Change 5) ── */}
      <section id="projects" className="relative py-16 sm:py-24 z-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <FadeIn>
            <SectionLabel comment="// work" title="Projects" />
            <p className="text-gray-500 text-xs -mt-8 mb-12 tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>// click any card to view on GitHub</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {PROJECTS.map((project,i)=><ProjectCard key={project.id} project={project} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CODING PROFILES ── */}
      <section id="coding" className="relative py-16 sm:py-24 z-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <FadeIn>
            <SectionLabel comment="// competitive programming & open source" title="Coding Profiles" />
            <p className="text-gray-500 text-xs -mt-8 mb-6 tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>// click any card to visit the profile</p>
            <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:0.2 }}
              className="flex items-center gap-3 mb-12 p-4 border border-orange-500/15 rounded-xl bg-orange-500/5 max-w-xl">
              <motion.div animate={{ opacity:[1,0,1] }} transition={{ duration:1.2, repeat:Infinity }}
                className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
              <span className="text-orange-500/60 text-xs tracking-wider truncate" style={{ fontFamily:"'Courier New', monospace" }}>
                const profiles = ["LeetCode", "GitHub", "HackerRank", "DataLemur"];
              </span>
            </motion.div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
            {CODING_PROFILES.map((profile,i)=><CodingProfileCard key={profile.id} profile={profile} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="relative py-16 sm:py-24 z-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full bg-orange-500/10 blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <FadeIn>
            <SectionLabel comment="// academic background" title="Education" />
            <p className="text-gray-500 text-xs -mt-8 mb-12 tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>// my learning journey so far</p>
          </FadeIn>
          <div className="relative">
            <motion.div initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
              transition={{ duration:1.2, ease:"easeInOut" }} style={{ originY:0 }}
              className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-orange-500/30 to-transparent"/>
            <div className="flex flex-col gap-10">
              {[
                { level:"Undergraduate", icon:"🎓", degree:"Bachelor of Technology", stream:"Computer Science & Engineering (Data Science)", institution:"Pranveer Singh Institute of Technology (PSIT), Kanpur", grade:"Overall 70%", period:"2022 – Present", status:"Ongoing", statusColor:"text-green-400 border-green-500/40 bg-green-500/10", skills:["React","Node.js","Python","DSA","SQL","Systems"], gradient:"from-orange-500/15 to-orange-900/5", borderColor:"border-orange-500/30", glowColor:"rgba(249,115,22,0.10)", accentColor:"text-orange-400", dotColor:"bg-orange-400", delay:0 },
                { level:"Intermediate (Class XII)", icon:"📘", degree:"CBSE - Science Stream", stream:"Physics, Chemistry, Mathematics & Computer Science", institution:"Doon International School, Kanpur", grade:"74.8%", period:"2019 – 2021", status:"Completed", statusColor:"text-blue-400 border-blue-500/40 bg-blue-500/10", skills:["Mathematics","Physics","Chemistry","CS Basics"], gradient:"from-blue-500/15 to-blue-900/5", borderColor:"border-blue-500/30", glowColor:"rgba(59,130,246,0.10)", accentColor:"text-blue-400", dotColor:"bg-blue-400", delay:0.15 },
                { level:"High School (Class X)", icon:"📗", degree:"ICSE - General Stream", stream:"Science, Mathematics & English", institution:"Mercy Memorial School, Kanpur", grade:"82.4%", period:"2017 – 2019", status:"Completed", statusColor:"text-purple-400 border-purple-500/40 bg-purple-500/10", skills:["Science","Mathematics","English","Computers"], gradient:"from-purple-500/15 to-purple-900/5", borderColor:"border-purple-500/30", glowColor:"rgba(168,85,247,0.10)", accentColor:"text-purple-400", dotColor:"bg-purple-400", delay:0.3 },
              ].map((edu)=><EducationCard key={edu.level} edu={edu} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-16 sm:py-24 z-10">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[110px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <FadeIn>
            <SectionLabel comment="// let's connect" title="Contact" />
            <p className="text-gray-500 text-xs -mt-8 mb-12 tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>// Drop a message — I'll get back to you</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="flex flex-col gap-6 h-full">
                <p className="text-gray-400 text-[13px] leading-relaxed" style={{ fontFamily:"'Courier New', monospace" }}>
                  Open to <span className="text-orange-400 font-semibold">full-stack dev roles</span>, freelance projects, or any meaningful collaboration.
                </p>
                {[
                  { icon:"📧", label:"Email",    value:"prakashguptashiv911@gmail.com", href:"mailto:prakashguptashiv911@gmail.com" },
                  { icon:"📍", label:"Location", value:"Kanpur, Uttar Pradesh, India",  href:null },
                  { icon:"🔗", label:"LinkedIn", value:"linkedin.com/in/prakash-gupta-shiv", href:"https://www.linkedin.com/in/prakash-gupta-shiv/" },
                  { icon:"💻", label:"GitHub",   value:"github.com/ShivGupta12234",     href:"https://github.com/ShivGupta12234" },
                ].map((item,i)=>(
                  <motion.div key={item.label} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ duration:0.5, delay:0.1+i*0.1 }} whileHover={{ x:5 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-orange-500/15 bg-orange-500/5 hover:border-orange-500/35 hover:bg-orange-500/10 transition-all duration-300">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-orange-500 text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ fontFamily:"'Courier New', monospace" }}>{item.label}</p>
                      {item.href ? <a href={item.href} target="_blank" rel="noreferrer" className="text-gray-300 text-[12px] hover:text-orange-400 transition-colors truncate block" style={{ fontFamily:"'Courier New', monospace" }}>{item.value}</a>
                        : <p className="text-gray-300 text-[12px] truncate" style={{ fontFamily:"'Courier New', monospace" }}>{item.value}</p>}
                    </div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.6 }}
                  className="flex items-center gap-3 mt-2 px-4 py-3 rounded-xl border border-green-500/25 bg-green-500/8">
                  <motion.div animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.5, repeat:Infinity }} className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-green-400 text-[11px] font-bold tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>AVAILABLE FOR OPPORTUNITIES</span>
                </motion.div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:col-span-3"><ContactForm /></FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-8 text-center border-t border-orange-500/10">
        <p className="text-orange-400/80 text-[11px] tracking-widest" style={{ fontFamily:"'Courier New', monospace" }}>
        ALL COPYRIGHTS RESERVED  © {new Date().getFullYear()} Shiv Prakash Gupta — MYDATAAPPLIED.COM - Dev Portfolio
        </p>
      </footer>
    </div>
    </>
  );
}