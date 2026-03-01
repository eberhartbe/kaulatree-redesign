// =============================================
// FORM ANTI-SPAM PROTECTION
// 1. Timing check — rejects submissions under 3 seconds
// 2. JS token — hidden field only populated by real browsers
// 3. Honeypot — hidden field that bots fill out (Formspree _gotcha)
// =============================================

(function () {
  var loadTime = Date.now();
  var MIN_SUBMIT_MS = 3000; // 3 seconds minimum

  // Generate a simple token proving JS executed
  var token = 'kt-' + Math.random().toString(36).slice(2) + '-' + loadTime;

  function init() {
    // Populate all token fields (newsletter forms)
    var tokenFields = document.querySelectorAll('.kt-token');
    tokenFields.forEach(function (field) {
      field.value = token;
    });

    // Attach timing check to newsletter forms
    var newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var elapsed = Date.now() - loadTime;

        if (elapsed < MIN_SUBMIT_MS) {
          e.preventDefault();
          alert('Please wait a moment before submitting.');
          return false;
        }

        var tokenInput = form.querySelector('.kt-token');
        if (!tokenInput || !tokenInput.value) {
          e.preventDefault();
          return false;
        }
      });
    });

    // Attach timing check to contact form
    var contactForms = document.querySelectorAll('.contact-form-submit');
    contactForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var elapsed = Date.now() - loadTime;

        // Too fast — likely a bot
        if (elapsed < MIN_SUBMIT_MS) {
          e.preventDefault();
          alert('Please wait a moment before submitting.');
          return false;
        }

        // Check honeypot — if filled, silently block
        var honeypot = form.querySelector('[name="_gotcha"]');
        if (honeypot && honeypot.value) {
          e.preventDefault();
          return false;
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
