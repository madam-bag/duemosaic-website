import projectsData from '../data/projects.json';

// Helper function to format project names from URL slugs
export const formatProjectName = (slug) => {
  // Replace underscores with spaces
  let name = slug.replace(/_/g, ' ');
  // Capitalize first letter of each word
  name = name.split(' ').map(word => {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
  return name;
};

// Get all projects
export const getAllProjects = () => {
  return projectsData;
};

// Get project by slug
export const getProjectBySlug = (slug) => {
  return projectsData.find(project => project.slug === slug);
};

// Get project by ID
export const getProjectById = (id) => {
  return projectsData.find(project => project.id === id);
};

export default projectsData;

