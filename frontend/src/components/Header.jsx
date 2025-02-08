import { useState } from "react";
import { Menu, X } from "lucide-react"; // For icons
import ThemeToggle from "./ThemeToggle";
import Icon from "../assets/icon.jpg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 shadow-lg dark:shadow-gray-800">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <img
              src={Icon}
              alt="TaxBuddy.AI"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold text-white tracking-wide">
              TaxBuddy<span className="text-blue-500">.AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {["Home", "About", "Features", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Get Started Button */}
          <a
            href="#"
            className="hidden md:inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-gray-300 py-4 px-6 space-y-3 border-t border-gray-700">
          {["Home", "About", "Features", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#"
            className="block mt-2 text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
