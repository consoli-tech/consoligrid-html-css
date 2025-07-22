let currentIndex = 0;
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.slide').length;

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function moveSlide(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = totalSlides - 1;
  if (currentIndex >= totalSlides) currentIndex = 0;

  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots(currentIndex);
}

function goToSlide(index) {
  currentIndex = index;
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots(index);
}
