//CHECK AVAILABLE SEAT THEN SELECT
document.addEventListener("DOMContentLoaded", ()=> {
    var seats = document.querySelectorAll(".seat");                                                 // Lọc tất cả các ghế
    var seatInstance = '';
    var seatCost = 0;
    var seatPrice = '';
    seats.forEach((seat) =>{ 
        var isUnavailable = seat.getAttribute('data-available') === 'false';                          // Kiểm tra xem ghế còn không
        if(isUnavailable){                                                                 
            seat.removeAttribute("data-selected");                                                    // Nếu kh còn thì xoá data-selected
        }
        else{                                                           
            seat.addEventListener("click",()=> {
                var seatPrice = parseInt(seat.getAttribute("data-price"))
                var isSelected = seat.getAttribute("data-selected") === "true";
                if (isSelected) {
                seat.setAttribute("data-selected", "false");
                seatInstance = seatInstance.replace(seat.textContent+' ',' ');
                seatCost -= seatPrice;

                } else {
                seat.setAttribute("data-selected", "true");
                seatInstance += seat.textContent+' ';
                seatCost += seatPrice;

                }
                document.getElementById('seat').innerHTML = seatInstance;
                var printCost = seatCost.toLocaleString('vi-VN',{
                    style: 'currency',
                    currency: 'VND'
                });
                document.getElementById('total_seat').innerHTML = printCost;
                console.log(seatInstance)
                console.log(seatCost)

            });
        }
    });
})



  
  
