import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Efecto de oscurecimiento progresivo
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[150vh] bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* Fondo Teatro / Foco */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-12"
      >
        <div className="inline-block border border-white/30 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] mb-8">
          Interludio: El Manifiesto
        </div>

        <h2 className="font-serif text-5xl md:text-7xl leading-tight">
          "El arte no es lo que ves, es lo que <span className="text-[#d4af37] italic">sientes</span> al cerrar los ojos."
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-left text-white/60 font-light leading-relaxed pt-12 border-t border-white/10">
          <p>
            Mi viaje comenzó en los pasillos del Reina Sofía, donde entendí que la moda
            no es solo tela, es arquitectura blanda. Es un refugio y un escenario.
          </p>
          <p>
             Diseño para la mujer que se siente una obra de arte en movimiento.
             Cada pieza es un diálogo entre la tradición artesana y la vanguardia conceptual.
          </p>
        </div>

     
      </motion.div>
    </section>
  );
};

export default AboutSection;
