import React from "react";
import { motion } from "framer-motion";
export interface CardComponentProps {
  item: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
}
const CardComponent = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Slight zoom on hover
      className="group relative w-96 h-[36rem] rounded-xl overflow-hidden cursor-pointer text-white shadow-lg transition-all duration-500 ease-out"
    >
      <img
        src={`/${item.src}`} // Image source path
        alt={item.alt}
        className="absolute w-full h-full object-fill opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end space-y-4">
        {/* Title */}
        <h2 className="absolute bottom-8 left-8 uppercase transition-all duration-300 group-hover:bottom-32 font-semibold">
          {item.title}
        </h2>

        {/* Description */}
        <p className="absolute bottom-12 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[80%]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default CardComponent;
