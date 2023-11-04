// Home
//Tạomộtmảng chứa thông tin về các phim
var carouselIndicators = document.querySelector(".carousel-indicators");
var carouselInner = document.querySelector(".carousel-inner");
var apiURL = "https://65180651582f58d62d355368.mockapi.io/Movies"
let datas = [];
fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    datas = data;
    console.log(datas)
    data.forEach(function (movie, index) {
      var indicatorButton = document.createElement("button");
      indicatorButton.category = "button";
      indicatorButton.dataset.bsTarget = "#carouselExampleIndicators";
      indicatorButton.dataset.bsSlideTo = index;
      indicatorButton.setAttribute("aria-label", "Slide " + (index + 1));

      if (index === 0) {
        indicatorButton.classList.add("active");
        indicatorButton.setAttribute("aria-current", "true");
      }

      carouselIndicators.appendChild(indicatorButton);

      var carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      if (index === 0) {
        carouselItem.classList.add("active");
      }

      var image = document.createElement("img");
      image.classList.add("d-block", "w-100", "img");
      image.src = movie.src;
      image.alt = movie.alt;

      var caption = document.createElement("div");
      caption.classList.add("carousel-caption");

      var title = document.createElement("h5");
      title.textContent = movie.title;

      var subtitle = document.createElement("p");
      subtitle.textContent = movie.caption;

      var watchLink = document.createElement("a");
      watchLink.classList.add("btn", "btn-primary");
      watchLink.href = movie.watchLink; // Gắn liên kết xem phim
      var icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-play", "icon");
      var watchText = document.createTextNode("Xem ngay"); // Nội dung nút "Xem ngay"
      watchLink.appendChild(watchText);
      watchLink.insertBefore(icon, watchLink.firstChild);

      caption.appendChild(title);
      caption.appendChild(subtitle);
      caption.appendChild(watchLink); // Thêm nút "Xem ngay" vào caption

      carouselItem.appendChild(image);
      carouselItem.appendChild(caption);

      carouselInner.appendChild(carouselItem);
    })
    data.forEach(function (movie) {
      if (movie.category === 'Phim bộ') {
        var movieMemory = `
        <div class="card" id="Series" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
        document.getElementById('series').innerHTML += movieMemory
      }
      else if (movie.category === 'âm nhạc') {
        var movieMemory = `
        <div class="card" id="Music" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('music').innerHTML += movieMemory
      }
      else if (movie.category === 'anime') {
        var movieMemory = `
        <div class="card" id="Anime" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('anime').innerHTML += movieMemory
      }
      else if (movie.category === 'thể thao') {
        var movieMemory = `
        <div class="card" id="Sport" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('sport').innerHTML += movieMemory
      }
      else if (movie.category === 'Phim chiếu rạp') {
        var movieMemory = `
        <div class="card" id="Theaters" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('theaters').innerHTML += movieMemory
      }
    })
    //slider 5
    const prevButton = document.querySelector('.prev-buttons');
const nextButton = document.querySelector('.next-buttons');
    const slider = document.querySelector('#theaters');
    console.log(slider);
const sliderItems = document.querySelectorAll('#Theaters');
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
    
    var cards = document.querySelectorAll('.card');
    console.log(cards);

    for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function (event) {
        
        // Bước 2: Lấy ID của card
      var cardId = this.getAttribute('data-id');
      window.location.href = `trangCt.html?id=${cardId}`
        // Bước 3: Chuyển hướng đến trang chi tiết
        var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + cardId;
       
    });
    }
    //slider 1
    const prevButton1 = document.querySelector('.prev-button1');
    const nextBUtton1 = document.querySelector('.next-button1');
        const slider1 = document.querySelector('#series');
        console.log(slider1);
    const sliderItems1 = document.querySelectorAll('#Series');
    const sliderLength = sliderItems1[0].offsetWidth + 1; // Lấy kích thước mỗi phần tử và margin-right
    
    let currentPosition1 = 0;
    
    const moveSlider1 = () => {
      const maxPosition = 0;
      const minPosition = -(sliderItems.length - 1) * sliderLength;
      if (currentPosition1 > maxPosition) {
        currentPosition1 = maxPosition;
      }
      if (currentPosition1 < minPosition) {
        currentPosition1 = minPosition;
      }
      slider1.style.transform = `translateX(${currentPosition1}px)`;
    };
    
    prevButton1.addEventListener('click', () => {
      currentPosition1 += sliderLength;
      moveSlider1();
    });
    
    nextBUtton1.addEventListener('click', () => {
      currentPosition1 -= sliderLength;
      moveSlider1();
    
      // Kiểm tra nếu đạt đến phần tử cuối cùng
      if (currentPosition1 <= -(sliderItems.length - 6) * sliderLength) {
        currentPosition1 = -(sliderItems.length -6.4 ) * sliderLength;
      }
    });
        
        var cards = document.querySelectorAll('.card');
        console.log(cards);
    
        for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            
            // Bước 2: Lấy ID của card
          var cardId = this.getAttribute('data-id');
          window.location.href = `trangCt.html?id=${cardId}`
            // Bước 3: Chuyển hướng đến trang chi tiết
            var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + cardId;
           
        });
    }
    //slider 2
    const prevButton2 = document.querySelector('.prev-button2');
    const nextBUtton2 = document.querySelector('.next-button2');
        const slider2 = document.querySelector('#music');
        console.log(slider2);
    const sliderItems2 = document.querySelectorAll('#Music');
    const sliderLength2 = sliderItems2[0].offsetWidth + 1; // Lấy kích thước mỗi phần tử và margin-right
    
    let currentPosition2 = 0;
    
    const moveSlider2 = () => {
      const maxPosition = 0;
      const minPosition = -(sliderItems.length - 1) * sliderLength2;
      if (currentPosition2 > maxPosition) {
        currentPosition2 = maxPosition;
      }
      if (currentPosition2 < minPosition) {
        currentPosition2 = minPosition;
      }
      slider2.style.transform = `translateX(${currentPosition2}px)`;
    };
    
    prevButton2.addEventListener('click', () => {
      currentPosition2 += sliderLength2;
      moveSlider2();
    });
    
    nextBUtton2.addEventListener('click', () => {
      currentPosition2 -= sliderLength2;
      moveSlider2();
    
      // Kiểm tra nếu đạt đến phần tử cuối cùng
      if (currentPosition2 <= -(sliderItems.length - 6) * sliderLength2) {
        currentPosition2 = -(sliderItems.length -6.4 ) * sliderLength2;
      }
    });
        
        var cards = document.querySelectorAll('.card');
        console.log(cards);
    
        for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            
            // Bước 2: Lấy ID của card
          var cardId = this.getAttribute('data-id');
          window.location.href = `trangCt.html?id=${cardId}`
            // Bước 3: Chuyển hướng đến trang chi tiết
            var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + cardId;
           
        });
    }
    // slider3
    const prevButton3 = document.querySelector('.prev-button3');
    const nextBUtton3 = document.querySelector('.next-button3');
        const slider3 = document.querySelector('#sport');
        console.log(slider3);
    const sliderItems3 = document.querySelectorAll('#Sport');
    const sliderLength3 = sliderItems3[0].offsetWidth + 1; // Lấy kích thước mỗi phần tử và margin-right
    
    let currentPosition3 = 0;
    
    const moveSlider3 = () => {
      const maxPosition = 0;
      const minPosition = -(sliderItems.length - 1) * sliderLength3;
      if (currentPosition3 > maxPosition) {
        currentPosition3 = maxPosition;
      }
      if (currentPosition3 < minPosition) {
        currentPosition3 = minPosition;
      }
      slider3.style.transform = `translateX(${currentPosition3}px)`;
    };
    
    prevButton3.addEventListener('click', () => {
      currentPosition3 += sliderLength3;
      moveSlider3();
    });
    
    nextBUtton3.addEventListener('click', () => {
      currentPosition3 -= sliderLength3;
      moveSlider3();
    
      // Kiểm tra nếu đạt đến phần tử cuối cùng
      if (currentPosition3 <= -(sliderItems.length - 6) * sliderLength3) {
        currentPosition3 = -(sliderItems.length -6.4 ) * sliderLength3;
      }
    });
        
        var cards = document.querySelectorAll('.card');
        console.log(cards);
    
        for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            
            // Bước 2: Lấy ID của card
          var cardId = this.getAttribute('data-id');
          window.location.href = `trangCt.html?id=${cardId}`
            // Bước 3: Chuyển hướng đến trang chi tiết
            var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + cardId;
           
        });
    } 
    // slider4
    const prevButton4 = document.querySelector('.prev-button4');
    const nextBUtton4 = document.querySelector('.next-button4');
        const slider4 = document.querySelector('#anime');
        console.log(slider4);
    const sliderItems4 = document.querySelectorAll('#Anime');
    const sliderLength4 = sliderItems4[0].offsetWidth + 1; // Lấy kích thước mỗi phần tử và margin-right
    
    let currentPosition4 = 0;
    
    const moveSlider4 = () => {
      const maxPosition = 0;
      const minPosition = -(sliderItems.length - 1) * sliderLength4;
      if (currentPosition4 > maxPosition) {
        currentPosition4 = maxPosition;
      }
      if (currentPosition4 < minPosition) {
        currentPosition4 = minPosition;
      }
      slider4.style.transform = `translateX(${currentPosition4}px)`;
    };
    
    prevButton4.addEventListener('click', () => {
      currentPosition4 += sliderLength4;
      moveSlider4();
    });
    
    nextBUtton4.addEventListener('click', () => {
      currentPosition4 -= sliderLength4;
      moveSlider4();
    
      // Kiểm tra nếu đạt đến phần tử cuối cùng
      if (currentPosition4 <= -(sliderItems.length - 6) * sliderLength4) {
        currentPosition4 = -(sliderItems.length -6.4 ) * sliderLength4;
      }
    });
        
        var cards = document.querySelectorAll('.card');
        console.log(cards);
        for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            
            // Bước 2: Lấy ID của card
          var cardId = this.getAttribute('data-id');
          window.location.href = `trangCt.html?id=${cardId}`
            // Bước 3: Chuyển hướng đến trang chi tiết
            var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + cardId;
           
        });
    }
    
  })
  .catch(error => {
    console.error('Lỗi:', error);
});
  // Khởi tạo carousel
  var carousel = new bootstrap.Carousel(
    document.querySelector("#carouselExampleIndicators"),
    {
      interval: 5000, // Đặt thời gian trôi qua giữa các slide là 5 giây
      wrap: true, // Cho phép trượt vòng qua các slide
    }
);
