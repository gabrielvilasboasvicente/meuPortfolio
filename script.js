// ===== Header Scroll Effect =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const mobileBtn = document.getElementById('mobile-menu-btn');
const nav = document.querySelector('.nav');
mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    nav.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        nav.classList.remove('open');
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}
window.addEventListener('scroll', updateActiveNav);

// ===== Tabs System =====
function initTabs(container) {
    const buttons = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = container.querySelector(`#content-${tabId}`);
            if (target) target.classList.add('active');
        });
    });
}

document.querySelectorAll('.tabs-container').forEach(initTabs);

// External tab switch (for footer links)
window.switchTab = function (tabId) {
    const container = document.getElementById('project-tabs');
    if (!container) return;
    const btn = container.querySelector(`[data-tab="${tabId}"]`);
    if (btn) btn.click();
};

// ===== Scroll Reveal =====
function initReveal() {
    const elements = document.querySelectorAll('.glass-card, .about-photo-wrapper, .project-showcase, .section-header');
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
initReveal();

// ===== Hero Particles =====
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute; border-radius: 50%;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? 'rgba(243,112,33,0.2)' : 'rgba(243,112,33,0.1)'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 8 + 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
            25% { transform: translate(${Math.random() * 40 - 20}px, -30px) scale(1.2); opacity: 0.7; }
            50% { transform: translate(${Math.random() * 60 - 30}px, -50px) scale(0.8); opacity: 0.3; }
            75% { transform: translate(${Math.random() * 40 - 20}px, -20px) scale(1.1); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
}
createParticles();

// ===== Report Accordion =====
function toggleReport(toggleEl) {
    const card = toggleEl.closest('.report-card');
    card.classList.toggle('open');
}
