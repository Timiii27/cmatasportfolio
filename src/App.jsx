import { useEffect } from "react";
import Lenis from "lenis";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Works from "./components/Works";
import FooterSection from "./components/FooterSection";
import "lenis/dist/lenis.css";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden selection:bg-black selection:text-white">
      <CustomCursor />
      {/* Navigation removed as requested */}
      <main>
        <Hero />
        <Works />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
