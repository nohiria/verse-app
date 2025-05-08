import { useState } from "react";
import { TbWorld } from "react-icons/tb";

export default function LanguageSelector({ locale, languages, changeLanguage }) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <div className="relative language-selector">
      <button
        type="button"
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white transition-colors duration-300 flex items-center gap-2"
      >
        <TbWorld size={18} />
        <span className="text-sm">{locale.toUpperCase()}</span>
      </button>

      {langMenuOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setLangMenuOpen(false);
              }}
              className={`block px-4 py-2 text-sm w-full text-left transition-colors duration-200 
                ${locale === lang.code 
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {lang.name}
              {locale === lang.code && <span className="float-right">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}