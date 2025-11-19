import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full md:w-2/3 h-[60vh] md:h-[85vh]">
              <img
                src={`/${selectedItem.src.startsWith('/') ? selectedItem.src.slice(1) : selectedItem.src}`}
                alt={selectedItem.alt}
                className="w-full h-full object-contain object-center"
              />
            </div>

            <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6 text-left">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-4xl md:text-6xl italic text-black"
              >
                {selectedItem.title}
              </motion.h3>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 font-light text-lg leading-relaxed"
              >
                {selectedItem.description}
              </motion.p>

              <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="pt-8 border-t border-gray-200"
              >
                <button 
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest hover:text-accent transition-colors"
                >
                  Close View
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;

