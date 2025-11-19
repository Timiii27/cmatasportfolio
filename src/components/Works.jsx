import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clothingItems } from "../data/clothing";
import { bagItems } from "../data/bags";
import ImageModal from "./ImageModal";
import AboutSection from "./AboutSection";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const containerRef = useRef(null);
  const dressesRef = useRef(null);
  const bagsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- CONFIGURACIÓN INICIAL ---
      const title = dressesRef.current.querySelector("h2");
      const dressItems = gsap.utils.toArray(".dress-item");
      
      // Establecemos el estado inicial explícitamente
      gsap.set(dressesRef.current, { backgroundColor: "#000000" });
      gsap.set(title, { 
        scale: 15, // Gigante pero legible como formas abstractas
        y: "30vh", // Centrado visualmente
        color: "#ffffff", 
        transformOrigin: "center center" 
      });
      gsap.set(dressItems, { scale: 0, y: -100, opacity: 0 });

      // --- TIMELINE PRINCIPAL (PINNED) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dressesRef.current,
          start: "top top", // Empieza cuando la sección llena la pantalla
          end: "+=300%", // Aumentamos la duración del scroll para que sea muy suave
          scrub: 1,
          pin: true, // Fijamos la sección para que la animación ocurra sin moverse
        }
      });

      // 1. El Título se coloca y el Fondo cambia a Blanco
      tl.to(dressesRef.current, { 
        backgroundColor: "#ffffff", 
        duration: 2,
        ease: "power1.inOut"
      })
      .to(title, { 
        scale: 1, 
        y: 0, 
        color: "#000000", 
        duration: 2,
        ease: "power2.inOut"
      }, "<") // Ocurre simultáneamente con el fondo

      // 2. Explosión de Vestidos
      .to(dressItems, {
        scale: 1,
        y: 0,
        opacity: 1,
        stagger: 0.1, // Efecto cascada
        duration: 1.5,
        ease: "back.out(1.2)"
      }, "-=0.5"); // Empieza un poco antes de que termine el título

      // --- ANIMACIÓN BOLSOS (Horizontal Scroll) ---
      const bagsContainer = document.querySelector(".bags-container");
      const bagsWrapper = document.querySelector(".bags-wrapper");
      
      if (bagsContainer && bagsWrapper) {
        gsap.to(bagsWrapper, {
          x: () => -(bagsWrapper.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: bagsContainer,
            start: "top top",
            end: () => `+=${bagsWrapper.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      
      {/* --- SECCIÓN 1: VESTIDOS (Pinned Sequence) --- */}
      <section ref={dressesRef} className="relative pt-24 pb-40 px-6 md:px-12 min-h-screen overflow-hidden">
        <div className="text-center mb-32 relative z-10">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 block mb-4 mix-blend-difference">Capítulo I</span>
           <h2 className="font-serif text-6xl md:text-8xl text-white will-change-transform">Movement</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-12 max-w-7xl mx-auto relative z-10">
           {clothingItems.map((item, index) => (
             <div 
               key={index} 
               className={`dress-item group cursor-pointer flex flex-col ${index % 2 === 1 ? 'md:mt-40' : ''}`}
               onClick={() => setSelectedItem(item)}
             >
                <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-6">
                   <img 
                     src={`/${item.src.startsWith('/') ? item.src.slice(1) : item.src}`}
                     alt={item.alt}
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000 ease-out"
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                   <span className="absolute top-4 left-4 text-xs font-bold bg-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     Ver Detalle
                   </span>
                </div>
                <div className="text-center md:text-left">
                   <h3 className="font-serif text-3xl italic">{item.title}</h3>
                   <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">Colección 2025</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* --- TRANSICIÓN: ABOUT / MANIFIESTO --- */}
      <AboutSection />

      {/* --- SECCIÓN 2: BOLSOS (Horizontal Scroll Sticky) --- */}
      <section ref={bagsRef} className="bags-container relative h-screen bg-[#111] text-white overflow-hidden">
         <div className="absolute top-12 left-12 z-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 block mb-2">Capítulo II</span>
            <h2 className="font-serif text-5xl italic">The Archive</h2>
         </div>

         <div className="bags-wrapper flex items-center h-full pl-[20vw] gap-24 w-max">
            {/* Intro Card */}
            <div className="w-[30vw] flex-shrink-0 pr-12 border-r border-white/10">
               <p className="font-serif text-4xl leading-tight text-white/80">
                 "Objetos que trascienden su función para convertirse en <span className="text-accent italic">escultura</span>."
               </p>
            </div>

            {bagItems.map((item, index) => (
               <div 
                 key={index} 
                 className="relative w-[70vw] md:w-[30vw] aspect-square flex-shrink-0 group cursor-pointer bg-[#1a1a1a] border border-white/5 p-12 flex items-center justify-center hover:bg-[#222] transition-colors duration-500"
                 onClick={() => setSelectedItem(item)}
               >
                  <img 
                    src={`/${item.src.startsWith('/') ? item.src.slice(1) : item.src}`}
                    alt={item.alt}
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6">
                     <h4 className="font-serif text-2xl italic">{item.title}</h4>
                     <p className="text-[10px] uppercase tracking-widest text-white/40">Ref. 0{index + 1}</p>
                  </div>
               </div>
            ))}
            
            {/* Espacio final */}
            <div className="w-[10vw] flex-shrink-0" />
         </div>
      </section>

      <ImageModal 
        selectedItem={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default Works;
