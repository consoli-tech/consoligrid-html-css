/**
 * Slider Functionality
 * Features: Auto-advance, dot navigation, touch/swipe support
 */

(function() {
    'use strict';

    // Slider configuration
    const config = {
        autoAdvanceInterval: 5000, // 5 seconds
        transitionDuration: 600     // 0.6 seconds (matches CSS)
    };

    // Get DOM elements
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Slider state
    let currentSlide = 0;
    let autoAdvanceTimer = null;
    let isTransitioning = false;

    // Touch/swipe handling
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    /**
     * Initialize the slider
     */
    function init() {
        if (!slider || slides.length === 0) {
            console.warn('Slider elements not found');
            return;
        }

        // Set initial active dot
        updateDots();

        // Add event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', handleDotClick);
        });

        // Add touch event listeners for swipe functionality
        sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        sliderContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        sliderContainer.addEventListener('touchend', handleTouchEnd);

        // Add mouse event listeners for desktop drag (optional enhancement)
        sliderContainer.addEventListener('mousedown', handleMouseDown);

        // Start auto-advance
        startAutoAdvance();

        // Pause auto-advance on hover
        sliderContainer.addEventListener('mouseenter', stopAutoAdvance);
        sliderContainer.addEventListener('mouseleave', startAutoAdvance);

        // Pause auto-advance when user interacts
        sliderContainer.addEventListener('touchstart', stopAutoAdvance);
        sliderContainer.addEventListener('touchend', () => {
            setTimeout(startAutoAdvance, 3000); // Resume after 3 seconds
        });
    }

    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    function goToSlide(index) {
        if (isTransitioning || index === currentSlide || index < 0 || index >= slides.length) {
            return;
        }

        isTransitioning = true;
        currentSlide = index;

        // Calculate transform percentage
        const translateX = -(currentSlide * 100) / slides.length;
        slider.style.transform = `translateX(${translateX}%)`;

        updateDots();

        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, config.transitionDuration);
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    /**
     * Go to previous slide
     */
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    /**
     * Update dot indicators
     */
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Handle dot click
     * @param {Event} event
     */
    function handleDotClick(event) {
        const slideIndex = parseInt(event.target.getAttribute('data-slide'), 10);
        if (!isNaN(slideIndex)) {
            goToSlide(slideIndex);
            resetAutoAdvance();
        }
    }

    /**
     * Start auto-advance timer
     */
    function startAutoAdvance() {
        stopAutoAdvance(); // Clear any existing timer
        autoAdvanceTimer = setInterval(nextSlide, config.autoAdvanceInterval);
    }

    /**
     * Stop auto-advance timer
     */
    function stopAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }

    /**
     * Reset auto-advance timer
     */
    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }

    /**
     * Handle touch start
     * @param {TouchEvent} event
     */
    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }

    /**
     * Handle touch move
     * @param {TouchEvent} event
     */
    function handleTouchMove(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
    }

    /**
     * Handle touch end - detect swipe
     * @param {TouchEvent} event
     */
    function handleTouchEnd(event) {
        handleSwipe();
    }

    /**
     * Detect and handle swipe gesture
     */
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        const minSwipeDistance = 50;

        // Only trigger if horizontal swipe is longer than vertical (to avoid conflicting with scroll)
        if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Swiped left - go to next slide
                nextSlide();
            } else {
                // Swiped right - go to previous slide
                prevSlide();
            }
            resetAutoAdvance();
        }
    }

    /**
     * Handle mouse down for desktop drag
     * @param {MouseEvent} event
     */
    function handleMouseDown(event) {
        let mouseStartX = event.clientX;
        let mouseMoved = false;

        function handleMouseMove(e) {
            mouseMoved = true;
            touchEndX = e.clientX;
        }

        function handleMouseUp(e) {
            if (mouseMoved) {
                const diff = mouseStartX - touchEndX;
                const minDragDistance = 50;

                if (Math.abs(diff) > minDragDistance) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    resetAutoAdvance();
                }
            }

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event
     */
    function handleKeyboard(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
            resetAutoAdvance();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
            resetAutoAdvance();
        }
    }

    // Add keyboard support
    document.addEventListener('keydown', handleKeyboard);

    // Initialize slider when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
