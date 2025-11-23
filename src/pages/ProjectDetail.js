import React from 'react';
import { useParams } from 'react-router-dom';
import { getProjectBySlug } from '../utils/projects';
import ImageGallery from '../components/ImageGallery';
import './ProjectDetail.css';

function ProjectDetail() {
  const { projectName } = useParams();
  const project = getProjectBySlug(projectName);

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="project-detail-container">
          <div className="project-detail-header">
            <h1 className="project-detail-title">Project Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  const projectInfo = [
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
    { label: 'Surface', value: project.surface },
    { label: 'Client', value: project.client },
    { label: 'Status', value: project.status },
    { label: 'Property Type', value: project.propertyType }
  ];

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        <div className="project-detail-header">
          <h1 className="project-detail-title">{project.name}</h1>
        </div>
        <ImageGallery images={project.images} />
        
        <div className="project-info-section">
          <div className="project-info-container">
            <div className="project-info-grid">
              {projectInfo.map((info, index) => (
                <div key={index} className="project-info-item">
                  <div className="project-info-label">{info.label}</div>
                  <div className="project-info-value">{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
