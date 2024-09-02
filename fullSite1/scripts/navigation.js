document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContent = document.querySelector('.menu-content');
    const menuBackground = document.querySelector('.menu-background');
    const mobileProjectsLink = document.getElementById('mobile-projects');
    const desktopProjectsLink = document.getElementById('desktop-projects');
    const mobileSubmenu = document.querySelector('.menu-content .submenu');
    const desktopSubmenu = document.querySelector('.desktop-menu .submenu');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menuContent.classList.toggle('active');
            menuBackground.classList.toggle('active');
        });
    }

    // Toggle mobile submenu
    if (mobileProjectsLink) {
        mobileProjectsLink.addEventListener('click', (e) => {
            e.preventDefault();
            mobileProjectsLink.classList.toggle('active');
            mobileSubmenu.classList.toggle('active');
        });
    }

    // Desktop submenu hover
    if (desktopProjectsLink) {
        const desktopProjectsParent = desktopProjectsLink.closest('.has-submenu');
        desktopProjectsParent.addEventListener('mouseenter', () => {
            desktopSubmenu.style.display = 'block';
        });
        desktopProjectsParent.addEventListener('mouseleave', () => {
            desktopSubmenu.style.display = 'none';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuContent.contains(e.target) && !menuToggle.contains(e.target)) {
            menuContent.classList.remove('active');
            menuToggle.classList.remove('active');
            menuBackground.classList.remove('active');
        }
    });

    // Close mobile submenu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.submenu') && !e.target.matches('#mobile-projects')) {
            if (mobileSubmenu) mobileSubmenu.classList.remove('active');
            if (mobileProjectsLink) mobileProjectsLink.classList.remove('active');
        }
    });

    // Add hover effect to menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('mouseenter', () => {
            menuToggle.style.transform = 'scale(1.1)';
        });

        menuToggle.addEventListener('mouseleave', () => {
            menuToggle.style.transform = 'scale(1)';
        });
    }
});