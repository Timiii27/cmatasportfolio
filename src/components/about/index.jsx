import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }} // Slide up and fade in
      animate={inView ? { opacity: 1 } : {}} // Trigger animation when in view
      transition={{ duration: 0.8 }}
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/portfoliobg.webp)` }}
      id="about"
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 w-8/12 text-center text-white flex items-center justify-center gap-20">
        <img
          src="/aboutme.webp" // Use the path to your avatar image
          alt="Fashion Avatar"
          className="w-[500px] h-full mx-auto mb-8 rounded-full shadow-lg border-[6px] border-black"
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-8">
            CLARA MANUELA MATAS
          </h1>
          <p className="text-xl leading-relaxed text-justify">
            I am a passionate fashion designer dedicated to creating innovative
            and sustainable designs. My work is inspired by the beauty of
            nature, aiming to blend creativity with ethical practices in the
            fashion industry. With a strong focus on unique, handmade pieces, I
            strive to redefine modern style.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
