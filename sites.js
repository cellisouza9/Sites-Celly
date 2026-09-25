document.addEventListener('DOMContentLoaded', function () {

    // ---- MENU MOBILE (HAMBURGER) ----
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    // ---- REVEAL AO ROLAR A PÁGINA ----
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ---- FORMULÁRIO DE CONTATO (FormSubmit) ----
    const form = document.getElementById('sitesLeadForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('.btn-sites-form');
            const textoOriginal = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            fetch('https://formsubmit.co/ajax/cellisistemas@gmail.com', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            })
                .then(function (res) { return res.json(); })
                .then(function () {
                    btn.textContent = 'Enviado! Vamos te chamar no WhatsApp ✓';
                    form.reset();
                    setTimeout(function () {
                        btn.textContent = textoOriginal;
                        btn.disabled = false;
                    }, 4000);
                })
                .catch(function () {
                    btn.textContent = 'Erro. Tenta de novo?';
                    btn.disabled = false;
                });
        });
    }
});
