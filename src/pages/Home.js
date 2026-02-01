import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import HomeCarousel from '../components/HomeCarousel';
import './Home.css';

function Home() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const services = [
    {
      icon: '🏠',
      key: 'residential'
    },
    {
      icon: '🏢',
      key: 'commercial'
    },
    {
      icon: '🔨',
      key: 'renovations'
    },
    {
      icon: '🎨',
      key: 'interior'
    },
    {
      icon: '🏛️',
      key: 'restorations'
    },
    {
      icon: '📐',
      key: 'survey'
    },
    {
      icon: '🏘️',
      key: 'urban'
    },
    {
      icon: '🏭',
      key: 'industrial'
    },
    {
      icon: '📚',
      key: 'educational'
    }
  ];

  return (
    <div className="home-page">
      <HomeCarousel />
      
      <section className="services-section">
        <div className="home-container">
          <div className="services-header">
            <h2 className="section-title">{t.home.servicesTitle}</h2>
            <p className="services-intro">
              {t.home.servicesIntro}
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{t.services[service.key].title}</h3>
                <p className="service-description">{t.services[service.key].description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-cta-section">
        <div className="home-container">
          <div className="projects-cta-content">
            <h2 className="projects-cta-title">{t.home.projectsTitle}</h2>
            <p className="projects-cta-description">
              {t.home.projectsDescription}
            </p>
            <Link to="/projects" className="projects-cta-button">
              {t.home.viewProjects}
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
