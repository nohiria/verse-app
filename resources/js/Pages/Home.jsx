import { useEffect, useState } from "react";
import { fetchVerseOfTheDay } from "../Services/api.js";

export default function Home() {
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    async function fetchVerse() {
      const data = await fetchVerseOfTheDay();
      setVerse(data);
    }
    fetchVerse();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">📖 Verso del Día</h1>
      {verse ? (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-lg">
          <p className="text-lg italic">{verse.text}</p>
          <p className="text-sm font-semibold text-gray-700 mt-2">
            {verse.book} {verse.chapter}:{verse.verse}
          </p>
        </div>
      ) : (
        <p>Cargando verso...</p>
      )}
    </div>
  );
}
