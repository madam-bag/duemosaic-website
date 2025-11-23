import React from 'react';
import { getContactInfo } from '../utils/contact';
import './Contact.css';

function Contact() {
  const contactInfo = getContactInfo();

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="page-title">Contact Us</h1>
        </div>
        
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">✉</div>
            <h3 className="contact-label">Email</h3>
            <a href={`mailto:${contactInfo.email}`} className="contact-link">
              {contactInfo.email}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h3 className="contact-label">Phone</h3>
            <div className="contact-phones">
              {contactInfo.phones.map((phone, index) => (
                <a key={index} href={`tel:${phone.tel}`} className="contact-link">
                  {phone.number}
                </a>
              ))}
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3 className="contact-label">Address</h3>
            <a 
              href={contactInfo.address.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-address contact-link"
            >
              {contactInfo.address.line1}<br />
              {contactInfo.address.line2}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📷</div>
            <h3 className="contact-label">Instagram</h3>
            <a 
              href={contactInfo.instagram.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              {contactInfo.instagram.handle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
