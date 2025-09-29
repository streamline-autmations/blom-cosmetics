(function () {
  const modal = document.querySelector('[data-policy-modal]');
  if (!modal) {
    return;
  }

  const openButton = document.querySelector('[data-policy-open]');
  const closeButton = document.querySelector('[data-policy-close]');

  const open = () => modal.classList.add('is-open');
  const close = () => modal.classList.remove('is-open');

  if (openButton) {
    openButton.addEventListener('click', open);
  }

  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      close();
    }
  });
})();

