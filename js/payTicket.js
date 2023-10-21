let rap = ['rap1','rap2','rap3'];
document.addEventListener('DOMContentLoaded', () => {
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

    const headings = document.querySelectorAll('.heading_table');
    headings.forEach(heading => {
        heading.addEventListener('click', () => {
            // Tìm phần tử ul bằng cách sử dụng phương pháp closest để tìm ul gần nhất
            const cinema = heading.closest('.cinema');
            const ul = cinema.querySelector('.branchs');
                         
            // Kiểm tra xem ul có class "active" không và thay đổi nó
            if (cinema.classList.contains('active')) {
                cinema.classList.remove('active');
            } else {
                cinema.classList.add('active');
            }
        });
    });

});
