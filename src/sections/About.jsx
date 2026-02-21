import { motion } from "framer-motion";

export default function About({ resume, variant }) {
  const cvFile = resume || "/shiv_prakash_gupta_CV.pdf";

  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 md:px-16 pt-32"
    >
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary font-body mb-4 tracking-widest uppercase text-sm"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          Hello,
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold leading-tight mb-6"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          I'm{" "}
          <span className="text-primary">Shiv Prakash Gupta</span>, a Computer
          Science &amp; Engineering (Data Science) student focused on building
          data-driven and web-based systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 font-body text-lg leading-relaxed max-w-3xl mb-10"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          I work at the intersection of{" "}
          <span className="text-primary font-medium">Data Analytics</span> and{" "}
          <span className="text-primary font-medium">Web Development</span>,
          turning raw data into insights and deploying them as real-world,
          scalable applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex gap-4 flex-wrap"
        >
          {/* Download CV Button */}
          <motion.a
            href={cvFile}
            download="Shiv_Prakash_Gupta_CV.pdf"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(249,115,22,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold tracking-widest uppercase text-sm hover:bg-orange-400 transition-all duration-300 cursor-pointer"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            ↓ DOWNLOAD CV
          </motion.a>

          {/* Certificates Button */}
          <motion.a
            href="#certificates"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(249,115,22,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold tracking-widest uppercase text-sm hover:bg-primary hover:text-black transition-all duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            CERTIFICATES
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
