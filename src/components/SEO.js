import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getContactInfo } from '../utils/contact';
import { getAllProjects } from '../utils/projects';

/**
 * SEO Component for dynamic meta tags based on current route
 * Updates document title and meta tags for better SEO
 */
function SEO() {
  const location = useLocation();
  const contactInfo = getContactInfo();
  const projects = getAllProjects();

  useEffect(() => {
    const updateMetaTags = () => {
      let title = '';
      let description = '';
      let canonical = '';
      let ogImage = '/images/webpage-logo.png';

      const baseUrl = 'https://www.duemosaicarchitects.com';

      // Set meta tags based on current route
      switch (location.pathname) {
        case '/':
          title = 'Due Mosaic Architects | Innovative Architecture & Design Studio';
          description = 'High-end architecture studio delivering innovative design solutions for residential, commercial, and industrial projects. Specializing in contemporary architecture, renovations, and interior design.';
          canonical = `${baseUrl}/`;
          break;

        case '/projects':
          title = 'Our Projects | Due Mosaic Architects';
          description = 'Explore our portfolio of innovative architectural designs and completed projects. Residential, commercial, and industrial architecture projects across Luxembourg, Germany, France, and Turkey.';
          canonical = `${baseUrl}/projects`;
          break;

        case '/about':
          title = 'About Us | Due Mosaic Architects';
          description = 'Due Mosaic Architects is a high-end architecture studio delivering innovative design solutions for both small and large-scale projects. Learn about our vision and approach.';
          canonical = `${baseUrl}/about`;
          break;

        case '/contact':
          title = 'Contact Us | Due Mosaic Architects';
          description = `Contact Due Mosaic Architects. Located at ${contactInfo.address.line1}, ${contactInfo.address.line2}. Email: ${contactInfo.email} | Phone: ${contactInfo.phones[0].number}`;
          canonical = `${baseUrl}/contact`;
          break;

        default:
          // Check if it's a project detail page
          if (location.pathname.startsWith('/projects/')) {
            const projectSlug = location.pathname.replace('/projects/', '');
            const project = projects.find(p => p.slug === projectSlug);
            
            if (project) {
              title = `${project.name} | Due Mosaic Architects`;
              description = `${project.name} - ${project.propertyType} project in ${project.location}. ${project.status} in ${project.year}. Surface: ${project.surface}.`;
              canonical = `${baseUrl}/projects/${project.slug}`;
              ogImage = project.mainImage;
            } else {
              title = 'Project | Due Mosaic Architects';
              description = 'Architectural project by Due Mosaic Architects.';
              canonical = `${baseUrl}${location.pathname}`;
            }
          } else {
            title = 'Due Mosaic Architects | Innovative Architecture & Design Studio';
            description = 'High-end architecture studio delivering innovative design solutions.';
            canonical = `${baseUrl}${location.pathname}`;
          }
          break;
      }

      // Update document title
      document.title = title;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Update canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);

      // Update Open Graph tags
      const updateOGTag = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateOGTag('og:title', title);
      updateOGTag('og:description', description);
      updateOGTag('og:url', canonical);
      updateOGTag('og:image', `${baseUrl}${ogImage}`);

      // Update Twitter tags
      const updateTwitterTag = (name, content) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateTwitterTag('twitter:title', title);
      updateTwitterTag('twitter:description', description);
      updateTwitterTag('twitter:image', `${baseUrl}${ogImage}`);
    };

    updateMetaTags();
  }, [location.pathname]);

  return null; // This component doesn't render anything
}

export default SEO;

