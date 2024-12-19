import React from "react";
import { motion } from "framer-motion";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    src: string;
    title: string;
    description: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="relative  bg-gray-100 rounded-lg pt-4 text-black"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex flex-col items-center pb-8 px-4">
          <img
            src={item.src}
            alt={item.title}
            className="w-auto h-full object-cover rounded-lg max-h-96"
          />
          <h2 className="mt-4 text-2xl font-bold">{item.title}</h2>
          <p className="mt-2 text-gray-700">{item.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
