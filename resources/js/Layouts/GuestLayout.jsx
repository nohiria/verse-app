import { Link, usePage, router } from "@inertiajs/react";
import { TbWorld } from "react-icons/tb";
import { useState, useEffect } from "react";
import LanguageSelector from "@/Components/LanguageSelector";

export default function GuestLayout({ children }) {
    const { locale, translations } = usePage().props;
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState(locale);

    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' }
    ];
    useEffect(() => {
        // Synchronize with localStorage
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && savedLocale !== locale) {
            changeLanguage(savedLocale);
        }
    }, []);

    const changeLanguage = (lang) => {
        setCurrentLocale(lang);
        localStorage.setItem('locale', lang);
        
        // Use Inertia to change the language without reloading the page
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
            {/* Left Section: Presentation */}
            <div className="hidden lg:block w-1/3 h-screen bg-cover bg-center relative" 
                style={{ backgroundImage: "url('/imgs/world.jpg')" }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-start items-start text-white p-10">
                    {/* Title */}
                    <h1 className="text-3xl font-extrabold tracking-wide opacity-0 animate-fadeIn">
                        {translations.messages.app.name}
                    </h1>

                    {/* App-Focused Message */}
                    <div className="px-10 pt-20 text-left">
                        <p className="mt-4 text-lg max-w-md text-gray-300 leading-relaxed opacity-0 animate-slideIn">
                            {translations.messages.app.description}
                        </p>
                    </div>

                    {/* Verse of the Day Button */}
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

            {/* Right Section: Form */}
            <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-6">
                {/* Language Selector - Now at the top-right of the form */}
                <div className="w-full max-w-md flex justify-end mb-8">
                    <div className="relative">
                        <LanguageSelector 
                        locale={locale} 
                        languages={languages} 
                        changeLanguage={changeLanguage} 
                        />
                    </div>
                </div>

                <div className="opacity-0 animate-fadeIn">
                    {children}
                </div>
            </div>
        </div>
    );
}
