let apiMainStorage = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';

var qrcode = new QRCode(document.getElementById("qrcode"), {
  text: "Nội dung bạn muốn mã QR code biểu thị",
  width: 128,
  height: 128
});

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('payment_section').style.color = 'var(--button)';
    await checkUser();
});

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
  document.getElementById('total_seat').innerHTML=user.currentPrice.toLocaleString('vi-VN',{
      style: 'currency',
      currency: 'VND'
  });
  document.getElementById('seat').innerHTML=user.seatList.join(' ');
//   document.getElementById('fullname').value = user.userAccount;
  document.getElementById('email').value = user.email;

} 




