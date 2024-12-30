import {
  Navbar,
  Hero,
  Menu,
  About,
  Contact,
  FooterComponent,
  ChatBubble,
} from "./components";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-content transition-colors duration-200">
        <Navbar />
        <Hero />
        <Menu />
        <About />
        <Contact />
        <FooterComponent />
        <ChatBubble />
      </div>
    </div>
  );
}

export default App;
