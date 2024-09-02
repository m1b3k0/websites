document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form submitted:', { name, email, message });

        contactForm.reset();

        alert('Message sent successfully!');
    });
});