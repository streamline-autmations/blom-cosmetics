document.addEventListener('partials:loaded', () => {
  const form = document.querySelector('[data-account-form]');
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Account portal coming soon. For access email shopblomcosmetics@gmail.com');
    form.reset();
  });
});

