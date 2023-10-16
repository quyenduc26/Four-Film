var url = window.location.search
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id')

var detailPageUrl = "https://65180651582f58d62d355368.mockapi.io/Movies/" + id;
let myIframe = ``
let myContentsw = ``

fetch(detailPageUrl)
  .then(response => response.json())
  .then(film => { 
    var category = film.category
    myIframe = myIframe + `<iframe class="w-100" id="video" src="${film.watchLink}" frameborder="0" allowfullscreen> </iframe>`
    document.getElementById("watched").innerHTML = myIframe


    myContentsw = myContentsw +  `<div class="film">
    <h3 id="titleFilm">${film.title}</h3>
    <h4 id="subTitle">Subtitle</h4>
    <div class="information d-flex gap-3">
    <div class="year">${film.yearOfRelease}</div>
    <div class="episodes">${film.episodes}</div>
    </div>
    <div class="type">${film.type}</div>
    <div class="content">
    ${film.describe}
    </div>
    </div>
    <div class="author">
    <p id="author-item">Diễn viên : ${film.actor}</p>
    <p id="author-item">Đạo diễn : ${film.author}</p>
    <p id="author-item">Thể loại : ${film.type}</p>
    </div>
    </div>`
    document.getElementById("contentFlim").innerHTML = myContentsw  

    fetch("https://65180651582f58d62d355368.mockapi.io/Movies")
    .then(response => response.json())
    .then(movie => {
      var movies = movie.filter(movie => category == movie.category);
      movies.forEach(function (movie) {
        var movieMemory = `
        <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
        <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
        <div class="card-body" style="padding: 10px 0px">
          <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
        </div>
      </div> `
      document.getElementById('type').innerHTML += movieMemory
      })
      var cards = document.querySelectorAll('.card');
      console.log(cards);
  
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
      })



