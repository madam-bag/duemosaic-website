import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { getThumbnailPath } from '../utils/imageUtils';
import './Projects.css';

function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="page-title">Our Projects</h1>
        </div>
        <div className="projects-grid">
          {projectsData.map((project) => {
            const thumbnailPath = getThumbnailPath(project.mainImage);
            return (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="project-card"
              >
                <div className="project-image-wrapper">
                  <img
                    src={thumbnailPath}
                    alt={project.name}
                    className="project-image"
                    onError={(e) => {
                      // Fallback to full-size image if thumbnail doesn't exist
                      if (e.target.src !== project.mainImage) {
                        e.target.src = project.mainImage;
                      } else {
                        console.error(`Failed to load image: ${thumbnailPath}`);
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                  <div className="project-ribbon">
                    <span className="project-title">{project.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;
