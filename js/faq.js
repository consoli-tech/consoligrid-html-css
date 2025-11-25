/**
 * FAQ Accordion Functionality
 * Features: Click to toggle, icon swap, only one open at a time
 */

(function() {
    'use strict';

    /**
     * Initialize the FAQ accordion
     */
    function init() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (faqItems.length === 0) {
            console.warn('No FAQ items found');
            return;
        }

        // Add click listeners to all FAQ questions
        faqItems.forEach(item => {
            const questionElement = item.querySelector('.faq-question');

            if (questionElement) {
                questionElement.addEventListener('click', () => handleFaqClick(item));

                // Add cursor pointer style
                questionElement.style.cursor = 'pointer';
            }
        });
    }

    /**
     * Handle FAQ item click
     * @param {HTMLElement} clickedItem - The FAQ item that was clicked
     */
    function handleFaqClick(clickedItem) {
        const allFaqItems = document.querySelectorAll('.faq-item');
        const isCurrentlyOpen = clickedItem.classList.contains('faq-open-question');

        // Close all FAQ items first
        allFaqItems.forEach(item => {
            if (item !== clickedItem) {
                closeFaqItem(item);
            }
        });

        // Toggle the clicked item
        if (isCurrentlyOpen) {
            closeFaqItem(clickedItem);
        } else {
            openFaqItem(clickedItem);
        }
    }

    /**
     * Open an FAQ item
     * @param {HTMLElement} item - The FAQ item to open
     */
    function openFaqItem(item) {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        // Update classes
        item.classList.remove('faq-closed-question');
        item.classList.add('faq-open-question');

        // Show answer
        if (answer) {
            answer.style.display = 'block';
        }

        // Change icon to minus
        if (icon) {
            icon.src = 'img/minus.svg';
            icon.alt = 'Collapse FAQ';
        }
    }

    /**
     * Close an FAQ item
     * @param {HTMLElement} item - The FAQ item to close
     */
    function closeFaqItem(item) {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        // Update classes
        item.classList.remove('faq-open-question');
        item.classList.add('faq-closed-question');

        // Hide answer
        if (answer) {
            answer.style.display = 'none';
        }

        // Change icon to plus
        if (icon) {
            icon.src = 'img/plus.svg';
            icon.alt = 'Expand FAQ';
        }
    }

    // Initialize FAQ accordion when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
