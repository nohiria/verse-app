import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
