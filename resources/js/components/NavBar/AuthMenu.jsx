import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function AuthMenu({ isMobile = false }) {
  const [authOpen, setAuthOpen] = useState(false);

  // If in mobile mode, display links directly without a dropdown menu
  if (isMobile) {
    return (
      <ul className="flex flex-col text-gray-800">
        <li>
          <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 rounded">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/register" className="block px-4 py-2 hover:bg-gray-100 rounded">
            Create Account
          </Link>
        </li>
        <li>
          <Link href="/contacto" className="block px-4 py-2 hover:bg-gray-100 rounded">
            Contact
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="relative">
      {/* User button */}
      <button
        className="p-2 rounded-full bg-gray-200 text-gray-800 focus:outline-none"
        onClick={() => setAuthOpen(!authOpen)}
        onBlur={() => setTimeout(() => setAuthOpen(false), 200)} // Closes menu when clicking outside
      >
        <FaUser size={20} />
      </button>

      {/* Dropdown menu */}
      {authOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-100 shadow-lg rounded-lg p-2">
          <Link href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
            Sign In
          </Link>
          <Link href="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
            Create Account
          </Link>
          <Link href="/contacto" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}