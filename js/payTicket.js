let apiCinema = 'https://65300e576c756603295e2eec.mockapi.io/Cinema';
let rap = ['rap1','rap2','rap3'];
document.addEventListener('DOMContentLoaded', async () => {
    const citySelect = document.getElementById("city");
    const cinemasList = document.getElementById('cinemas');
    citySelect.addEventListener('change', async () => {
        const selectedCity = citySelect.value;
        cinemasList.innerHTML = '';
        await renderItem(selectedCity);
    });
    const days = document.querySelectorAll('.day');
    let selectedDay = null;

    days.forEach(day => {
        day.addEventListener('click', () => {
            if (selectedDay) {
                selectedDay.style.backgroundColor = 'var(--nav-color)';
                selectedDay.style.color = 'rgb(129, 125, 125)';
            }
            selectedDay = day;
            day.style.backgroundColor = 'var(--button)';
            day.style.color = 'white';
        });
    });
    const heading = document.querySelector('.heading_table');
        heading.addEventListener('click', () => {
            const cinema = heading.closest('.cinema');
            const ul = cinema.querySelector('.branchs');

            if (cinema.classList.contains('active')) {
                cinema.classList.remove('active');
            } else {
                cinema.classList.add('active');
            }
        });
    const cinema_selections = document.querySelectorAll('.cinema_selection');
    cinema_selections.forEach(cinema_selection=>{
        cinema_selection.addEventListener('click', async ()=>{
            const cinemaName = cinema_selection.textContent;
            console.log(cinemaName);
            const cinemaId = await findCinema(cinemaName);
            if (cinemaId) {
                localStorage.setItem('selectedCinemaId', cinemaId);
                console.log(`Đã lưu ID của rạp: ${cinemaId}`);
            } else {
                console.error(`Không tìm thấy ID của rạp: ${cinemaName}`);
            }
        })
    });
    
    
});

async function getCinemaList(){
    try {
      const response = await fetch(apiCinema);
      const data = await response.json();
      return data; // Trả về dữ liệu từ API
    } catch (error) {
      throw error;
    }
  }
async function renderItem(city){
let cinemas = await getCinemaList();
cinemas.forEach((cinema)=>{
    if(cinema.city === city){
        var html = `
        <li class="branch m-0 p-0 border-0">
            <div class="cinema_selection row ">
                <div class="heading_table row m-0 p-1 px-0">
                <img class="col-md-2 col-3 logo_cinema mb-1" src="/IT_Project/img/" alt="">
                <p class="col-md-10 col-9 pt-2 pb-2 m-0 p-0 cinema_name">${cinema.name}</p>
                </div>
            </div>
        </li>
        `;
        document.getElementById('cinemas').innerHTML += html;
    }
})
}
async function findCinema(cinemaName) {
    const cinemas = await getCinemaList();
    const foundCinema = cinemas.find( cinema.name === cinemaName);
    return foundCinema ? foundCinema.id : null;
}
