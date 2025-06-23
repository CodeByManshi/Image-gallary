document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryData = [
        { src: 'https://www.stockvault.net/data/2016/05/13/197571/preview16.jpg', category: 'nature', caption: 'flying butterflies' },
        { src: 'https://cdn.pixabay.com/photo/2020/04/20/17/37/nature-5069200_1280.jpg', category: 'nature', caption: 'Majestic Mountain View' },
        { src: 'https://www.visit.alsace/wp-content/uploads/lei/pictures/277002259-sylvotherapy-discovering-the-benefits-of-trees-and-the-energy-of-nature-1-1600x900.jpg', category: 'nature', caption: 'Save Trees' },
        { src: 'https://images.pexels.com/photos/697259/pexels-photo-697259.jpeg?cs=srgb&dl=pexels-hieu-697259.jpg&fm=jpg', category: 'flowers', caption: 'Fresh Roses' },
        { src: 'https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg', category: 'flowers', caption: 'Beautiful Sunflowers' },
        { src: 'https://www.marthastewart.com/thmb/qq94YZhTQ4zz7jwRbkn4OfUb4Tc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/blooming-azalea-plant-getty-1221-2000-65bfc3a5812c4286a2c22aeeddd491f6.jpg', category: 'flowers', caption: 'Pink Flowers' },
        { src: 'https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg', category: 'architecture', caption: 'Beautiful Home' },
        { src: 'https://thearchitectsdiary.com/wp-content/uploads/2024/05/interior-design-concept-5-jpg.webp', category: 'architecture', caption: 'Interior View Of Home' },
        { src: 'https://www.cityrometours.com//upload/CONF93/20230912/rialto-bridge-auto-728X430-zoom.jpg', category: 'architecture', caption: 'Iconic Bridge' },
        { src: 'https://img.freepik.com/premium-photo/cheerful-indian-asian-young-group-college-students-friends-laughing-together-while-sitting-standing-walking-campus_466689-7718.jpg', category: 'people', caption: 'Friends Group' },
        { src: 'https://miro.medium.com/v2/resize:fit:470/1*Rq_rgh9w9RAiPt97SHWcEg.jpeg', category: 'people', caption: 'Happy Family Moment' },
        { src: 'https://images.stockcake.com/public/6/b/9/6b9d7212-d740-47ef-b51e-89599cfb654e_large/elegant-dance-performance-stockcake.jpg', category: 'people', caption: 'Elegant Dance Performance' }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const imageCaption = document.getElementById('image-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize gallery
    function initGallery() {
        galleryGrid.innerHTML = '';
        filteredImages = galleryData;
        
        galleryData.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" class="gallery-img">
                <div class="image-caption">${image.caption}</div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter gallery items
    function filterGallery(category) {
        if (category === 'all') {
            filteredImages = galleryData;
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = 'block';
            });
        } else {
            filteredImages = galleryData.filter(image => image.category === category);
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Update lightbox content
    function updateLightbox() {
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.src;
        imageCaption.textContent = image.caption;
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterGallery(button.dataset.filter);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Initialize the gallery
    initGallery();
});