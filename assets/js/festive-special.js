const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
}
toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.classList.toggle('active', expanded);
    menu.classList.toggle('active', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
    }
});

const brochureLink = document.querySelector('.special-brochure-open');
const brochureDialog = document.getElementById('brochureDialog');
if (brochureLink && brochureDialog && typeof brochureDialog.showModal === 'function') {
    brochureLink.addEventListener('click', event => {
        event.preventDefault();
        brochureDialog.showModal();
    });
    brochureDialog.querySelector('.brochure-close').addEventListener('click', () => brochureDialog.close());
    brochureDialog.addEventListener('click', event => {
        if (event.target !== brochureDialog) return;
        const rect = brochureDialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) brochureDialog.close();
    });
    brochureDialog.addEventListener('close', () => brochureLink.focus());
}
