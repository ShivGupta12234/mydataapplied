import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Constellation: fixed stars + animated connecting lines ── */
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

/* ── Floating data glyphs ── */
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
          className={`absolute ${g.size} font-bold text-orange-500/20 select-none pointer-events-none`}
          style={{ left: g.x, top: g.y, fontFamily: "'Courier New', monospace" }}
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

/* ── Radial pulse rings from centre ── */
function PulseRings() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {[0, 1, 2, 3].map(i => (
        <motion.div key={i}
          className="absolute rounded-full border border-orange-500/10"
          style={{ inset: -(i * 120 + 80) }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.45, 0], scale: [0.7, 1.1, 1.4] }}
          transition={{ duration: 4.5, delay: i * 1.1, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      {/* Bright core */}
      <motion.div
        className="absolute rounded-full bg-orange-500"
        style={{ inset: -4 }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.4, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Scanline sweep ── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.35) 30%, rgba(249,115,22,0.7) 50%, rgba(249,115,22,0.35) 70%, transparent 100%)" }}
      initial={{ top: "-2px" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
    />
  );
}

/* ── LandingLoader: intro sequence before the page reveals ── */
function LandingLoader({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onDone(),    2800);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  const LOGO_CHARS = ['<','M','D','A','.',  'C','O','M','/','>'];
  const LOGO_COLORS = ch => ['<','/','>', '.'].includes(ch) ? '#f97316' : '#ffffff';

  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle  = (i / 24) * Math.PI * 2;
    const radius = 55 + Math.random() * 35;
    return {
      startX: Math.cos(angle) * (window.innerWidth  * 0.55),
      startY: Math.sin(angle) * (window.innerHeight * 0.45),
      endX:   Math.cos(angle) * radius,
      endY:   Math.sin(angle) * radius,
      size:   Math.random() * 3 + 1.5,
      delay:  i * 0.02,
    };
  });

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div style={{ backgroundImage:'linear-gradient(#f97316 1px,transparent 1px),linear-gradient(90deg,#f97316 1px,transparent 1px)', backgroundSize:'60px 60px' }} className="w-full h-full"/>
      </div>

      {/* Flash on phase 2 */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="absolute inset-0 bg-orange-500 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 2 ? [0, 0.18, 0] : 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Converging particles */}
      {particles.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full bg-orange-500 pointer-events-none"
          style={{ width: p.size, height: p.size }}
          initial={{ x: p.startX, y: p.startY, opacity: 0 }}
          animate={
            phase === 0
              ? { x: p.startX, y: p.startY, opacity: [0, 0.7, 0.4] }
              : phase >= 1
              ? { x: p.endX, y: p.endY, opacity: phase >= 3 ? 0 : [0.9, 0.5, 0.9] }
              : {}
          }
          transition={{
            duration: phase === 0 ? 0.4 : 0.55,
            delay: phase === 0 ? p.delay : 0,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Rotating orbit rings */}
      <motion.div
        className="absolute rounded-full border border-orange-500/25 pointer-events-none"
        style={{ width: 160, height: 160 }}
        initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
        animate={phase >= 1 ? { opacity: phase >= 3 ? 0 : 0.6, rotate: 180, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute rounded-full border border-orange-500/15 border-dashed pointer-events-none"
        style={{ width: 220, height: 220 }}
        initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
        animate={phase >= 1 ? { opacity: phase >= 3 ? 0 : 0.4, rotate: -120, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      {/* Logo text assembles */}
      <div className="relative z-10 flex items-center gap-0" style={{ fontFamily:"'Courier New',monospace" }}>
        {LOGO_CHARS.map((ch, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={phase >= 1 ? { opacity: phase >= 3 ? 0 : 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: i * 0.045, ease: [0.22,1,0.36,1] }}
            style={{ color: LOGO_COLORS(ch), fontSize: ch === '.' ? '2rem' : '2.5rem', fontWeight: 900, lineHeight: 1 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="absolute bottom-1/3 text-orange-500/60 text-[11px] tracking-[0.5em] uppercase"
        style={{ fontFamily:"'Courier New',monospace" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 && phase < 3 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        // initializing portfolio
      </motion.p>

      {/* Progress line */}
      <motion.div
        className="absolute bottom-[28%] h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={phase >= 1 ? { width: phase >= 3 ? 0 : '180px', opacity: phase >= 3 ? 0 : 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </motion.div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);

  const title = "<MYDATAAPPLIED.COM/>";

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LandingLoader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ── Single full-page wrapper with bg-black ── */}
      <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

        {/* ── Layer 1: Grid ── */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div style={{
            backgroundImage: "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} className="w-full h-full" />
        </div>

        {/* ── Layer 2: Corner accent lines ── */}
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

        {/* ── Layer 3: Constellation ── */}
        <Constellation />

        {/* ── Layer 4: Data glyphs ── */}
        <DataGlyphs />

        {/* ── Layer 5: Central ambient orb ── */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 50%, transparent 75%)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Layer 6: Pulse rings ── */}
        <PulseRings />

        {/* ── Layer 7: Scanline ── */}
        <ScanLine />

        {/* ── Layer 8: Floating particles ── */}
        {Array.from({ length: 30 }).map((_, i) => {
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

        {/* ── MAIN CONTENT (flex-1 centres vertically) ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-6 px-6 py-16">

          {/* Top label */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-orange-400 text-[12px] font-semibold uppercase tracking-[0.4em]"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            // portfolio
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />

          {/* Title — character by character */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none"
            style={{ fontFamily: "'Courier New', monospace" }}>
            {title.split("").map((ch, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.035, ease: "easeOut" }}
                className={ch === "<" || ch === "/" || ch === ">" || ch === "." ? "text-orange-500" : "text-white"}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-orange-400/80 tracking-[0.3em] uppercase text-xs font-light"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            — Created by Shiv Prakash Gupta —
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.5, ease: "easeOut" }}
            className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="flex gap-5 mt-4 flex-wrap justify-center"
          >
            {[
              { label: "📊 Analytics Portfolio", route: "/data", filled: false },
              { label: "💻 Developer Portfolio",  route: "/dev",  filled: true  },
            ].map(({ label, route, filled }) => (
              <motion.button key={route}
                onHoverStart={() => setHovered(route)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(route)}
                className={`relative px-10 py-4 font-black tracking-widest uppercase text-sm overflow-hidden
                  transition-all duration-300
                  ${filled
                    ? "bg-orange-500 text-black hover:bg-orange-400"
                    : "border-2 border-orange-500 text-orange-500 hover:text-black"}`}
                style={{ fontFamily: "'Courier New', monospace",
                  boxShadow: hovered === route ? "0 0 40px rgba(249,115,22,0.55), 0 0 80px rgba(249,115,22,0.2)" : "none" }}
              >
                {!filled && (
                  <motion.div
                    className="absolute inset-0 bg-orange-500 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hovered === route ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Pulsing hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
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
              style={{ fontFamily: "'Courier New', monospace" }}
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

        {/* ── Footer — inside bg-black div so background applies ── */}
        <footer className="relative z-10 py-4 text-center border-t border-orange-500/10 bg-black">
          <p className="text-orange-400/80 text-[11px] tracking-widest" style={{ fontFamily: "'Courier New', monospace" }}>
            ALL COPYRIGHTS RESERVED © {new Date().getFullYear()} Shiv Prakash Gupta — MYDATAAPPLIED.COM
          </p>
        </footer>

      </div>
    </>
  );
}