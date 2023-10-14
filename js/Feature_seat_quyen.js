//CHECK AVAILABLE SEAT THEN SELECT
document.addEventListener("DOMContentLoaded", ()=> {
    var seats = document.querySelectorAll(".seat");                                                 // Lọc tất cả các ghế
    seats.forEach((seat) =>{ 
        var isUnavailable = seat.getAttribute('data-available') === 'false';                          // Kiểm tra xem ghế còn không
        if(isUnavailable){                                                                 
            seat.removeAttribute("data-selected");                                                    // Nếu kh còn thì xoá data-selected
            // seat.innerHTML = ''
        }
        else{
            seats.forEach((seat) => {                                                                 // Cho chọn ghế còn lại 
            seat.addEventListener("click",()=> {
                var isSelected = seat.getAttribute("data-selected") === "true";
                if (isSelected) {
                seat.setAttribute("data-selected", "false");
                //   seat.classList.remove("selected");
                } else {
                seat.setAttribute("data-selected", "true");
                //   seat.classList.add("selected");
                }
            });
        });
        }
    })
})

  
