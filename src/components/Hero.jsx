import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const bgImageRef = useRef(null);
  const doorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Más recorrido para sentir el "paseo"
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Secuencia de "Entrar al Museo"
      
      // 1. El texto se desvanece mientras avanzamos
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power1.in"
      })
      
      // 2. "Caminamos" hacia la puerta (Zoom en la imagen de fondo)
      .to(bgImageRef.current, {
        scale: 4, // Zoom más profundo
        transformOrigin: "50% 90%", // Hacemos zoom hacia la parte inferior (la puerta/suelo)
        ease: "power1.inOut",
        duration: 2
      }, "<") // Empieza al mismo tiempo

      // 3. La "Puerta" se abre (o la imagen se funde a blanco/transparente para revelar la galería)
      .to(bgImageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, ">-0.5"); // Se solapa con el final del zoom

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center z-50">
      
      {/* Imagen de Museo / Fondo */}
      <div ref={bgImageRef} className="absolute inset-0 z-0 will-change-transform">
         <img 
           src="/hero.png" 
           alt="Museum Entrance" 
           className="w-full h-full object-cover opacity-60" 
         />
         {/* Viñeta para dar profundidad */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Contenido: Texto sobre mí */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
         <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-accent mb-6">
            Bienvenido a la Exposición
         </p>
         
         <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none mb-8 mix-blend-overlay text-white opacity-90">
           CLARA MATAS
         </h1>

         <div className="w-24 h-[1px] bg-white/50 mb-8" />

         <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl text-white/80">
           "La moda es el arte que habitamos. Aquí presento una colección de momentos, 
           texturas y formas que definen mi visión del diseño contemporáneo."
         </p>

         <div className="mt-12 animate-bounce">
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              Desliza para entrar
            </p>
            <div className="w-[1px] h-12 bg-white/20 mx-auto mt-4" />
         </div>
      </div>
    </section>
  );
};

export default Hero;
