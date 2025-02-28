import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AuthMenu({ isMobile = false }) {
  const [authOpen, setAuthOpen] = useState(false);

  // If on mobile, simply display the links inside the menu
  if (isMobile) {
    return (
      <ul className="flex flex-col text-gray-800 dark:text-white">
        <li>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link to="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Crear Cuenta
          </Link>
        </li>
        <li>
          <Link to="/contacto" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Contacto
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="relative">
      {/* User button */}
      <button
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        onClick={() => setAuthOpen(!authOpen)}
      >
        <FaUser size={20} />
      </button>

      {/* Authentication card (Desktop) */}
      {authOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-2">
          <Link to="/login" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Crear Cuenta
          </Link>
          <Link to="/contacto" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Contacto
          </Link>
        </div>
      )}
    </div>
  );
}
