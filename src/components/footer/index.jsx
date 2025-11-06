import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer
      className="relative bg-black text-white py-16 w-full z-10"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-serif text-3xl font-light tracking-wide">
              Clara Manuela Matas
            </h3>
            <p className="text-white/50 text-sm tracking-wider uppercase">
              Fashion Designer
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ y: -3 }}
                  className="text-white/60 hover:text-[#d4af37] transition-colors text-sm tracking-wide cursor-pointer"
                >
                  {social}
                </motion.a>
              ))}
            </div>
            <div className="text-white/40 text-xs">contact@claramatas.com</div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"
        ></motion.div>

        <div className="text-center text-white/40 text-xs tracking-wider">
          © 2025 Clara Manuela Matas. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
