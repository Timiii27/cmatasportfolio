import { Typography } from "@mui/material";
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
      className="relative flex flex-col justify-center items-center text-white min-h-screen p-8"
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
        className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#333333] z-0"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute w-48 h-48 md:w-72 md:h-72 bg-[#FF6F61] rounded-full blur-3xl -top-16 right-20"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-32 h-32 md:w-56 md:h-56 bg-[#2d884d] rounded-full blur-3xl -bottom-10 left-16 z-[400]"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pb-10 z-10 w-full"
      >
        <Typography
          variant="h3"
          component="h1"
          className="text-4xl md:text-5xl font-bold uppercase tracking-wider"
        >
          My Portfolio
        </Typography>
        <p className="text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
          A curated collection of my latest work in fashion design, blending
          creativity, elegance, and craftsmanship.
        </p>
      </motion.div>

      {/* Full-Width Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full px-8">
        {/* Clothing Collection */}
        <section ref={refClothing} className="space-y-8">
          <Typography
            variant="h4"
            component="h2"
            className="text-3xl font-semibold text-center pb-4"
          >
            Clothing Collection
          </Typography>

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

        {/* Bag Collection */}
        <section ref={refBags} className="space-y-8">
          <Typography
            variant="h4"
            component="h2"
            className="text-3xl font-semibold text-center pb-4"
          >
            Bag Collection
          </Typography>

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
