let apiURL = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
let userList = []; // Khởi tạo một biến để lưu trữ dữ liệu từ API
let currentUser;

//Chạy lấy dữ liệu từ API
async function start() {
  try {
    userList = await getUserList(); // Gán dữ liệu từ API vào biến userList
    console.log(userList); // In ra biến userList                     
    console.log(userList[23])
  } catch (error) {
    alert('Server đang bị quá tải. Vui lòng thử lại sau');
  }
}

async function getUserList() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}

async function checkUser(){
  let userEmail = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let userList = await start();
  
}

// Gọi hàm start để khởi tạo yêu cầu API khi trang web tải
start();