import Navbar from "@/Components/NavBar/Navbar";

export default function Layout({ children }) {
  return (
    // Full-height container using flex to structure the layout
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content area that expands to fill available space*/}
      <main className="flex-1 container mx-auto">
        {children}
      </main>
    </div>
  );
}
