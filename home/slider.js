const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderItemWidth = sliderItems[0].offsetWidth + 1; // Lấy kích thước mỗi phần tử và margin-right

let currentPosition = 0;

const moveSlider = () => {
  const maxPosition = 0;
  const minPosition = -(sliderItems.length - 1) * sliderItemWidth;
  if (currentPosition > maxPosition) {
    currentPosition = maxPosition;
  }
  if (currentPosition < minPosition) {
    currentPosition = minPosition;
  }
  slider.style.transform = `translateX(${currentPosition}px)`;
};

prevButton.addEventListener('click', () => {
  currentPosition += sliderItemWidth;
  moveSlider();
});

nextButton.addEventListener('click', () => {
  currentPosition -= sliderItemWidth;
  moveSlider();

  // Kiểm tra nếu đạt đến phần tử cuối cùng
  if (currentPosition <= -(sliderItems.length - 6) * sliderItemWidth) {
    currentPosition = -(sliderItems.length -6.4 ) * sliderItemWidth;
  }
});