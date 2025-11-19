import { motion } from "framer-motion";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 mix-blend-difference text-white md:mix-blend-normal md:text-black">
      <div className="font-serif text-xl font-bold tracking-tight">CM.</div>
      <div className="hidden md:flex gap-12 text-xs uppercase tracking-widest font-medium">
        {["Work", "About", "Contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="relative group hover:opacity-50 transition-opacity"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
