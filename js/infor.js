let apiMainStorage = "https://65180651582f58d62d355368.mockapi.io/MainStorage";
let apiItems = "https://65300e576c756603295e2eec.mockapi.io/Items";
let apiMovie = "https://65180651582f58d62d355368.mockapi.io/Movies";
let movieID = JSON.parse(localStorage.getItem("idCard"));
let movie_name;
let seatSelected;
let user;
let currentTrans = [];
let userTrans;
let time;
let itemContent = "";
let cinema = JSON.parse(localStorage.getItem("cinema"));

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("infor_section").style.color = "var(--button)";
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let dataUser = await getList(apiMainStorage);
  let dataCorn = await getList(apiItems);
  let dataMovie = await getList(apiMovie);
  let movie = dataMovie.find((movie) => movieID == movie.id);
  movie_name = movie.title;
  time = movie.time;
  user = dataUser.find((user) => email === user.email && user.password === password);
  for (let i = 0; i < user.consumeList.length; i++) {
    item = dataCorn.find((item) => user.consumeList[i] === item.id);
    console.log(item);
    if (i < user.consumeList.length - 1) {
      itemContent += user.quantityItem[i] + " " + item.name + " , ";
    } else {
      itemContent += user.quantityItem[i] + " " + item.name;
    }
    console.log(itemContent);
  }
  console.log(user);
  var infor = "Tên rạp: " + cinema + "%0A";
  infor += "\n\nTên phim: " + movie_name + "%0A";
  infor += "\n\nGhế đã đặt: " + user.seatList.join(", ") + "%0A";
  infor += "\n\nBắp nước: " + itemContent + "%0A";
  infor += "\n\nThời gian: " + time + "%0A";
  infor +=
    "\n\nTổng đơn: " +
    user.currentPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) +
    "%0A";
  infor += "Số tài khoản: 105876863105" + "%0A";
  infor += "Nội dung chuyển khoảng: Tên _ Tên Phim _ Số điện thoại " + "%0A";
  seatSelected = movie.seatSelected.concat(user.seatList);
  console.log(seatSelected);
  document.getElementById("movie_name").textContent = movie.title;
  document.getElementById("seats").textContent = user.seatList.join(", ");
  document.getElementById("corn").textContent = itemContent;
  document.getElementById("price").textContent = user.currentPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.getElementById("paymt").textContent = "Chuyển khoản QR";
  var url = "https://api.qrserver.com/v1/create-qr-code/?data=" + infor + "&amp;size=50x50";
  document.getElementById("barcode").setAttribute("src", url);

  currentTrans.push(user.transactionList.length + 1);
  currentTrans.push(cinema);
  currentTrans.push(movie.title);
  currentTrans.push(user.seatList);
  currentTrans.push(itemContent);
  currentTrans.push(movie.time);
  currentTrans.push(user.currentPrice);
  console.log(currentTrans);
  userTrans = user.transactionList;
  userTrans.push(currentTrans);
  console.log(userTrans);
});

async function getOrder() {
  const serviceID = "default_service";
  const templateID = "template_0g8qxcr";
  var infor = "Tên khách hàng: " + user.fullname;
  infor += "\n\nSố điện thoại: " + user.phoneNumber;
  infor += "\n\nTên rạp: " + cinema;
  infor += "\n\nTên phim: " + movie_name;
  infor += "\n\nGhế đã đặt: " + user.seatList.join(", ");
  infor += "\n\nThời gian: " + time;
  infor +=
    "\n\nTổng đơn: " +
    user.currentPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  infor += "\n\nThanh toán: Đã thanh toán ";
  currentUserId = user.id;
  fetch(apiMainStorage + "/" + currentUserId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transactionList: userTrans,
      seatList: [],
      consumeList: [],
      quantityItem: [],
      currentPrice: 0,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      // window.location.href = "../html/infor.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kết nối của bạn đang gặp vấn đề. Vui lòng thử lại.");
    });
  fetch(apiMovie + "/" + movieID, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seatSelected: seatSelected,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      // window.location.href = "../html/infor.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kết nối của bạn đang gặp vấn đề. Vui lòng thử lại.");
    });

  emailjs.send(serviceID, templateID, { message: infor, email: user.email }).then(
    () => {
      alert("Sent!");
      window.location.href = "../html/transaction.html";
    },
    (err) => {
      alert(JSON.stringify(err));
    }
  );
}

async function getList(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}
