import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import AuthMenu from "./AuthMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preferences
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    }
    return false;
  });

  // Apply theme when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle theme toggle
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const links = [
    { href: "/", label: "Principal" },
    { href: "/verse", label: "Versículo del día" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          VerseApp
        </Link>

        {/* Desktop navigation menu */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-800 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side buttons */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {/* Authentication menu for desktop */}
          <div className="hidden md:block">
            <AuthMenu />
          </div>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 dark:text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <ul className="py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Authentication menu for mobile */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <AuthMenu isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
}