(() => {
  const loadPartials = async () => {
    const includes = Array.from(document.querySelectorAll('[data-include]'));

    await Promise.all(
      includes.map(async (placeholder) => {
        const name = placeholder.getAttribute('data-include');
        if (!name) return;

        try {
          const response = await fetch(`/site/pages/_partials/${name}.html`);
          const html = await response.text();
          const tag = placeholder.tagName;
          if (tag === 'HEAD') {
            placeholder.insertAdjacentHTML('afterbegin', html);
            placeholder.removeAttribute('data-include');
          } else {
            placeholder.outerHTML = html;
          }
        } catch (error) {
          console.error(`Failed to load partial: ${name}`, error);
        }
      })
    );
  };

  const initHeader = () => {
    const burger = document.querySelector('[data-mobile-toggle]');
    const mobileNav = document.querySelector('[data-mobile-nav]');

    if (burger && mobileNav) {
      burger.addEventListener('click', () => {
        mobileNav.classList.toggle('is-open');
      });

      mobileNav.addEventListener('click', (event) => {
        if (event.target === mobileNav) {
          mobileNav.classList.remove('is-open');
        }
      });
    }

    const navLinks = document.querySelectorAll('[data-nav]');
    const path = window.location.pathname.replace('/site/pages', '').replace('/index.html', '') || '/';

    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const cleanedHref = href.replace('/site/pages', '').replace('/index.html', '') || '/';
      if (path === cleanedHref) {
        link.classList.add('is-active');
      }
    });
  };

  const initFooter = () => {
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  loadPartials().then(() => {
    initHeader();
    initFooter();
    document.dispatchEvent(new CustomEvent('partials:loaded'));
  });
})();

