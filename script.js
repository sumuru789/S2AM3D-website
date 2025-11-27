// S²AM3D Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Lazy load videos when they come into view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                }
                videoObserver.unobserve(video);
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.demo-item video').forEach(video => {
        videoObserver.observe(video);
    });

    // Scale Demo Interaction
    initScaleDemo();
});

// Scale Demo - Object and Scale switching
function initScaleDemo() {
    const modelViewer = document.getElementById('scale-demo-model');
    const objButtons = document.querySelectorAll('.obj-btn');
    const scaleButtons = document.querySelectorAll('.scale-btn');
    
    if (!modelViewer) return;
    
    let currentObj = 1;
    let currentScale = 'color';
    
    // Update model source
    function updateModel() {
        const src = `data/scale_demo/obj${currentObj}_${currentScale}.glb?v=${Date.now()}`;
        modelViewer.setAttribute('src', src);
    }
    
    // Object button click handlers
    objButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            objButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current object
            currentObj = this.dataset.obj;
            updateModel();
        });
    });
    
    // Scale button click handlers
    scaleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            scaleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current scale
            currentScale = this.dataset.scale;
            updateModel();
        });
    });
}
