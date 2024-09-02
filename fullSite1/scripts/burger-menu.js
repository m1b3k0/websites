document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContent = document.querySelector('.menu-content');
    const menuBackground = document.querySelector('.menu-background');
    const projectsLink = document.getElementById('projects');
    const submenu = document.querySelector('.submenu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuContent.classList.toggle('active');
        menuBackground.classList.toggle('active');
    });

    projectsLink.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('active');
    });

    const menuItems = document.querySelectorAll('.menu-item, .submenu-item');
    menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1 + 0.3}s`;
    });

    // Close submenu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.submenu') && !e.target.matches('#projects')) {
            submenu.classList.remove('active');
        }
    });

    // Add hover effect to menu toggle
    menuToggle.addEventListener('mouseenter', () => {
        menuToggle.style.transform = 'scale(1.1)';
    });

    menuToggle.addEventListener('mouseleave', () => {
        menuToggle.style.transform = 'scale(1)';
    });
});