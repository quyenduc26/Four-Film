let apiCinema = 'https://65300e576c756603295e2eec.mockapi.io/Cinema';
let apiMainStorage = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
let currentUserId;
var seatCost = 0;
var seatList = [];


//CHECK STAUS OF THE USER
async function getUserList() {
  try {
    const response = await fetch(apiMainStorage);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}
async function checkUser() {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let data = await getUserList();
  let user = data.find(user => email == user.email && user.password === password)
  currentUserId = user.id;
  seatList = user.seatList;
  seatCost = user.currentPrice;
  document.getElementById('total_seat').innerHTML=user.currentPrice.toLocaleString('vi-VN',{
      style: 'currency',
      currency: 'VND'
  });;
  document.getElementById('seat').innerHTML=user.seatList.join(' ');
  var seats = document.querySelectorAll(".seat");
  seats.forEach((seat) => {
    if (seatList.includes(seat.textContent)) {
      seat.setAttribute("data-selected", "true");
    }
  });

}

//CHECK AVAILABLE SEAT THEN SELECT
document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById('seat_section').style.color = 'var(--button)';
    var seats = document.querySelectorAll(".seat");                                                 // Lọc tất cả các ghế
    var seatInstance = seatList.join(' ');
    seats.forEach((seat) =>{ 
        // seatList.push(seat.textContent);
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
                  var seatIndex = seatList.indexOf(seat.textContent);
                  seatList.splice(seatIndex, 1);
                } else {
                  seat.setAttribute("data-selected", "true");
                  seatInstance += seat.textContent+' ';
                  seatCost += seatPrice;
                  seatList.push(seat.textContent);
                }
                document.getElementById('seat').innerHTML = seatList.join(' ');
                var printCost = seatCost.toLocaleString('vi-VN',{
                    style: 'currency',
                    currency: 'VND'
                });
                document.getElementById('total_seat').innerHTML = printCost;
                console.log(seatList)
                console.log(seatInstance)
                console.log(seatCost)
            });
        }
    });
})


async function paySeat(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let email = userInfo[0][1];
    let password = userInfo[0][0];
    let data = await getUserList();
    let user = data.find(user => email == user.email && user.password === password)
    currentUserId = user.id;
    console.log('Fetching URL:', apiMainStorage + '/' + currentUserId);
    fetch(apiMainStorage + '/' + currentUserId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPrice: seatCost,
        seatList: seatList
      })
    }).then(res => res.json()
    ).then(user => {
        alert(user.currentPrice);
        window.location.href = "/IT_Project/html/corn.html";
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Kết nối của bạn đang gặp vấn đề. Vui lòng thử lại.');
    });
}


checkUser()


