import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          style={{
            backgroundImage:
              "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          className="w-full h-full"
        />
      </div>

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-8">

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[2px] bg-gradient-to-r from-transparent to-orange-500 mb-2"
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "'Courier New', monospace" }}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-white"
        >
          <span className="text-orange-500">&lt;</span>
          MYDATAAPPLIED
          <span className="text-orange-500">/&gt;</span>
          <span className="text-orange-500 text-3xl sm:text-4xl">.COM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-orange-400 tracking-[0.3em] uppercase text-sm font-light"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          — Created by Shiv Prakash Gupta —
        </motion.p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-orange-500 to-transparent mt-2"
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex gap-6 mt-6 flex-wrap justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/data")}
            className="px-10 py-4 border-2 border-orange-500 text-orange-500 font-bold tracking-widest uppercase text-sm hover:bg-orange-500 hover:text-black transition-all duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            📊 Data Portfolio
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dev")}
            className="px-10 py-4 bg-orange-500 text-black font-bold tracking-widest uppercase text-sm hover:bg-orange-400 transition-all duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            💻 Dev Portfolio
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
          className="text-orange-500/50 text-xs tracking-widest mt-4"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          // select your portfolio
        </motion.p>

      </div>
    </div>
  );
}