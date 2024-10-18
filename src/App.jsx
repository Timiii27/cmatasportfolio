import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Header from "./components/header";
import About from "./components/about";
import Portfolio from "./components/portfolio";
import Footer from "./components/footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <About />
      <Portfolio />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
