import { Link, usePage, router } from "@inertiajs/react";
import { TbWorld } from "react-icons/tb";
import { useState, useEffect } from "react";

export default function GuestLayout({ children }) {
    const { locale, translations } = usePage().props;
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState(locale);

    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' }
    ];

    useEffect(() => {
        // Sincronizar con localStorage
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && savedLocale !== locale) {
            changeLanguage(savedLocale);
        }
    }, []);

    const changeLanguage = (lang) => {
        setCurrentLocale(lang);
        localStorage.setItem('locale', lang);
        
        // Usar Inertia para cambiar el idioma sin recargar la página
        router.get(
            window.location.pathname, 
            { lang }, 
            { 
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    setLangMenuOpen(false);
                }
            }
        );
    };

    return (
        <div className="min-h-screen flex flex-row bg-gray-900">
            {/* Sección Izquierda: Presentación */}
            <div className="hidden lg:block w-1/3 h-screen bg-cover bg-center relative" 
                style={{ backgroundImage: "url('/imgs/world.jpg')" }}>
                {/* Capa Oscura */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-start items-start text-white p-10">
                    {/* Título */}
                    <h1 className="text-3xl font-extrabold tracking-wide opacity-0 animate-fadeIn">
                        {translations.messages.app.name}
                    </h1>

                    {/* Mensaje Enfocado en la App */}
                    <div className="px-10 pt-20 text-left">
                        <p className="mt-4 text-lg max-w-md text-gray-300 leading-relaxed opacity-0 animate-slideIn">
                            {translations.messages.app.description}
                        </p>
                    </div>

                    {/* Botón Versículo del Día */}
                    <div className="w-full flex justify-center pt-16">
                        <Link
                            href="/"
                            className="mt-6 px-6 py-3 bg-white hover:bg-gray-300 text-gray-900 font-semibold rounded-3xl transition-all duration-300 transform hover:scale-105 opacity-0 animate-slideUp"
                        >
                            {translations.messages.app.view_verse}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sección Derecha: Formulario */}
            <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-6">
                {/* Language Selector - Ahora en la parte superior derecha del formulario */}
                <div className="w-full max-w-md flex justify-end mb-8">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                        >
                            <TbWorld className="animate-spin-slow" size={18} />
                            <span className="text-sm">{currentLocale.toUpperCase()}</span>
                        </button>
                        
                        {langMenuOpen && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-50 animate-fadeIn">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`block px-4 py-2 text-sm w-full text-left transition-all duration-200 
                                            ${currentLocale === lang.code 
                                                ? 'bg-gray-700 text-white' 
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            } transform hover:translate-x-1`}
                                    >
                                        {lang.name}
                                        {currentLocale === lang.code && (
                                            <span className="float-right">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="opacity-0 animate-fadeIn">
                    {children}
                </div>
            </div>
        </div>
    );
}
