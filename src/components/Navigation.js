import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, languages } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const t = translations[language] || translations.en;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close language menu when clicking outside
    const handleClickOutside = (event) => {
      if (showLanguageMenu && !event.target.closest('.language-selector')) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLanguageMenu]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/images/webpage-logo.png" alt="Architect Logo" className="logo-image" />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              {t.nav.home}
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={location.pathname === '/projects' ? 'nav-link active' : 'nav-link'}
            >
              {t.nav.projects}
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
            >
              {t.nav.about}
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
            >
              {t.nav.contact}
            </Link>
          </li>
          <li className="language-selector">
            <button 
              className="language-button"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              aria-label="Select language"
              aria-expanded={showLanguageMenu}
            >
              <span className="language-code">{language.toUpperCase()}</span>
              <span className="language-arrow">▼</span>
            </button>
            {showLanguageMenu && (
              <ul className="language-menu">
                {Object.values(languages).map((lang) => (
                  <li key={lang.code}>
                    <button
                      className={`language-option ${language === lang.code ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;


