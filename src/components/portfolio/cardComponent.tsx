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
      whileHover={{ scale: 1.05 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer text-white shadow-2xl transition-transform duration-500 ease-out w-full h-full"
      onClick={onClick}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="absolute w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-95"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-10 -right-16 w-40 h-40 bg-[#FF6F61] rounded-full blur-3xl opacity-50"
      ></motion.div>

      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <motion.h2 className="text-2xl font-semibold uppercase mt-4 tracking-wide group-hover:translate-y-[-50%] transition-transform duration-500">
          {item.title}
        </motion.h2>
        <motion.p className="text-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CardComponent;
