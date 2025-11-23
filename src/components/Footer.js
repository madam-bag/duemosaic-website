import React from 'react';
import { Link } from 'react-router-dom';
import { getContactInfo } from '../utils/contact';
import './Footer.css';

function Footer() {
  const contactInfo = getContactInfo();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{contactInfo.companyName}</h3>
            <p className="footer-description">
              Innovative design solutions for both small and large-scale projects.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Contact</h4>
            <div className="footer-contact">
              <a href={`mailto:${contactInfo.email}`} className="footer-link">
                ✉ {contactInfo.email}
              </a>
              {contactInfo.phones.map((phone, index) => (
                <a key={index} href={`tel:${phone.tel}`} className="footer-link">
                  📱 {phone.number}
                </a>
              ))}
              <a 
                href={contactInfo.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                📍 {contactInfo.address.line1}, {contactInfo.address.line2}
              </a>
              <a 
                href={contactInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                📷 {contactInfo.instagram.handle}
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Navigation</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/projects" className="footer-link">Projects</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {contactInfo.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
