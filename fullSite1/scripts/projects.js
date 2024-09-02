document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more');
    const projectDialog = document.getElementById('project-dialog');
    const dialogTitle = document.getElementById('dialog-title');
    const dialogContent = document.getElementById('dialog-content');
    const closeBtn = document.querySelector('.close');

    let currentPage = 1;
    const projectsPerPage = 6;

    const projects = [
        { title: 'Project 1', description: 'Description for Project 1' },
        { title: 'Project 2', description: 'Description for Project 2' },
        { title: 'Project 3', description: 'Description for Project 3' },
        { title: 'Project 4', description: 'Description for Project 4' },
        { title: 'Project 5', description: 'Description for Project 5' },
        { title: 'Project 6', description: 'Description for Project 6' },
        { title: 'Project 7', description: 'Description for Project 7' },
        { title: 'Project 8', description: 'Description for Project 8' },
    ];

    function displayProjects(page) {
        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        const pageProjects = projects.slice(start, end);

        pageProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="btn view-project">View Project</button>
            `;
            projectsContainer.appendChild(projectElement);

            projectElement.querySelector('.view-project').addEventListener('click', () => {
                openProjectDialog(project);
            });
        });

        if (end >= projects.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    function openProjectDialog(project) {
        dialogTitle.textContent = project.title;
        dialogContent.textContent = project.description;
        projectDialog.style.display = 'block';
    }

    closeBtn.addEventListener('click', () => {
        projectDialog.style.display = 'none';
    });

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        displayProjects(currentPage);
    });

    displayProjects(currentPage);
});