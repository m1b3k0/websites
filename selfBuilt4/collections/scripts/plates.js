document.addEventListener('DOMContentLoaded', () => {
    const dynamicTitle = document.querySelector('.dynamic-title');
    const dynamicText = document.querySelector('.dynamic-text');
    const plateImage = document.querySelector('.plate-image');
    const plateTitle = document.querySelector('.plate-title');
    const plateDescription = document.querySelector('.plate-text');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    const heroContent = [
        { title: "The Art of Tableware", text: "Discover the beauty in every handcrafted plate." },
        { title: "Elegance in Every Detail", text: "Timeless design meets artisanal craftsmanship." },
        { title: "A Feast for the Eyes", text: "Elevate your dining experience with our exquisite collection." }
    ];

    const plateCollection = [
        {
            image: "https://placehold.co/670x400",
            title: "The Artisan Stoneware Plate",
            description: "Crafted from rich, earthy clay, the Artisan Stoneware Plate is a testament to nature's raw beauty. Each plate starts as a humble mound of stoneware clay, hand-thrown by skilled potters who breathe life into its form. After shaping, it is left to air-dry slowly, preserving the natural textures. Once dry, the plate is glazed with soft, muted tones that reflect the serene landscapes of rolling hills and calm seas. Fired at high temperatures, the glaze reveals a gentle sheen, giving the plate an understated elegance perfect for casual or formal dining.\n\nThe process is not rushed; every step is a labor of love. The plate is fired multiple times to ensure durability while maintaining a handmade feel. Each Artisan Stoneware Plate is unique, with slight variations that celebrate the imperfections of nature and the human hand. The glazing process, often layered, brings out subtle variations in color, adding depth to the plate's design. Perfect for hosting intimate dinners or family gatherings, it brings warmth and authenticity to every meal."
        },
        {
            image: "https://placehold.co/670x400",
            title: "The Vintage Floral Plate",
            description: "Inspired by classical motifs, the Vintage Floral Plate draws from centuries-old artistry while blending modern craftsmanship techniques. Beginning with a fine porcelain base, the design is first etched by hand, mapping out delicate floral patterns reminiscent of antique tableware. After the initial sketching, artisans painstakingly apply layers of vibrant color using natural pigments that evoke the beauty of spring gardens.\n\nOnce the intricate detailing is complete, the plate is coated in a transparent glaze that preserves the floral design while offering a smooth, glossy surface. It is then fired in a kiln at high temperatures, which locks in the patterns, ensuring the colors remain vivid even with daily use. Every plate is a canvas of heritage, paying homage to time-honored traditions. The final touch is a subtle gold rim, hand-applied by master decorators, adding a luxurious finish to an already elegant piece."
        },
        {
            image: "https://placehold.co/670x400",
            title: "The Modern Minimalist Plate",
            description: "Clean lines and simplicity define the Modern Minimalist Plate, designed for those who appreciate understated elegance. The process begins with the finest white porcelain, chosen for its smooth texture and durability. Each plate is molded with precision to ensure a perfectly round, flawless form. What sets this plate apart is its unadorned surface—no patterns, just pure porcelain. This minimalism is achieved by using a single matte glaze, applied evenly across the entire surface, giving the plate a soft, velvety finish that's both contemporary and timeless.\n\nFired at an exceptionally high temperature, the Modern Minimalist Plate undergoes a double-firing process, ensuring both strength and refinement. This plate speaks to the philosophy that less is more, where the absence of ornamentation highlights the craftsmanship behind its creation. It's versatile enough for everyday meals yet sophisticated enough for special occasions, blending seamlessly with any table setting or décor style."
        }
    ];

    let currentHeroIndex = 0;
    let currentPlateIndex = 0;

    function updateHeroContent() {
        dynamicTitle.style.opacity = 0;
        dynamicText.style.opacity = 0;
        dynamicTitle.style.transform = 'translateY(-20px)';
        dynamicText.style.transform = 'translateY(20px)';

        setTimeout(() => {
            dynamicTitle.textContent = heroContent[currentHeroIndex].title;
            dynamicText.textContent = heroContent[currentHeroIndex].text;
            dynamicTitle.style.opacity = 1;
            dynamicText.style.opacity = 1;
            dynamicTitle.style.transform = 'translateY(0)';
            dynamicText.style.transform = 'translateY(0)';

            currentHeroIndex = (currentHeroIndex + 1) % heroContent.length;
        }, 500);
    }

    function updatePlateContent(direction) {
        plateImage.style.opacity = 0;
        plateImage.style.transform = `translateX(${direction === 'right' ? '-' : ''}50px)`;
        plateTitle.style.opacity = 0;
        plateDescription.style.opacity = 0;

        setTimeout(() => {
            plateImage.src = plateCollection[currentPlateIndex].image;
            plateTitle.textContent = plateCollection[currentPlateIndex].title;
            plateDescription.textContent = plateCollection[currentPlateIndex].description;

            plateImage.style.opacity = 1;
            plateImage.style.transform = 'translateX(0)';
            plateTitle.style.opacity = 1;
            plateDescription.style.opacity = 1;
        }, 300);
    }

    setInterval(updateHeroContent, 5000);
    updateHeroContent();

    leftArrow.addEventListener('click', () => {
        currentPlateIndex = (currentPlateIndex - 1 + plateCollection.length) % plateCollection.length;
        updatePlateContent('left');
    });

    rightArrow.addEventListener('click', () => {
        currentPlateIndex = (currentPlateIndex + 1) % plateCollection.length;
        updatePlateContent('right');
    });

    updatePlateContent('right');

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});