document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    clearError(name);
    clearError(email);
    clearError(message);

    if (!name.value.trim()) {
      showError(name, 'name-error');
      valid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, 'email-error');
      valid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'message-error');
      valid = false;
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '¡Enviado!';
      btn.disabled = true;
      btn.style.background = 'var(--success)';
      btn.style.color = 'var(--bg)';
      form.reset();

      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    }
  });

  form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
});

function showError(input, errorId) {
  input.classList.add('error');
  document.getElementById(errorId).classList.add('visible');
}

function clearError(input) {
  input.classList.remove('error');
  const errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) errorEl.classList.remove('visible');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
