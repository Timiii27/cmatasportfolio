import React from "react";
import { motion } from "framer-motion";

export interface CardComponentProps {
  item: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
  onClick?: () => void;
}

const CardComponent = ({ item, onClick }: CardComponentProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer text-white shadow-xl hover:shadow-2xl transition-all duration-500 ease-out w-full h-full bg-black"
      onClick={onClick}
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></motion.div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 group-hover:p-8 transition-all duration-500">
        <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 space-y-2">
          <div className="w-12 h-[1px] bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <h2 className="font-serif text-xl md:text-2xl font-light tracking-wide">
            {item.title}
          </h2>
          <p className="text-sm text-white/70 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CardComponent;
