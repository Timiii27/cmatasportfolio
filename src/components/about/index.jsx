import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      className="relative flex flex-col justify-center items-center text-white min-h-screen p-8 pt-32"
      id="about"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] z-0"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute w-96 h-96 bg-[#d4af37] rounded-full blur-[120px] top-20 right-20"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-80 h-80 bg-[#8b7355] rounded-full blur-[120px] bottom-20 left-16"
      ></motion.div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-shrink-0 w-full max-w-[400px] md:w-[420px] aspect-square overflow-hidden rounded-3xl shadow-2xl bg-black"
        >
          <img
            src="/aboutme.webp"
            alt="Fashion Avatar"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center md:text-left max-w-xl space-y-8 px-4 md:px-0"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "60px" } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent mx-auto md:mx-0"
            ></motion.div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white/95 leading-tight">
              Clara Manuela
              <br />
              <span className="text-[#d4af37]">Matas</span>
            </h1>
            <p className="text-white/50 uppercase tracking-[0.3em] text-xs">
              Fashion Designer
            </p>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-white/70 font-light">
            I am a{" "}
            <span className="text-white/90 font-normal">fashion designer</span>{" "}
            committed to creating innovative and sustainable designs. My
            inspiration lies in the delicate beauty of nature, blending ethical
            practices with modern creativity. Each creation tells a story,
            redefining contemporary fashion with elegance and uniqueness.
          </p>

          <div className="flex gap-6 justify-center md:justify-start pt-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:border-[#d4af37] transition-colors"
            >
              <span className="text-white/70 hover:text-[#d4af37] transition-colors text-sm">
                IG
              </span>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:border-[#d4af37] transition-colors"
            >
              <span className="text-white/70 hover:text-[#d4af37] transition-colors text-sm">
                LI
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
