import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      className="relative flex flex-col justify-center items-center text-white min-h-screen p-8"
      id="portfolio"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-[#333333] via-[#1a1a1a] to-[#111111] z-0"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute w-48 h-48 md:w-72 md:h-72 bg-[#2d884d] rounded-full blur-3xl -top-16 right-20"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-32 h-32 md:w-56 md:h-56 bg-[#FF6F61] rounded-full blur-3xl -bottom-10 left-16 z-[400]"
      ></motion.div>
      {/* Content Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-20 max-w-7xl mx-auto">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex-shrink-0 w-[300px] md:w-[400px] h-[400px] overflow-hidden rounded-full border-4 border-[#2d884d] shadow-lg"
        >
          <img
            src="/aboutme.webp"
            alt="Fashion Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center md:text-left max-w-3xl"
        >
          <div className="bg-[#2d884d] h-[20px] w-fit mb-6 flex items-end">
            <span className="text-4xl md:text-5xl font-bold tracking-wide uppercase ">
              Clara Manuela Matas
            </span>
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            I am a{" "}
            <span className="font-semibold text-white">fashion designer</span>{" "}
            committed to creating <span className="italic">innovative</span> and{" "}
            <span className="italic">sustainable</span> designs. My inspiration
            lies in the delicate beauty of nature, blending ethical practices
            with modern creativity. Each creation tells a story, redefining
            contemporary fashion with elegance and uniqueness.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
