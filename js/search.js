const contentViewHistory = document.getElementById("content_view_history")
var searchHistoryDatalist = document.getElementById('search-historys');
let apiUsers = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
var apiURL = "https://65180651582f58d62d355368.mockapi.io/Movies"

async function getUserList() {
  try {
    const response = await fetch(apiUsers);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}
checkUser()

// FUNCTION TO CHECK THE CURRENT USER
async function checkUser() {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let data = await getUserList();
  let user = data.find(user => email == user.email && user.password === password)
  var listW = user.watchedHistory
  var listR = user.recentList
  if (listW.length == 0) {
    const noResultsMessage = document.createElement("p");
      noResultsMessage.id = "noResultsMessage";
      noResultsMessage.textContent ="Lịch sử trống";
      searchResultsContainer.appendChild(noResultsMessage);
  }
  else {
    listW.forEach(function (element) {
      const filmContainer = document.createElement("div");
    filmContainer.className = "film-container";
  
    const filmPoster = document.createElement("img");
    filmPoster.className = "film-poster";
    filmPoster.src = element.src
    filmContainer.appendChild(filmPoster);
  
    const filmDetails = document.createElement("div");
    filmDetails.className = "film-details";
  
    const filmTitle = document.createElement("h3");
    filmTitle.textContent = element.title;
    filmDetails.appendChild(filmTitle); 
  
    const filmDescription = document.createElement("p");
    filmDescription.textContent = element.episodes;
    filmDetails.appendChild(filmDescription);
  
    filmContainer.appendChild(filmDetails);
  
  const filmLink = document.createElement("a");
    filmLink.href = element.watchLink;
    filmLink.textContent = "Watch Now";
    filmDetails.appendChild(filmLink);
  
  searchResultsContainer.appendChild(filmContainer);
    })
  }
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("button-search");
const searchResultsContainer = document.getElementById("searchResults");


// Thêm từ khóa tìm kiếm vào lịch sử
async function addToSearchHistory(keyword) {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let data = await getUserList();
  let user = data.find(user => email == user.email && user.password === password); 
  var id = user.id;
  console.log(id);
  user.recentList.push(keyword);
  console.log(user.recentList); // Thêm keyword vào watchedHistory
  fetch('https://65180651582f58d62d355368.mockapi.io/MainStorage/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user) // Gửi thông tin người dùng đã cập nhật
  });
}

function displaySearchHistory(user) {
  searchHistoryDatalist.innerHTML = '';
  for (var i = 0; i < user.recentList.length; i++) {
    var optionItem = document.createElement('option');
    optionItem.textContent = user.recentList[i]
    optionItem.value = user.recentList[i];
    searchHistoryDatalist.appendChild(optionItem);
  
  }
}

searchInput.addEventListener('input',async function () {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let data = await getUserList();
  let user = data.find(user => email == user.email && user.password === password);
  console.log(data);
  console.log(user);
  displaySearchHistory(user);
})



searchButton.addEventListener('click', function () {
  
    var keyword = searchInput.value;
    // Thêm từ khóa tìm kiếm vào lịch sử
  addToSearchHistory(keyword);
  document.getElementById('body-content').style.display='none'
});
  searchButton.addEventListener("click", searchFilms);
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      searchButton.addEventListener("click", function () {
        searchFilms(data)
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
function displayFilmDetails(film) {
    
    const filmContainer = document.createElement("div");
    filmContainer.className = "film-container";
  
    const filmPoster = document.createElement("img");
    filmPoster.className = "film-poster";
    filmPoster.src = film.src
    filmContainer.appendChild(filmPoster);
  
    const filmDetails = document.createElement("div");
    filmDetails.className = "film-details";
  
    const filmTitle = document.createElement("h3");
    filmTitle.textContent = film.title;
    filmDetails.appendChild(filmTitle); 
  
    const filmDescription = document.createElement("p");
    filmDescription.textContent = film.episodes;
    filmDetails.appendChild(filmDescription);
  
    filmContainer.appendChild(filmDetails);
  
  const filmLink = document.createElement("a");
    filmLink.href = film.watchLink;
    filmLink.textContent = "Watch Now";
    filmDetails.appendChild(filmLink);
  
  searchResultsContainer.appendChild(filmContainer);
  
  }
  
  function searchFilms(movie) {
    const searchTerm = searchInput.value.toLowerCase();
    searchResultsContainer.innerHTML = "";
    let hasResults = false;
    for (let i = 0; i < movie.length; i++) {
      const film = movie[i];
      const filmId = film.title.toLowerCase();
  
      if (filmId.includes(searchTerm)) {
        displayFilmDetails(film);
        hasResults = true
      }
    }
    if (!hasResults) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.id = "noResultsMessage";
      noResultsMessage.textContent ="Không có kết quả tìm kiếm";
      searchResultsContainer.appendChild(noResultsMessage);
    }
  }