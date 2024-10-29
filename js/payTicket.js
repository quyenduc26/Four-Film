let apiCinema = "https://65300e576c756603295e2eec.mockapi.io/Cinema";
document.addEventListener("DOMContentLoaded", async () => {
  const citySelect = document.getElementById("city");
  const cinemasList = document.getElementById("cinemas");
  citySelect.addEventListener("change", async () => {
    const selectedCity = citySelect.value;
    cinemasList.innerHTML = "";
    await renderItem(selectedCity);
    const cinemaItems = document.querySelectorAll(".branch");

    // Add a click event listener to each <li> element
    cinemaItems.forEach(function (item) {
      item.addEventListener("click", async () => {
        const cinemaName = item.querySelector(".cinema_name").textContent;
        console.log(cinemaName);
        let cinemas = await getCinemaList();
        var cinema = cinemas.find((cinema) => cinema.name === cinemaName);
        const jsonData = JSON.stringify(cinema.name);
        localStorage.setItem("cinema", jsonData);
        window.location.href = "../html/Feature_seat_quyen.html";
      });
    });
  });
  const days = document.querySelectorAll(".day");
  let selectedDay = null;

  days.forEach((day) => {
    day.addEventListener("click", () => {
      if (selectedDay) {
        selectedDay.style.backgroundColor = "var(--nav-color)";
        selectedDay.style.color = "rgb(129, 125, 125)";
      }
      selectedDay = day;
      day.style.backgroundColor = "var(--button)";
      day.style.color = "white";
    });
  });
});

async function getCinemaList() {
  try {
    const response = await fetch(apiCinema);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}
async function renderItem(city) {
  let cinemas = await getCinemaList();
  cinemas.forEach((cinema) => {
    if (cinema.city === city) {
      var html = `
        <li class="branch m-0 p-0 border-0">
            <div class="cinema_selection row ">
                <div class="row m-0 p-1 px-0">
                <img class="col-md-2 col-3 logo_cinema mb-1" src="../img/${cinema.image}" alt="">
                <p class="col-md-10 col-9 pt-2 pb-2 m-0 p-0 cinema_name" id="name">${cinema.name}</p>
                </div>
            </div>
        </li>
        `;
      document.getElementById("cinemas").innerHTML += html;
    }
  });
}

async function findCinema(cinemaName) {
  const cinemas = await getCinemaList();
  const foundCinema = cinemas.find((cinema) => cinema.name === cinemaName);
  return foundCinema;
}
