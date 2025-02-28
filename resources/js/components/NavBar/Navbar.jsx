import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import AuthMenu from "./AuthMenu";

export default function Navbar() {
  // State to track if the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);
  
  // State to manage dark mode, initialized from localStorage
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Effect to update the theme based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 inset-x-0 w-full z-50 bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-4">
        {/* Logo aligned to the left */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">VerseApp</h1>

        {/* Centered navigation menu (only visible on desktop) */}
        <ul className="hidden md:flex gap-8 text-gray-800 dark:text-white">
          <li>
            <Link to="/" className="hover:text-gray-500 dark:hover:text-gray-300 transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/verso" className="hover:text-gray-500 dark:hover:text-gray-300 transition-all">
              Verse of the Day
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="hover:text-gray-500 dark:hover:text-gray-300 transition-all">
              Contact
            </Link>
          </li>
        </ul>

        {/* Theme toggle button and AuthMenu (right side) */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle button */}
          <button
            className="p-2 rounded-full bg-gray-800 dark:bg-yellow-400 text-white dark:text-gray-900 transition-all duration-300"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* AuthMenu for desktop */}
          <div className="hidden md:block">
            <AuthMenu />
          </div>

          {/* Hamburger menu button for mobile */}
          <button
            className="md:hidden text-gray-800 dark:text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Floating in the top right */}
      <div
        className={`absolute top-16 right-4 w-56 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-transform
          ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col text-gray-800 dark:text-white text-lg">
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all rounded-t-lg"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/verso"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Versículo del Día
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all rounded-b-lg"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>

        {/* AuthMenu for mobile */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
          <AuthMenu isMobile={true} />
        </div>
      </div>
    </nav>
  );
}