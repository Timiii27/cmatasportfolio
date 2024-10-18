import { Typography } from "@mui/material";
import { clothingItems } from "../../data/clothing";
import { bagItems } from "../../data/bags";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CardComponent from "./cardComponent"; // Import the styled CardComponent

export default function Portfolio() {
  const { ref: refClothing, inView: inViewClothing } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: refBags, inView: inViewBags } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      className="flex  flex-col justify-center items-center p-8"
      id="portfolio"
    >
      {/* Clothing Collection Section */}
      <Typography variant="h4" component="h2" className="pt-20 text-center">
        Clothing Collection
      </Typography>

      <motion.div
        ref={refClothing}
        initial={{ opacity: 0, x: -500 }}
        animate={inViewClothing ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {clothingItems.map((item, index) => (
          <CardComponent key={index} item={item} />
        ))}
      </motion.div>

      <Typography variant="h4" component="h2" className="pt-20 text-center">
        Bag Collection
      </Typography>

      <motion.div
        ref={refBags}
        initial={{ opacity: 0, x: 500 }}
        animate={inViewBags ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {bagItems.map((item, index) => (
          <CardComponent key={index} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
