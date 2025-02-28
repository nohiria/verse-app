import { useEffect, useState } from "react";
import { fetchVerseOfTheDay, fetchRandomImage } from "../Services/api.js";

export default function Home() {
  const [verse, setVerse] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const verseData = await fetchVerseOfTheDay();
      const imageData = await fetchRandomImage();
  
      console.log("Imagen obtenida:", imageData);
  
      setVerse(verseData);
      setImage(imageData.urls?.full);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      {/* Left Section - Card */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-10">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-10 text-left max-w-2xl w-full transition-all duration-300">
          {/* Blur Background */}
          {image && (
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${image})`,
                filter: "blur(1px)",
              }}
            ></div>
          )}

          {/* Opacity layer */}
          <div className="absolute inset-0 bg-black opacity-30 dark:opacity-50 rounded-lg transition-opacity duration-300"></div>

          {/* Verse Card*/}
          <div className="relative text-white z-10">
            <h2 className="text-sm font-semibold opacity-50">
              Versículo del Día
            </h2>
            <p className="text-lg font-medium mt-1 opacity-80">
              {verse?.book} {verse?.chapter}:{verse?.verse}
            </p>

            {/* Verse content */}
            <p className="text-3xl font-bold italic mt-6 text-white">{verse?.text}</p>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      {image && (
        <div
          className="hidden lg:block w-1/3 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          {/* Dark Layer (Dark Mode) */}
          <div className="absolute inset-0 bg-black opacity-0 dark:opacity-40 transition-opacity duration-300"></div>
        </div>
      )}
    </div>
  );
}