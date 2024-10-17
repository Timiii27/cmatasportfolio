import { motion } from "framer-motion";
import React from "react";

export default function PortfolioSection({ title, items, bgColor, textColor }) {
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${bgColor} ${textColor} py-20`}
    >
      <h2 className="text-5xl font-bold mb-12">{title}</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-light p-6 rounded-lg shadow-md max-w-[300px] flex flex-col justify-between"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="mb-4 rounded object-cover w-full h-[290px]"
            />
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
            <p className="text-base mb-4">{item.description}</p>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="inline-block bg-primary text-white py-2 px-4 rounded-lg text-center"
            >
              Ver más
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
