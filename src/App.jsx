import Header from "./components/header";
import About from "./components/about";
import Portfolio from "./components/portfolio";
import Footer from "./components/footer";

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Header />
      <About />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;
