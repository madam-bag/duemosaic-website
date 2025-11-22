import React from 'react';
import Carousel from '../components/Carousel';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <Carousel />
      
      <section className="services-section">
        <div className="home-container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-content">
            Duemosaicarchitects offers innovative design and construction solutions, combining creativity and precision to bring your projects to life. We specialize in residential, commercial, and industrial architecture, Housing, Residential, Public Buildings / Commercial Buildings (offices, libraries, restaurants, co-working spaces), Renovations, Interior space planning, Restorations of buildings and historical monuments, Vertical cadastral survey, Neighborhood Designing, Land-use planning and urban development, Industrial and agricultural constructions, Moderation / teaching
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="home-container">
          <h2 className="section-title">About Us</h2>
          <p className="section-content">
            Due Mosaic Architects is a high-end architecture studio delivering innovative design solutions for both small and large-scale projects. We specialize in contemporary architecture, high-quality renovations, and refined interior design.
          </p>
          <h3 className="subsection-title">VISION</h3>
          <p className="section-content">
            Architectural experiences are fundamentally sensory and concurrent. As architects, we engage in the art of shaping space by elucidating the intricate relationship between present and future moments, drawing lessons from history to inform our vision for the future. Our design language evolves through the interplay of continuity and innovation in disciplinary knowledge, allowing us to adapt seamlessly to diverse contexts within the dynamic interplay of SPACE-TIME.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
