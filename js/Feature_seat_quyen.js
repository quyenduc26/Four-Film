let apiCinema = "https://65300e576c756603295e2eec.mockapi.io/Cinema";
let apiMovie = "https://65180651582f58d62d355368.mockapi.io/Movies";
let apiMainStorage = "https://65180651582f58d62d355368.mockapi.io/MainStorage";
let movieID = JSON.parse(localStorage.getItem("idCard"));
let currentUserId;
var seatCost = 0;
var seatList = [];
let movie;

//CHECK STAUS OF THE USER
async function getList(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}
async function checkUser() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let cinema = JSON.parse(localStorage.getItem("cinema"));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let dataUser = await getList(apiMainStorage);
  let dataMovie = await getList(apiMovie);
  movie = dataMovie.find((movie) => movieID == movie.id);
  let user = dataUser.find((user) => email == user.email && user.password === password);
  currentUserId = user.id;
  seatList = user.seatList;
  seatCost = user.currentPrice;
  seatSelected = movie.seatSelected;
  console.log(seatSelected);
  document.getElementById("film_name").innerHTML = movie.title;
  document.getElementById("cinema_name").innerHTML = cinema;
  document.getElementById("time").innerHTML = movie.time;
  document.getElementById("total_seat").innerHTML = user.currentPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.getElementById("seat").innerHTML = user.seatList.join(" ");
  var seats = document.querySelectorAll(".seat");
  seats.forEach((seat) => {
    if (seatList.includes(seat.textContent)) {
      seat.setAttribute("data-selected", "true");
    }
    if (seatSelected.includes(seat.textContent)) {
      seat.setAttribute("data-available", "false");
    }
  });
}

//CHECK AVAILABLE SEAT THEN SELECT
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("seat_section").style.color = "var(--button)";
  var seats = document.querySelectorAll(".seat"); // Lọc tất cả các ghế
  var seatInstance = seatList.join(" ");
  seats.forEach((seat) => {
    var isUnavailable = seat.getAttribute("data-available") === "false"; // Kiểm tra xem ghế còn không
    if (isUnavailable) {
      seat.removeAttribute("data-selected"); // Nếu kh còn thì xoá data-selected
    } else {
      seat.addEventListener("click", () => {
        var seatPrice = parseInt(seat.getAttribute("data-price"));
        var isSelected = seat.getAttribute("data-selected") === "true";
        if (isSelected) {
          seat.setAttribute("data-selected", "false");
          seatInstance = seatInstance.replace(seat.textContent + " ", " ");
          seatCost -= seatPrice;
          var seatIndex = seatList.indexOf(seat.textContent);
          seatList.splice(seatIndex, 1);
        } else {
          seat.setAttribute("data-selected", "true");
          seatInstance += seat.textContent + " ";
          seatCost += seatPrice;
          seatList.push(seat.textContent);
        }
        document.getElementById("seat").innerHTML = seatList.join(" ");
        var printCost = seatCost.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
        document.getElementById("total_seat").innerHTML = printCost;
        console.log(seatList);
        console.log(seatInstance);
        console.log(seatCost);
      });
    }
  });
  const countdownElement = document.getElementById("time_remaining");
  let remainingSeconds = 5 * 60; // Số giây còn lại (10 phút)

  function updateCountdown() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

    countdownElement.textContent = `${minutesDisplay}:${secondsDisplay}`;

    if (remainingSeconds > 0) {
      remainingSeconds--;
    } else {
      clearInterval(timer); // Dừng đồng hồ sau khi đã đếm ngược xong
      countdownElement.textContent = "00:00";
      alert("Đã hết thời gian giữ ghế. Vui lòng đặt lại");
      window.location.href = "../html/payTicket.html";
    }
  }
  // Cập nhật đồng hồ mỗi giây
  const timer = setInterval(updateCountdown, 1000);
});

async function paySeat() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let userData = await getList(apiMainStorage);
  let user = userData.find((user) => email == user.email && user.password === password);
  currentUserId = user.id;
  console.log("Fetching URL:", apiMainStorage + "/" + currentUserId);
  fetch(apiMainStorage + "/" + currentUserId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      currentPrice: seatCost,
      seatList: seatList,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      alert(user.currentPrice);
      window.location.href = "../html/corn.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kết nối của bạn đang gặp vấn đề. Vui lòng thử lại.");
    });
}

checkUser();
