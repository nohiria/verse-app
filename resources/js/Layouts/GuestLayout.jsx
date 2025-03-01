import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:flex-row items-center bg-gray-900">
            {/* Sección Derecha: Presentación */}
            <div
                className="hidden sm:flex w-1/3 h-screen bg-cover bg-center relative" 
                style={{ backgroundImage: "url('/imgs/world.jpg')" }}
            >
                {/* Capa Oscura */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-start items-start text-white p-10 pt-10">
                    {/* Título */}
                    <h1 className="text-3xl font-extrabold tracking-wide">VerseApp</h1>

                    {/* Mensaje Enfocado en la App */}
                    <div className="px-10 pt-20 text-left">
                        <p className="mt-4 text-lg max-w-md text-gray-300 leading-relaxed">
                            Tu conexión diaria con la Palabra de Dios.  
                            Descubre versículos inspiradores y deja que la Biblia guíe cada momento de tu vida.
                        </p>
                    </div>

                    {/* Botón Versículo del Día */}
                    <div className="w-full flex justify-center pt-16">
                        <Link
                            href="/"
                            className="mt-6 px-6 py-3 bg-white hover:bg-gray-300 text-gray-900 font-semibold rounded-3xl transition duration-300"
                        >
                            Ver versículo del día
                        </Link>
                    </div>
                </div>
            </div>
            {/* Sección Izquierda: Formulario */}
            <div className="w-full lg:w-2/3 flex items-center justify-center p-10">
                {children}
            </div>

        </div>
    );
}
