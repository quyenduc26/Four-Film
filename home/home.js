// Tạo một mảng chứa thông tin về các phim
var movies = [
  {
      id:'p1',
      src: "https://bizweb.dktcdn.net/100/330/208/files/hinh-nen-kimetsu-yaiba-ngau-6-1.jpg?v%5Cu003d1649906743187",
      alt: "Movie 1",
    title: "Thanh gương diệt quỷ",
    describe: "Thanh Gươm Diệt Quỷ - phần phim tại Phố Đèn Đỏ cuối cùng cũng đã kết thúc. Sau trận chiến khốc liệt, Tanjiro và Uzui đã thành công chặt đầu Gyutaro. Trong khi đó, Zenitsu và Inosuke hợp sức chặt đầu Daki cùng một lúc. Tuy nhiên, Gyutaro đã giải phóng Huyết thuật của mình và bao phủ khắp toàn bộ khu vực. Tanjiro tỉnh dậy và hội ngộ cùng Nezuko và Zenitsu, nhưng Inosuke và Uzui đang cận kề cái chết vì bị Gyutaro đầu độc.",
      caption: "Tập 24",
    watchLink: "https://pops.vn/video/thanh-guom-diet-quy-s2-ky-vien-tran-long-tieng-tap-11-du-co-trai-qua-bao-nhieu-vong-luan-hoi-622b084363105c00593da4a8", // Liên kết xem phim 1
    category: 'anime',
    anotherName: "Kimetsu no YaibaLưỡi gươm diệt quỷDiệt quỷ cứu nhân",
    countryOfManufacture: "japan",
    yearOfRelease: '2019',
    type:"Phiêu lưu"
  },
    {
      src: "https://tse2.mm.bing.net/th?id=OIP.h3U-yGZNxT8PkF5vlRnnxgHaEK&pid=Api&P=0&h=180",
      alt: "Movie 2",
      title: "Movie 2",
      caption: "Description of Movie 2",
      watchLink: "https://example.com/movie2", // Liên kết xem phim 2
      category:'âm nhạc'
    },
    {
      src: "https://tse3.mm.bing.net/th?id=OIP.TpVPl-_YeiJd5YZd_heOVgHaEo&pid=Api&P=0&h=180",
      alt: "Movie 3",
      title: "Movie 3",
      caption: "Description of Movie 3",
      watchLink: "https://example.com/movie3", // Liên kết xem phim 3
      category:'thể thao'
    },
    {
      src: "https://tse3.mm.bing.net/th?id=OIP.TpVPl-_YeiJd5YZd_heOVgHaEo&pid=Api&P=0&h=180",
      alt: "Movie 3",
      title: "Movie 3",
      caption: "Description of Movie 3",
      watchLink: "https://example.com/movie3", // Liên kết xem phim 3
      category:'phim chiếu rạp'
  },
  {
    src: "https://tse3.mm.bing.net/th?id=OIP.TpVPl-_YeiJd5YZd_heOVgHaEo&pid=Api&P=0&h=180",
    alt: "Movie 3",
    title: "Movie 3",
    caption: "Description of Movie 3",
    watchLink: "https://example.com/movie3", // Liên kết xem phim 3
    category:'anime'
  },
  ];

  var carouselIndicators = document.querySelector(".carousel-indicators");
  var carouselInner = document.querySelector(".carousel-inner");

  movies.forEach(function (movie, index) {
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
  });

  // Khởi tạo carousel
  var carousel = new bootstrap.Carousel(
    document.querySelector("#carouselExampleIndicators"),
    {
      interval: 5000, // Đặt thời gian trôi qua giữa các slide là 5 giây
      wrap: true, // Cho phép trượt vòng qua các slide
    }
);
movies.forEach(function (movie){
  if (movie.category === 'phim bộ') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 18rem; background-color:black;margin-right: 10px;">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
    document.getElementById('series').innerHTML += movieMemory
  }
  else if (movie.category === 'âm nhạc') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 18rem; background-color:black;margin-right: 10px;">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
  document.getElementById('music').innerHTML += movieMemory
  }
  else if (movie.category === 'anime') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 18rem; background-color:black;margin-right: 10px;">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
  document.getElementById('anime').innerHTML += movieMemory
  }
  else if (movie.category === 'thể thao') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 18rem; background-color:black;margin-right: 10px;">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
  document.getElementById('sport').innerHTML += movieMemory
  }
  else if (movie.category === 'phim chiếu rạp') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 18rem; background-color:black;margin-right: 10px;">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
  document.getElementById('theaters').innerHTML += movieMemory
  }
})
