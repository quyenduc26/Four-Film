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
        <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
        document.getElementById('series').innerHTML += movieMemory
      }
      else if (movie.category === 'âm nhạc') {
        var movieMemory = `
        <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('music').innerHTML += movieMemory
      }
      else if (movie.category === 'anime') {
        var movieMemory = `
        <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('anime').innerHTML += movieMemory
      }
      else if (movie.category === 'thể thao') {
        var movieMemory = `
        <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('sport').innerHTML += movieMemory
      }
      else if (movie.category === 'phim chiếu rạp') {
        var movieMemory = `
        <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('theaters').innerHTML += movieMemory
      }
    })
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