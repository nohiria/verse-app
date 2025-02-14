import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
    <nav className="bg-blue-700 dark:bg-gray-900 text-white shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">VerseApp</h1>

        {/* Botón de Menú (Móvil) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links de Navegación + Dark Mode Button */}
        <div className={`md:flex gap-6 items-center text-lg transition-all duration-300
          ${menuOpen ? "block" : "hidden"} absolute md:static top-16 left-0 w-full md:w-auto bg-blue-700 dark:bg-gray-900 md:bg-transparent p-4 md:p-0`}>
          <ul className="md:flex gap-6">
            <li>
              <Link to="/" className="block py-2 md:py-0 px-4 hover:text-gray-200 transition-all">Inicio</Link>
            </li>
            <li>
              <Link to="/verso" className="block py-2 md:py-0 px-4 hover:text-gray-200 transition-all">Verso del Día</Link>
            </li>
            <li>
              <Link to="/contacto" className="block py-2 md:py-0 px-4 hover:text-gray-200 transition-all">Contacto</Link>
            </li>
          </ul>

          {/* Dark Mode Toggle */}
          <button 
            className="ml-4 p-2 rounded-full bg-gray-800 dark:bg-yellow-400 text-white dark:text-gray-900 transition-all duration-300"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}