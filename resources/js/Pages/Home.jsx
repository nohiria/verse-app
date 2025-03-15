import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Home({ canLogin, canRegister }) {
  const { locale } = usePage().props;
  const [verseData, setVerseData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener versículo y imagen en paralelo
        const [verseResponse, imageResponse] = await Promise.all([
          fetch("/verso/refresh"),
          fetch("/api/random-image")
        ]);
        
        if (!verseResponse.ok || !imageResponse.ok) {
          throw new Error('Error al obtener los datos');
        }

        const [verse, image] = await Promise.all([
          verseResponse.json(),
          imageResponse.json()
        ]);

        console.log('Raw verse data:', verse);
        console.log('Raw image data:', image);

        if (!verse || !verse.available_translations) {
          throw new Error('Datos del versículo incompletos');
        }

        setVerseData(verse);
        setImageData(image);
        setError(null);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError(error.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Verificaciones de seguridad
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!verseData?.available_translations?.[locale]) {
    console.error('Invalid verse data:', verseData);
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-500">No hay versículo disponible</div>
        </div>
      </Layout>
    );
  }

  const currentTranslation = verseData.available_translations[locale];

  return (
    <Layout>
      <Head title="Home" />
      <div className="flex flex-col lg:flex-row min-h-screen transition-all duration-300">
        {/* Sección Izquierda - Versículo */}
        <div className="w-full lg:w-2/3 flex items-center justify-center p-10">
          <div className="relative rounded-lg p-10 text-left max-w-2xl w-full">
            {/* Fondo con Imagen */}
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{ 
                backgroundImage: imageData?.urls?.regular 
                  ? `url('${imageData.urls.regular}')`
                  : "url('/imgs/world.jpg')"
              }}
            >
              {imageData?.user && (
                <div className="absolute bottom-2 right-2 text-xs text-white opacity-75">
                  Photo by{" "}
                  <a
                    href={imageData.user.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {imageData.user.name}
                  </a>
                </div>
              )}
            </div>

            {/* Capa de Opacidad */}
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

            {/* Contenido */}
            <div className="relative z-10">
              <div className="text-white">
                <h2 className="text-sm font-semibold opacity-75">
                  Versículo del Día
                </h2>
                
                <p className="text-lg mt-1 opacity-75">
                  {currentTranslation.reference}
                </p>

                <blockquote className="text-3xl font-bold italic mt-6">
                  "{currentTranslation.text}"
                </blockquote>
                
                <p className="text-right mt-4 opacity-75">
                  {currentTranslation.translation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Derecha - Imagen */}
        <div className="hidden lg:block w-1/3 bg-cover bg-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: imageData?.urls?.regular 
                ? `url('${imageData.urls.regular}')`
                : "url('/imgs/world.jpg')"
            }}
          >
            {/* Capa Oscura */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}