var carouselIndicators = document.querySelector(".carousel-indicators");
var carouselInner = document.querySelector(".carousel-inner");
var apiURL = "https://65180651582f58d62d355368.mockapi.io/Movies"
let datas = [];
fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const foundAnime = data.filter(movie => 'Phim bộ' === movie.category);
        foundAnime.forEach(function (movie, index) {
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

            var title = document.createElement("h3");
            title.textContent = movie.title;

            var subtitle = document.createElement("h5");
            subtitle.textContent = movie.episodes;

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
        foundAnime.forEach(function (movie) {
          var movies =` <div
            class="owl-item active col-md-3 col-sm-6"
            style="position: relative;"
            data-id="${movie.id}"
          >
            <a href="#" class="movie-item">
              <img src="${movie.src}" alt="" />
              <div class="movie-item-content">
                <div class="movie-item-title">${movie.title}</div>
                <div class="movie-infos">
                  <div class="movie-info">
                    <i class="bx bxs-star"></i>
                    <span>9.5</span>
                  </div>
                  <div class="movie-info">
                    <i class="bx bxs-time"></i>
                    <span>120 mins</span>
                  </div>
                  <div class="movie-info">
                    <span>HD</span>
                  </div>
                  <div class="movie-info">
                    <span>16+</span>
                  </div>
                </div>
              </div>
            </a>
          </div>` 
            document.getElementById('film').innerHTML += movies
        })
        
        var cards = document.querySelectorAll('.owl-item');
    
        for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            
            // Bước 2: Lấy ID của card
          var cardId = this.getAttribute('data-id');
          window.location.href = `detail.html?id=${cardId}`
            // Bước 3: Chuyển hướng đến trang chi tiết
            var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + cardId;
           
        });
        }
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });


      var carousel = new bootstrap.Carousel(
        document.querySelector("#carouselExampleIndicators"),
        {
          interval: 5000, // Đặt thời gian trôi qua giữa các slide là 5 giây
          wrap: true, // Cho phép trượt vòng qua các slide
        }
    );
    