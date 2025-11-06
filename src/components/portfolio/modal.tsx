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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-[#1a1a1a] rounded-3xl overflow-hidden text-white max-w-4xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white/70 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/5 bg-black overflow-hidden">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover min-h-[400px] max-h-[600px]"
            />
          </div>

          <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></div>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
                {item.title}
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed font-light">
              {item.description}
            </p>
            <div className="pt-4">
              <div className="text-white/40 text-xs uppercase tracking-widest">
                Fashion Design
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
