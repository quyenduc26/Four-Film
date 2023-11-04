let apiMainStorage = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
let apiMovie = 'https://65180651582f58d62d355368.mockapi.io/Movies';
let movieID = JSON.parse(localStorage.getItem('idCard'));



document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('payment_section').style.color = 'var(--button)';
    await checkUser();
    var payMethods = document.querySelectorAll('.pay_selection');
    payMethods.forEach(payMethod => {
      payMethod.addEventListener('click',() =>{
        payMethod.style.color = "white";
        payMethod.style.backgroundColor = "var(--button)";
      })
    })
    

    const countdownElement = document.getElementById('time_remaining');
    let remainingSeconds = 5 * 60; 
    function updateCountdown() {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

        countdownElement.textContent = `${minutesDisplay}:${secondsDisplay}`;

        if (remainingSeconds > 0) {
            remainingSeconds--;
        } else {
            clearInterval(timer);
            countdownElement.textContent = "00:00"; 
            alert('Đã hết thời gian giữ ghế. Vui lòng đặt lại');
            window.location.href = "/IT_Project/html/payTicket.html";
        }
    }
    const timer = setInterval(updateCountdown, 1000);
});

async function getList(api) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      return data; // Trả về dữ liệu từ API
    } catch (error) {
      throw error;
    }
  }

async function payBooking(){
  var fullname = document.getElementById('fullname').value;
  var paymail = document.getElementById('email').value;
  var phoneNb = document.getElementById('phone_nb').value;
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let dataUser = await getList(apiMainStorage);
  let user = dataUser.find(user => email == user.email && user.password === password)
  currentUserId = user.id;
  fetch(apiMainStorage + '/' + currentUserId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullname: fullname,
      phoneNumber: phoneNb,
      email: paymail
    })
  }).then(res => res.json()
  ).then(user => {
    alert(user.fullname);
    alert(user.phoneNumber);
    alert(user.email);
    window.location.href = "/IT_Project/html/infor.html";
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Kết nối của bạn đang gặp vấn đề. Vui lòng thử lại.');
  });

}



async function checkUser() {
  let cinema = JSON.parse(localStorage.getItem('cinema'));
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let dataUser = await getList(apiMainStorage);
  let dataMovie = await getList(apiMovie);
  let movie = dataMovie.find(movie =>  movieID==movie.id );
  let user = dataUser.find(user => email == user.email && user.password === password)
  currentUserId = user.id;
  document.getElementById('film_name').innerHTML=movie.title;
  document.getElementById('cinema_name').innerHTML=cinema;
  document.getElementById('total_seat').innerHTML=user.currentPrice.toLocaleString('vi-VN',{
      style: 'currency',
      currency: 'VND'
  });
  document.getElementById('seat').innerHTML=user.seatList.join(' ');
  document.getElementById('fullname').value = user.fullname;
  document.getElementById('email').value = user.email;
  document.getElementById('phone_nb').value = user.phoneNumber;


} 



