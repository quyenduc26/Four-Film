const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("button-search");
const searchResultsContainer = document.getElementById("searchResults");
var apiURL = "https://65180651582f58d62d355368.mockapi.io/Movies"

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
    for (let i = 0; i < movie.length; i++) {
      const film = movie[i];
      const filmId = film.title.toLowerCase();
  
      if (filmId.includes(searchTerm)) {
        displayFilmDetails(film);
      }
    }
  }