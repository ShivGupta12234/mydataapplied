/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";


const MONO = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";


function usePagePolish() {
  useEffect(() => {
    if (!document.getElementById("mda-font-jetbrains")) {
      const link = document.createElement("link");
      link.id = "mda-font-jetbrains";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
    if (!document.getElementById("mda-global-polish")) {
      const style = document.createElement("style");
      style.id = "mda-global-polish";
      style.innerHTML = `
        ::selection { background: rgba(249,115,22,0.35); color: #ffffff; }
        ::-webkit-scrollbar { width: 9px; height: 9px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#f97316,#9a3412); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #fb923c; }
        html { scroll-behavior: smooth; }
        *:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
}


function GrainOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="mda-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#mda-grain)" />
    </svg>
  );
}



function MagneticWrap({ children, className = "", strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.2 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}




function useTiltRef(max = 8) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 280, damping: 26, mass: 0.6 });
  const springRY = useSpring(rotateY, { stiffness: 280, damping: 26, mass: 0.6 });
  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max);
    rotateX.set(-py * max);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return { ref, rotateX: springRX, rotateY: springRY, onMouseMove, onMouseLeave };
}


function PathCard({ icon, text, route, filled, navigate, delay }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTiltRef(7);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="w-full"
    >
      <MagneticWrap strength={0.12} className="w-full">
        <motion.button
          ref={ref}
          type="button"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate(route)}
          whileHover={{
            y: -6,
            scale: 1.015,
            boxShadow: filled
              ? "0 24px 60px rgba(249,115,22,0.35)"
              : "0 24px 60px rgba(0,0,0,0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          style={{ rotateX, rotateY, transformPerspective: 800 }}
          className={`group relative w-full text-left rounded-2xl border overflow-hidden cursor-pointer
            px-6 py-7 sm:px-7 sm:py-8 flex flex-col items-start gap-3 transition-colors duration-300
            ${
              filled
                ? "bg-orange-500 border-orange-400 hover:bg-orange-400"
                : "bg-orange-500/5 border-orange-500/25 hover:bg-orange-500/10 hover:border-orange-500/50"
            }`}
        >
          {/* Shine sweep */}
          <span className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />

          <span
            className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
              filled
                ? "bg-black/10"
                : "bg-orange-500/15 border border-orange-500/30"
            }`}
          >
            {icon}
          </span>

          <span
            className={`relative z-10 font-black tracking-wide text-sm sm:text-base uppercase leading-snug ${
              filled ? "text-black" : "text-white"
            }`}
            style={{ fontFamily: MONO }}
          >
            {text}
          </span>

          <span
            className={`relative z-10 text-[10px] tracking-[0.3em] uppercase ${
              filled ? "text-black/55" : "text-orange-400/70"
            }`}
            style={{ fontFamily: MONO }}
          >
            mydataapplied.com{route}
          </span>

          <motion.span
            className={`relative z-10 mt-1 inline-flex items-center gap-1.5 text-xs font-bold ${
              filled ? "text-black" : "text-orange-400"
            }`}
            style={{ fontFamily: MONO }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            Enter →
          </motion.span>
        </motion.button>
      </MagneticWrap>
    </motion.div>
  );
}



function AuroraMesh({ followX, followY }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 m-auto w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 50%, transparent 75%)",
          x: followX,
          y: followY,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[18%] left-[12%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,0.13) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[14%] right-[10%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(234,88,12,0.11) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 30, -50, 0],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </>
  );
}


function Constellation() {
  const [dims, setDims] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const upd = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const stars = [
    { x: 0.08, y: 0.12 }, { x: 0.18, y: 0.28 }, { x: 0.05, y: 0.55 },
    { x: 0.15, y: 0.72 }, { x: 0.25, y: 0.88 }, { x: 0.35, y: 0.18 },
    { x: 0.42, y: 0.38 }, { x: 0.38, y: 0.62 }, { x: 0.48, y: 0.82 },
    { x: 0.62, y: 0.15 }, { x: 0.55, y: 0.45 }, { x: 0.68, y: 0.70 },
    { x: 0.75, y: 0.30 }, { x: 0.82, y: 0.55 }, { x: 0.92, y: 0.20 },
    { x: 0.88, y: 0.72 }, { x: 0.95, y: 0.45 }, { x: 0.78, y: 0.88 },
    { x: 0.22, y: 0.48 }, { x: 0.60, y: 0.90 }, { x: 0.45, y: 0.10 },
  ].map(s => ({ x: s.x * dims.w, y: s.y * dims.h }));

  const edges = [
    [0,1],[1,2],[2,3],[3,4],[1,6],[5,6],[6,7],[7,8],[6,10],
    [9,12],[10,11],[12,13],[13,15],[14,16],[13,16],[15,17],
    [18,1],[18,6],[19,8],[19,17],[20,5],[20,9],
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="1"/>
          <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
          stroke="#f97316" strokeWidth="0.5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0, 0.18, 0.08, 0.18, 0], pathLength: 1 }}
          transition={{ duration: 6 + i * 0.4, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {stars.map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y}
          initial={{ opacity: 0, r: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], r: [1, 2.2, 1] }}
          transition={{ duration: 3 + Math.random() * 3, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
          fill="#f97316"
        />
      ))}
    </svg>
  );
}


function DataGlyphs() {
  const glyphs = [
    { text: "{ }", x: "8%",  y: "15%", size: "text-xs",  delay: 0.5 },
    { text: "SELECT *", x: "85%", y: "12%", size: "text-[10px]", delay: 0.9 },
    { text: "∑", x: "6%",  y: "70%", size: "text-lg",  delay: 1.2 },
    { text: "f(x)", x: "91%", y: "65%", size: "text-xs", delay: 0.7 },
    { text: "01101", x: "3%",  y: "42%", size: "text-[9px]", delay: 1.5 },
    { text: "→", x: "94%", y: "38%", size: "text-sm",  delay: 0.4 },
    { text: "npm", x: "88%", y: "82%", size: "text-[10px]", delay: 1.1 },
    { text: "df.head()", x: "7%",  y: "85%", size: "text-[9px]", delay: 0.8 },
    { text: "</>",      x: "78%", y: "92%", size: "text-xs",  delay: 1.4 },
    { text: "σ",        x: "18%", y: "5%",  size: "text-base", delay: 0.6 },
    { text: "API",      x: "72%", y: "6%",  size: "text-[10px]", delay: 1.0 },
    { text: "[]",       x: "42%", y: "96%", size: "text-sm",  delay: 1.3 },
  ];
  return (
    <>
      {glyphs.map((g, i) => (
        <motion.span key={i}
          className={`absolute ${g.size} font-bold text-orange-500/20 select-none pointer-events-none hidden sm:block`}
          style={{ left: g.x, top: g.y, fontFamily: MONO }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0.1, 0.35, 0.1], y: [0, -12, 0] }}
          transition={{ duration: 5 + i * 0.3, delay: g.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {g.text}
        </motion.span>
      ))}
    </>
  );
}


function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.35) 30%, rgba(249,115,22,0.7) 50%, rgba(249,115,22,0.35) 70%, transparent 100%)" }}
      initial={{ top: "-2px" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
    />
  );
}




function LandingLoader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(tick);
          return 100;
        }
        return p + (p < 70 ? 2.4 : 1.2);
      });
    }, 26);
    const done = setTimeout(() => onDone(), 2100);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, []);

  

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Faint grid, kept quiet */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div
          style={{
            backgroundImage:
              "linear-gradient(#f97316 1px,transparent 1px),linear-gradient(90deg,#f97316 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          className="w-full h-full"
        />
      </div>

      
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-[110px] pointer-events-none"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline"
          style={{ fontFamily: MONO }}
        >
          <span className="text-orange-500 font-black text-3xl sm:text-4xl">&lt;</span>
          <span className="text-white font-black text-3xl sm:text-4xl tracking-tight">MYDATAAPPLIED.COM</span>
          <span className="text-orange-500 font-black text-3xl sm:text-4xl">.</span>
          <span className="text-white font-black text-3xl sm:text-4xl tracking-tight">COM</span>
          <span className="text-orange-500 font-black text-3xl sm:text-4xl">/&gt;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-orange-500/50 text-[10px] tracking-[0.5em] uppercase"
          style={{ fontFamily: MONO }}
        >
          //Portfolio Loading...
        </motion.p>

        
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 160 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="h-[2px] bg-orange-500/12 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  usePagePolish();

  
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowSX = useSpring(glowX, { stiffness: 40, damping: 18 });
  const glowSY = useSpring(glowY, { stiffness: 40, damping: 18 });
  const handlePointerMove = (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    glowX.set((e.clientX / w - 0.5) * 70);
    glowY.set((e.clientY / h - 0.5) * 70);
  };

  const title = "<MYDATAAPPLIED.COM/>";

  const PATHS = [
    { icon: "📊", text: "View Analytics Portfolio", route: "/data", filled: false },
    { icon: "💻", text: "View Development Portfolio", route: "/dev", filled: true },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LandingLoader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      
      <div
        onMouseMove={handlePointerMove}
        className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden overflow-x-hidden"
      >

        <GrainOverlay />

        
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div style={{
            backgroundImage: "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} className="w-full h-full" />
        </div>

        
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
          <motion.div key={i}
            className={`absolute w-16 h-16 border-orange-500/40 ${cls}`}
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
          />
        ))}

       
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={!loading ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute inset-x-0 top-5 mx-auto w-fit hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-black/40 backdrop-blur-sm z-20"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-orange-500"
          />
          <span
            className="text-[10px] tracking-[0.25em] uppercase text-orange-400/70"
            style={{ fontFamily: MONO }}
          >
            mydataapplied.com
          </span>
        </motion.div>

        
        <Constellation />

        
        <DataGlyphs />

        
        <AuroraMesh followX={glowSX} followY={glowSY} />

        
        <ScanLine />

        
        {Array.from({ length: 18 }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const sz = Math.random() * 3 + 1;
          const dur = Math.random() * 7 + 5;
          const del = Math.random() * 4;
          const bright = Math.random() > 0.7;
          return (
            <motion.div key={i}
              className={`absolute rounded-full pointer-events-none ${bright ? "bg-orange-400" : "bg-orange-500/40"}`}
              style={{ left: `${x}%`, top: `${y}%`, width: sz, height: sz }}
              animate={{ y: [0, -(30 + Math.random() * 50), 0], opacity: bright ? [0.3, 1, 0.3] : [0.1, 0.5, 0.1], scale: [1, 1.8, 1] }}
              transition={{ duration: dur, delay: del, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 px-4 sm:px-6 py-16 w-full max-w-3xl mx-auto">

          
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={!loading ? { opacity: 1, letterSpacing: "0.45em" } : {}}
            transition={{ duration: 1, delay: 0 }}
            className="text-orange-400 text-[12px] font-semibold uppercase tracking-[0.4em]"
            style={{ fontFamily: MONO }}
          >
            // Personal Portfolio Website
          </motion.p>

          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={!loading ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />

          
          <h1
            aria-label={title}
            className="relative text-[2rem] xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none"
            style={{ fontFamily: MONO }}
          >
            <span aria-hidden="true">
              {title.split("").map((ch, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={!loading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.035, ease: "easeOut" }}
                  className={ch === "<" || ch === "/" || ch === ">" || ch === "." ? "text-orange-500" : "text-white"}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none select-none"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
                backgroundSize: "250% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
              animate={!loading ? { backgroundPositionX: ["0%", "250%"] } : {}}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 4.5,
                ease: "easeInOut",
                delay: 1.1,
              }}
            >
              {title}
            </motion.span>
          </h1>

          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={!loading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-orange-400/80 tracking-[0.3em] uppercase text-xs font-light"
            style={{ fontFamily: MONO }}
          >
            — Created by Shiv Prakash Gupta —
          </motion.p>

          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={!loading ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
            className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />

         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 w-full max-w-xl">
            {PATHS.map((path, i) => (
              <PathCard
                key={path.route}
                {...path}
                navigate={navigate}
                delay={1.0 + i * 0.12}
              />
            ))}
          </div>

          
          <motion.div
            initial={{ opacity: 0 }}
            animate={!loading ? { opacity: 1 } : {}}
            transition={{ delay: 1.35 }}
            className="flex items-center gap-3 mt-2"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
            />
            <motion.p
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-orange-300 text-[12px] font-semibold tracking-[0.35em] uppercase"
              style={{ fontFamily: MONO }}
            >
              // select your portfolio
            </motion.p>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
            />
          </motion.div>
        </div>

        
        <footer className="relative z-10 py-4 text-center border-t border-orange-500/10 bg-black px-4">
          <p className="text-orange-400/80 text-[10px] sm:text-[11px] tracking-widest break-words" style={{ fontFamily: MONO }}>
            ALL COPYRIGHTS RESERVED © {new Date().getFullYear()} Shiv Prakash Gupta - MYDATAAPPLIED.COM - Landing Page
          </p>
        </footer>

      </div>
    </>
  );
}
