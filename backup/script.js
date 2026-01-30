lucide.createIcons();

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

function togglePricing(period) {
    const monthlyBtn = document.getElementById('monthly-btn');
    const yearlyBtn = document.getElementById('yearly-btn');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    
    if (period === 'monthly') {
        monthlyBtn.classList.add('active');
        yearlyBtn.classList.remove('active');
        monthlyPrices.forEach(el => el.classList.remove('hidden'));
        yearlyPrices.forEach(el => el.classList.add('hidden'));
    } else {
        yearlyBtn.classList.add('active');
        monthlyBtn.classList.remove('active');
        yearlyPrices.forEach(el => el.classList.remove('hidden'));
        monthlyPrices.forEach(el => el.classList.add('hidden'));
    }
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
        navbar.classList.add('bg-drip-bg/80');
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.classList.remove('bg-drip-bg/80');
    }
    
    lastScroll = currentScroll;
});

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });
    
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animate();
