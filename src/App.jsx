import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import "./index.css";
import "tailwindcss/tailwind.css";
import PortfolioSection from "./components/card";
import { useInView } from "react-intersection-observer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A202C",
    },
    secondary: {
      main: "#4A5568",
    },
    accent: {
      main: "#E2E8F0",
    },
    light: {
      main: "#F7FAFC",
    },
    dark: {
      main: "#2D3748",
    },
  },
});
const clothingItems = [
  {
    src: "Portfolio-01.png",
    alt: "Vestido 1",
    title: "Vestido 1",
    description: "Inspirado en la naturaleza y la alegría de la primavera.",
  },
  {
    src: "Portfolio-02.png",
    alt: "Vestido 2",
    title: "Vestido 2",
    description: "Un diseño elegante y moderno.",
  },
  {
    src: "Portfolio-03.png",
    alt: "Vestido 3",
    title: "Vestido 3",
    description: "Diseño sofisticado para cualquier ocasión.",
  },
  {
    src: "Portfolio-04.png",
    alt: "Vestido 4",
    title: "Vestido 4",
    description: "Elegante y cómodo para el uso diario.",
  },
  {
    src: "Portfolio-05.png",
    alt: "Vestido 5",
    title: "Vestido 5",
    description: "Un diseño único y creativo.",
  },
  {
    src: "Portfolio-06.png",
    alt: "Vestido 6",
    title: "Vestido 6",
    description: "Con un toque vintage para ocasiones especiales.",
  },
];

const bagItems = [
  {
    src: "Portfolio-19.png",
    alt: "Bolso 1",
    title: "Bolso 1",
    description: "Diseño moderno y elegante.",
  },
  {
    src: "Portfolio-12.png",
    alt: "Bolso 2",
    title: "Bolso 2",
    description: "Un bolso con gran funcionalidad.",
  },
  {
    src: "Portfolio-17.png",
    alt: "Bolso 3",
    title: "Bolso 3",
    description: "Elegante y perfecto para el uso diario.",
  },
  {
    src: "Portfolio-15.png",
    alt: "Bolso 4",
    title: "Bolso 4",
    description: "Un toque artesanal para cualquier estilo.",
  },
  {
    src: "Portfolio-11.png",
    alt: "Bolso 5",
    title: "Bolso 5",
    description: "Estilo bohemio y relajado.",
  },
  {
    src: "Portfolio-18.png",
    alt: "Bolso 6",
    title: "Bolso 6",
    description: "Diseño moderno con estampado clásico.",
  },
];
function ScrollSection({ id, children, className }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.section>
  );
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="mx-auto">
        <motion.nav
          className="navbar bg-primary text-light p-4"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <ul className="flex justify-around">
            <li>
              <Link
                to="about"
                smooth={true}
                duration={1000}
                className="text-lg font-bold cursor-pointer"
              >
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link
                to="bags"
                smooth={true}
                duration={1000}
                className="text-lg font-bold cursor-pointer"
              >
                Bolsos
              </Link>
            </li>
            <li>
              <Link
                to="clothing"
                smooth={true}
                duration={1000}
                className="text-lg font-bold cursor-pointer"
              >
                Vestidos y Ropa
              </Link>
            </li>
          </ul>
        </motion.nav>

        <ScrollSection
          id="about"
          className="about min-h-screen flex flex-col justify-center items-center bg-light text-dark px-6"
        >
          <div className="max-w-3xl text-center">
            <h2 className="text-5xl font-bold mb-6">Sobre Mí</h2>
            <p className="text-lg mb-6">
              Soy una diseñadora de moda enfocada en la creación de prendas
              innovadoras y sorprendentes. Busco unir la funcionalidad con la
              estética moderna.
            </p>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="/cv.pdf"
              className="inline-block bg-secondary text-white py-2 px-4 rounded-lg"
            >
              Descargar CV
            </motion.a>
          </div>
        </ScrollSection>

        <ScrollSection
          id="clothing"
          className="min-h-screen flex flex-col justify-center items-center bg-light text-dark"
        >
          <PortfolioSection
            title="Vestidos y Ropa"
            items={clothingItems}
            bgColor="bg-light"
            textColor="text-dark"
          />
        </ScrollSection>

        <ScrollSection
          id="bags"
          className="min-h-screen flex flex-col justify-center items-center bg-accent text-dark"
        >
          <PortfolioSection
            title="Colección de Bolsos"
            items={bagItems}
            bgColor="bg-accent"
            textColor="text-dark"
          />
        </ScrollSection>

        <motion.footer
          className="portfolio-footer bg-secondary text-light p-8 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-center text-lg">
            Contacto: claramatas.arcadia@gmail.com
          </p>
        </motion.footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
