// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Project Details Switching
const projectLinks = document.querySelectorAll('.project-links a');
const projectDetails = document.getElementById('project-details');

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const project = link.getAttribute('href').substring(1);
        loadProjectDetails(project);
    });
});

function loadProjectDetails(project) {
    let content = '';

    switch (project) {
        case 'code':
            content = '<h2>Code Projects</h2><p>Details about your coding projects.</p>';
            break;
        case 'artwork':
            content = '<h2>Artwork</h2><p>Details about your artwork.</p>';
            break;
        case 'design':
            content = '<h2>Design Projects</h2><p>Details about your design projects.</p>';
            break;
        case 'electro':
            content = '<h2>Electronics Projects</h2><p>Details about your electronics projects.</p>';
            break;
        default:
            content = '<p>Select a project category to view details.</p>';
    }

    projectDetails.innerHTML = content;
}
