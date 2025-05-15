import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import useAuth from "@/hooks/useAuth"; // Custom hook to get auth data

export default function AuthMenu({ isMobile = false}) {
  
  // Get authentication status from the custom hook
  const { isLoggedIn} = useAuth();
  console.log('AuthMenu isLoggedIn:', isLoggedIn);
  const [authOpen, setAuthOpen] = useState(false);
  const menuRef = useRef(null); // Reference to detect clicks outside

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // If the click is outside the menu, close it
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAuthOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If in mobile mode, display links directly without a dropdown menu
  if (isMobile) {
    return (
      <ul className="flex flex-col text-gray-800">
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/dashboard" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Profile
              </Link>
            </li>
            <li>
              <Link method="post" href="/logout" as="button" className="block px-4 py-2 text-gray-800 dark:text-white text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Create Account
              </Link>
            </li>
          </>
        )}
        <li>
          <Link href="/contacto" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Contact
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User button */}
      <button
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white transition-color focus:outline-none"
        onClick={() => setAuthOpen(!authOpen)}
      >
        <FaUser size={20} />
      </button>

      {/* Dropdown menu */}
      {authOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl z-50 p-2">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setAuthOpen(false)}>
                Dashboard
              </Link>
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setAuthOpen(false)}>
                Profile
              </Link>
              <Link method="post" href="/logout" as="button" className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setAuthOpen(false)}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setAuthOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setAuthOpen(false)}>
                Create Account
              </Link>
            </>
          )}
          <Link href="/contacto" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" onClick={() => setAuthOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}