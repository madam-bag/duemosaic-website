import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const languages = {
  en: { code: 'en', name: 'English', locale: 'en_US' },
  fr: { code: 'fr', name: 'Français', locale: 'fr_FR' },
  de: { code: 'de', name: 'Deutsch', locale: 'de_DE' },
  lb: { code: 'lb', name: 'Lëtzebuergesch', locale: 'lb_LU' }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Try to get from localStorage, or detect from browser, or default to English
    const saved = localStorage.getItem('language');
    if (saved && languages[saved]) {
      return saved;
    }
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (languages[browserLang]) {
      return browserLang;
    }
    return 'en'; // Default to English
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    languages,
    currentLanguage: languages[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

