import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CardComponent from "./cardComponent";
import { clothingItems, bagItems } from "../../data";
import { useState } from "react";
import Modal from "./modal";

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref: refClothing, inView: inViewClothing } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: refBags, inView: inViewBags } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  return (
    <div
      className="relative flex flex-col justify-center items-center text-white min-h-screen p-8 py-32"
      id="portfolio"
    >
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem || {}}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a] z-0"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute w-96 h-96 bg-[#8b7355] rounded-full blur-[120px] top-20 right-20"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-80 h-80 bg-[#d4af37] rounded-full blur-[120px] bottom-20 left-16"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pb-16 z-10 w-full space-y-6"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
          ></motion.div>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-white/95">
            Portfolio
          </h1>
          <p className="text-white/50 uppercase tracking-[0.3em] text-xs">
            Selected Works
          </p>
        </div>
        <p className="text-white/60 mt-6 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          A curated collection of my latest work in fashion design, blending
          creativity, elegance, and craftsmanship.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full max-w-[1600px]">
        <section ref={refClothing} className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-4xl font-light tracking-wide text-white/90">
              Clothing
            </h2>
            <div className="h-[1px] w-16 bg-[#d4af37] mx-auto"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inViewClothing ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="grid grid-cols-4 md:grid-cols-12 gap-4 grid-auto-rows-[180px]"
            style={{ gridAutoRows: "minmax(180px, auto)" }}
          >
            {clothingItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  index % 5 === 0
                    ? "md:col-span-6 md:row-span-2"
                    : index % 3 === 0
                    ? "md:col-span-4 md:row-span-1"
                    : "md:col-span-3 md:row-span-1"
                }  ${
                  index % 43 === 0
                    ? "col-span-4 row-span-2"
                    : index % 3 === 0
                    ? "col-span-3 row-span-1"
                    : "col-span-2 row-span-2"
                }`}
              >
                <CardComponent
                  item={item}
                  onClick={() => handleCardClick(item)}
                />
              </div>
            ))}
          </motion.div>
        </section>

        <section ref={refBags} className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-4xl font-light tracking-wide text-white/90">
              Bags
            </h2>
            <div className="h-[1px] w-16 bg-[#d4af37] mx-auto"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inViewBags ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="grid grid-cols-4 md:grid-cols-12 gap-4 grid-auto-rows-[180px]"
            style={{ gridAutoRows: "minmax(180px, auto)" }}
          >
            {bagItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  index % 5 === 0
                    ? "md:col-span-6 md:row-span-2"
                    : index % 3 === 0
                    ? "md:col-span-4 md:row-span-1"
                    : "md:col-span-3 md:row-span-1"
                }  ${
                  index % 4 === 0
                    ? "col-span-4 row-span-2"
                    : index % 3 === 0
                    ? "col-span-3 row-span-1"
                    : "col-span-2 row-span-2"
                }`}
              >
                <CardComponent
                  item={item}
                  onClick={() => handleCardClick(item)}
                />
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
