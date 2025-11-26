document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', function() {
    menu.classList.toggle('active');
  });
});
