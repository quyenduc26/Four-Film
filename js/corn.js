let apiMainStorage = "https://65180651582f58d62d355368.mockapi.io/MainStorage";
let apiMovie = "https://65180651582f58d62d355368.mockapi.io/Movies";
let apiItems = "https://65300e576c756603295e2eec.mockapi.io/Items";
let movieID = JSON.parse(localStorage.getItem("idCard"));
let currentUserId;
let currentPrice;
let currentItem = [];
let currentQuantity = [];
let itemIDList = [];
let itemQuantityList = [];
let itemPriceList = [];
let movie_name = "Avatar 2: The Way of Water";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("corn_section").style.color = "var(--button)";
  await renderItem();
  let items = await getItemList();
  var rows = document.querySelectorAll(".tbody_row");
  rows.forEach((row) => {
    var nameItem = row.querySelector(".name_item").textContent;
    var addButton = row.querySelector(".add_button");
    var removeButton = row.querySelector(".remove_button");
    var quantityElement = row.querySelector(".quantity");
    var quantity = parseInt(quantityElement.textContent);
    var item = items.find((item) => item.name === nameItem);
    var itemID = item.id;
    var itemPrice = item.price;
    // console.log(itemID)
    // console.log(itemPrice)

    removeButton.addEventListener("click", () => {
      if (quantity > 0) {
        quantity -= 1;
        quantityElement.textContent = quantity;
        currentPrice -= parseInt(item.price);
        // console.log(currentPrice)
        document.getElementById("total_seat").innerHTML = currentPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
    });

    addButton.addEventListener("click", () => {
      quantity += 1;
      quantityElement.textContent = quantity;
      currentPrice += parseInt(item.price);
      // console.log(currentPrice)
      document.getElementById("total_seat").innerHTML = currentPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
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
});

async function payCorn() {
  var Items = document.querySelectorAll(".tbody_row");
  var items = await getItemList();
  Items.forEach((item) => {
    var itemQuantity = parseInt(item.querySelector(".quantity").textContent);
    var itemName = item.querySelector(".name_item").textContent;
    var itemFound = items.find((data) => data.name === itemName);
    var itemPrice = itemFound.price;
    if (itemQuantity > 0) {
      //bản cũ
      // var itemName = item.querySelector('.name_item').textContent;
      // var itemPrice = parseInt(item.querySelector('.price_item').textContent);
      // cornCost += itemPrice*itemQuantity;
      console.log(itemFound);
      itemIDList.push(itemFound.id);
      itemQuantityList.push(itemQuantity);
      itemPriceList.push(itemPrice);
      console.log(itemIDList);
      console.log(itemQuantityList);
      console.log(itemPriceList);
    }
  });
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let data = await getUserList();
  let user = data.find((user) => email == user.email && user.password === password);
  currentUserId = user.id;
  // for (let i = 0; i < user.consumeList.length; i++) {
  //   cornCost += parseInt(itemQuantityList[i]) * parseInt(itemPriceList[i]);
  //   console.log(cornCost);
  // }

  console.log("Fetching URL:", apiMainStorage + "/" + currentUserId);
  fetch(apiMainStorage + "/" + currentUserId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      currentPrice: currentPrice,
      quantityItem: itemQuantityList,
      consumeList: itemIDList,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      alert(user.currentPrice);
      alert(user.seatList);
      alert(user.quantityItem);
      alert(user.consumeList);
      document.getElementById("total_seat").innerHTML = user.currentPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      window.location.href = "../html/payment.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Kết nối của bạn đang gặp vấn đề. Vui lòng thử lại.");
    });
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
async function getItemList() {
  try {
    const response = await fetch(apiItems);
    const data = await response.json();
    return data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error;
  }
}

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
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let cinema = JSON.parse(localStorage.getItem("cinema"));
  let email = userInfo[0][1];
  let password = userInfo[0][0];
  let dataUser = await getList(apiMainStorage);
  let dataMovie = await getList(apiMovie);
  let movie = dataMovie.find((movie) => movieID == movie.id);
  let user = dataUser.find((user) => email == user.email && user.password === password);
  currentUserId = user.id;
  currentPrice = user.currentPrice;
  currentItem = user.consumeList;
  console.log(currentItem);
  currentQuantity = user.quantityItem;
  console.log(currentQuantity);
  document.getElementById("film_name").innerHTML = movie.title;
  document.getElementById("cinema_name").innerHTML = cinema;
  document.getElementById("total_seat").innerHTML = user.currentPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.getElementById("seat").innerHTML = user.seatList.join(" ");
}

async function renderItem() {
  await checkUser();
  let items = await getList(apiItems);
  items.forEach((item) => {
    if (currentItem.includes(item.id)) {
      var id = currentItem.indexOf(item.id);
      console.log(currentQuantity[id]);
      var html = `
      <tr class="tbody_row row py-2 justify-content-between gap-0 gap-md-2">
        <td class="t_item col-md-6 col-6 name_item">${item.name}</td>
        <td class="t_item col-md-2 col-2 text-center price_item">${item.price}</td>
        <td class="t_item col-md-3 col-3 d-inline-flex justify-content-end quantity_item"><span class="remove_button"><i class="bi bi-dash-circle px-2"></i></span><span class="quantity">${currentQuantity[id]}</span><span class="add_button"><i class="bi bi-plus-circle px-2"></i></span></td>
      </tr>
    `;
    } else {
      var html = `
        <tr class="tbody_row row py-2 justify-content-between gap-0 gap-md-2">
          <td class="t_item col-md-6 col-6 name_item">${item.name}</td>
          <td class="t_item col-md-2 col-2 text-center price_item">${item.price}</td>
          <td class="t_item col-md-3 col-3 d-inline-flex justify-content-end quantity_item"><span class="remove_button"><i class="bi bi-dash-circle px-2"></i></span><span class="quantity">0</span><span class="add_button"><i class="bi bi-plus-circle px-2"></i></span></td>
        </tr>
      `;
    }
    if (item.category === "corn") {
      document.getElementById("corn").innerHTML += html;
    } else if (item.category === "combo") {
      document.getElementById("combo").innerHTML += html;
    } else if (item.category === "drink") {
      document.getElementById("drink").innerHTML += html;
    } else {
      document.getElementById("bottle").innerHTML += html;
    }
  });
}
