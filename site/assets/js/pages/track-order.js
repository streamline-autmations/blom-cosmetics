document.addEventListener('partials:loaded', () => {
  const form = document.querySelector('[data-track-form]');
  const statusCard = document.querySelector('[data-track-status]');
  const stateEl = document.querySelector('[data-track-state]');
  const messageEl = document.querySelector('[data-track-message]');

  if (!form || !statusCard || !stateEl || !messageEl) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const orderNumber = formData.get('order-number');
    const email = formData.get('order-email');

    stateEl.textContent = 'Preparing';
    messageEl.textContent = `We’re processing order ${orderNumber} for ${email}. You’ll be notified once it ships.`;
    statusCard.hidden = false;
  });
});

