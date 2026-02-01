import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { getContactInfo } from '../utils/contact';
import { getAllProjects } from '../utils/projects';

/**
 * SEO Component for dynamic meta tags based on current route and language
 * Updates document title, meta tags, and hreflang tags for multilingual SEO
 */
function SEO() {
  const location = useLocation();
  const { language, currentLanguage } = useLanguage();
  const contactInfo = getContactInfo();
  const projects = getAllProjects();

  useEffect(() => {
    const updateMetaTags = () => {
      const baseUrl = 'https://duemosaic-architects.com';
      const t = translations[language] || translations.en;
      let title = '';
      let description = '';
      let canonical = '';
      let ogImage = '/images/webpage-logo.png';

      // Set meta tags based on current route
      switch (location.pathname) {
        case '/':
          title = t.seo.home.title;
          description = t.seo.home.description;
          canonical = `${baseUrl}/`;
          break;

        case '/projects':
          title = t.seo.projects.title;
          description = t.seo.projects.description;
          canonical = `${baseUrl}/projects`;
          break;

        case '/about':
          title = t.seo.about.title;
          description = t.seo.about.description;
          canonical = `${baseUrl}/about`;
          break;

        case '/contact':
          title = t.seo.contact.title;
          description = t.seo.contact.description;
          canonical = `${baseUrl}/contact`;
          break;

        default:
          // Check if it's a project detail page
          if (location.pathname.startsWith('/projects/')) {
            const projectSlug = location.pathname.replace('/projects/', '');
            const project = projects.find(p => p.slug === projectSlug);
            
            if (project) {
              // Multilingual project titles
              const projectTitles = {
                en: `${project.name} | Due Mosaic Architects`,
                fr: `${project.name} | Due Mosaic Architects`,
                de: `${project.name} | Due Mosaic Architects`,
                lb: `${project.name} | Due Mosaic Architects`
              };
              const projectDescriptions = {
                en: `${project.name} - ${project.propertyType} project in ${project.location}. ${project.status} in ${project.year}. Surface: ${project.surface}.`,
                fr: `${project.name} - Projet ${project.propertyType} à ${project.location}. ${project.status} en ${project.year}. Surface: ${project.surface}.`,
                de: `${project.name} - ${project.propertyType}-Projekt in ${project.location}. ${project.status} im Jahr ${project.year}. Fläche: ${project.surface}.`,
                lb: `${project.name} - ${project.propertyType} Projet zu ${project.location}. ${project.status} am Joer ${project.year}. Fläch: ${project.surface}.`
              };
              title = projectTitles[language] || projectTitles.en;
              description = projectDescriptions[language] || projectDescriptions.en;
              canonical = `${baseUrl}/projects/${project.slug}`;
              ogImage = project.mainImage;
            } else {
              title = t.seo.projects.title;
              description = t.seo.projects.description;
              canonical = `${baseUrl}${location.pathname}`;
            }
          } else {
            title = t.seo.home.title;
            description = t.seo.home.description;
            canonical = `${baseUrl}${location.pathname}`;
          }
          break;
      }

      // Update document title
      document.title = title;

      // Update HTML lang attribute
      document.documentElement.lang = language;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Update meta language
      let metaLanguage = document.querySelector('meta[http-equiv="content-language"]');
      if (!metaLanguage) {
        metaLanguage = document.createElement('meta');
        metaLanguage.setAttribute('http-equiv', 'content-language');
        document.head.appendChild(metaLanguage);
      }
      metaLanguage.setAttribute('content', language);

      // Update canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);

      // Update or create hreflang tags for multilingual SEO
      const languages = ['en', 'fr', 'de', 'lb'];
      languages.forEach(lang => {
        let hreflangLink = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!hreflangLink) {
          hreflangLink = document.createElement('link');
          hreflangLink.setAttribute('rel', 'alternate');
          hreflangLink.setAttribute('hreflang', lang);
          document.head.appendChild(hreflangLink);
        }
        hreflangLink.setAttribute('href', `${baseUrl}${location.pathname}`);
      });

      // Add x-default hreflang (points to English as default)
      let defaultHreflang = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
      if (!defaultHreflang) {
        defaultHreflang = document.createElement('link');
        defaultHreflang.setAttribute('rel', 'alternate');
        defaultHreflang.setAttribute('hreflang', 'x-default');
        document.head.appendChild(defaultHreflang);
      }
      defaultHreflang.setAttribute('href', `${baseUrl}${location.pathname}`);

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
      updateOGTag('og:locale', currentLanguage.locale);
      
      // Add alternate locales for Open Graph
      const locales = {
        en: 'en_US',
        fr: 'fr_FR',
        de: 'de_DE',
        lb: 'lb_LU'
      };
      languages.forEach(lang => {
        if (lang !== language) {
          const altLocale = `og:locale:alternate`;
          let altTag = document.querySelector(`meta[property="${altLocale}"][data-lang="${lang}"]`);
          if (!altTag) {
            altTag = document.createElement('meta');
            altTag.setAttribute('property', altLocale);
            altTag.setAttribute('data-lang', lang);
            document.head.appendChild(altTag);
          }
          altTag.setAttribute('content', locales[lang]);
        }
      });

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

      // Update structured data (JSON-LD) for multilingual support
      let structuredDataScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        structuredDataScript.setAttribute('data-dynamic', 'true');
        document.head.appendChild(structuredDataScript);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "ArchitecturalService",
        "name": "Due Mosaic Architects",
        "description": description,
        "url": baseUrl,
        "logo": `${baseUrl}/images/webpage-logo.png`,
        "image": `${baseUrl}${ogImage}`,
        "telephone": contactInfo.phones[0].number,
        "email": contactInfo.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": contactInfo.address.line1,
          "addressLocality": "Luxembourg",
          "postalCode": "L-1611",
          "addressCountry": "LU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "49.6116",
          "longitude": "6.1319"
        },
        "sameAs": [
          contactInfo.instagram.url
        ],
        "areaServed": [
          {
            "@type": "Country",
            "name": "Luxembourg"
          },
          {
            "@type": "Country",
            "name": "Germany"
          },
          {
            "@type": "Country",
            "name": "France"
          },
          {
            "@type": "Country",
            "name": "Turkey"
          }
        ],
        "serviceType": [
          "Residential Architecture",
          "Commercial Architecture",
          "Interior Design",
          "Renovation",
          "Restoration",
          "Urban Planning"
        ],
        "inLanguage": language
      };

      structuredDataScript.textContent = JSON.stringify(structuredData);
    };

    updateMetaTags();
  }, [location.pathname, language, currentLanguage, contactInfo, projects]);

  return null; // This component doesn't render anything
}

export default SEO;

