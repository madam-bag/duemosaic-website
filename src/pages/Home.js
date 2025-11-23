import React from 'react';
import { Link } from 'react-router-dom';
import HomeCarousel from '../components/HomeCarousel';
import './Home.css';

function Home() {
  const services = [
    {
      icon: '🏠',
      title: 'Residential',
      description: 'Housing and residential architecture'
    },
    {
      icon: '🏢',
      title: 'Commercial',
      description: 'Offices, libraries, restaurants, co-working spaces'
    },
    {
      icon: '🔨',
      title: 'Renovations',
      description: 'High-quality renovations and transformations'
    },
    {
      icon: '🎨',
      title: 'Interior Design',
      description: 'Interior space planning and design'
    },
    {
      icon: '🏛️',
      title: 'Restorations',
      description: 'Restorations of buildings and historical monuments'
    },
    {
      icon: '📐',
      title: 'Survey & Planning',
      description: 'Vertical cadastral survey and land-use planning'
    },
    {
      icon: '🏘️',
      title: 'Urban Development',
      description: 'Neighborhood designing and urban development'
    },
    {
      icon: '🏭',
      title: 'Industrial',
      description: 'Industrial and agricultural constructions'
    },
    {
      icon: '📚',
      title: 'Educational Facilities',
      description: 'School buildings and educational institution architecture'
    }
  ];

  return (
    <div className="home-page">
      <HomeCarousel />
      
      <section className="services-section">
        <div className="home-container">
          <div className="services-header">
            <h2 className="section-title">Our Services</h2>
            <p className="services-intro">
              Duemosaicarchitects offers innovative design and construction solutions, 
              combining creativity and precision to bring your projects to life.
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-cta-section">
        <div className="home-container">
          <div className="projects-cta-content">
            <h2 className="projects-cta-title">Our Projects</h2>
            <p className="projects-cta-description">
              Explore our portfolio of innovative architectural designs and completed projects
            </p>
            <Link to="/projects" className="projects-cta-button">
              View All Projects
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
