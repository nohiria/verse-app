import { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";

export default function Home() {
  const [verse, setVerse] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const verseResponse = await fetch("/api/verse-of-the-day");
        const imageResponse = await fetch("/api/random-image");

        const verseData = await verseResponse.json();
        const imageData = await imageResponse.json();

        setVerse(verseData);
        setImage(imageData.urls.full);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen transition-all duration-300">
      {/* Sección Izquierda - Versículo */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-10">
        <div className="relative rounded-lg p-10 text-left max-w-2xl w-full transition-all duration-300">
          {/* Fondo Difuminado */}
          {image && (
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${image})`,
                filter: "blur(1px)",
              }}
            ></div>
          )}

          {/* Capa de Opacidad */}
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg transition-opacity duration-300"></div>

          {/* Tarjeta del Versículo */}
          <div className="relative text-white z-10">
            <h2 className="text-sm font-semibold opacity-50">
              Versículo del Día
            </h2>
            <p className="text-lg font-medium mt-1 opacity-80">
              {verse?.book} {verse?.chapter}:{verse?.verse}
            </p>

            {/* Contenido del Versículo */}
            <p className="text-3xl font-bold italic mt-6 text-white">{verse?.text}</p>
          </div>
        </div>
      </div>

      {/* Sección Derecha - Imagen */}
      {image && (
        <div
          className="hidden lg:block w-1/3 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          {/* Capa Oscura (Modo Oscuro) */}
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300"></div>
        </div>
      )}
    </div>
  );
}

Home.layout = (page) => <Layout>{page}</Layout>;