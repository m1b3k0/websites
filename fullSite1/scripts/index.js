document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress;
    });

    // Animate timeline
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.querySelector('.tooltip').style.opacity = '1';
        });
        dot.addEventListener('mouseleave', () => {
            dot.querySelector('.tooltip').style.opacity = '0';
        });
    });
});