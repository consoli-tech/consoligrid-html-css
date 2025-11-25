// Mobile Menu Toggle Functionality
(function() {
  'use strict';

  function init() {
    const hamburger = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (!hamburger || !menu) {
      return;
    }

    // Toggle menu function
    function toggleMenu() {
      const isActive = menu.classList.contains('active');

      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Open menu function
    function openMenu() {
      hamburger.classList.add('active');
      menu.classList.add('active');
      if (overlay) {
        overlay.classList.add('active');
      }
      body.classList.add('menu-open');
    }

    // Close menu function
    function closeMenu() {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      if (overlay) {
        overlay.classList.remove('active');
      }
      body.classList.remove('menu-open');
    }

    // Hamburger button click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Overlay click to close menu
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a nav item
    const navItems = document.querySelectorAll('.nav-item a, .nav-item-last a');
    navItems.forEach(function(item) {
      item.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
