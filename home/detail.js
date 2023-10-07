// Lấy danh sách các phần tử phim
const getJsonString = localStorage.getItem('myArray');
const myArrays = JSON.parse(getJsonString);
myArrays.forEach(function (display) {
  if (display.display == true) {
    var myIframe =
    `<iframe
    class="w-100"
    id="video"
    src="${display.watchLink}"
    frameborder="0"
    allowfullscreen
  > </iframe>`
    
    document.getElementById("watched").innerHTML = myIframe
    
  var myContentsw = `<div class="film">
  <h3 id="titleFilm">${display.title}</h3>
  <h4 id="subTitle">Subtitle</h4>
  <div class="information d-flex gap-3">
    <div class="year">${display.yearOfRelease}</div>
    <div class="episodes">${display.episodes}</div>
  </div>
  <div class="type">${display.type}</div>
  <div class="content">
  ${display.describe}
  </div>
</div>
<div class="author">
  <p id="author-item">Diễn viên : ${display.actor}</p>
  <p id="author-item">Đạo diễn : ${display.author}</p>
  <p id="author-item">Thể loại : ${display.type}</p>
</div>
</div>`
  document.getElementById("contentFlim").innerHTML = myContentsw
  detail.display = false
  localStorage.setItem('myArray', JSON.stringify(myArray));
  }
})
   