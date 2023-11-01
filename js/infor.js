let apiMainStorage = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
let apiItems = 'https://65300e576c756603295e2eec.mockapi.io/Items';
let user;
let currentTrans = [];
let movie_name = 'Avatar 2: The Way of Water';
let time = '8PM 6/11/2023'
let itemContent = '';
let cinema = JSON.parse(localStorage.getItem('cinema'));


document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('infor_section').style.color = 'var(--button)';
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let email = userInfo[0][1];
    let password = userInfo[0][0];
    let dataUser = await getList(apiMainStorage);
    let dataCorn = await getList(apiItems);
    user = dataUser.find(user => email === user.email && user.password === password);
    for (let i = 0; i < user.consumeList.length; i++) {
      item = dataCorn.find(item => user.consumeList[i] === item.id );
      console.log(item)
      if( i < user.consumeList.length - 1){
        itemContent += user.quantityItem[i] + ' ' + item.name + ' , ';
      }
      else{
        itemContent += user.quantityItem[i] + ' ' + item.name
      }
      console.log(itemContent)
      
    }
    console.log(user);
    document.getElementById('movie_name').textContent = movie_name;
    document.getElementById('seats').textContent = user.seatList;
    document.getElementById('corn').textContent = itemContent;
    document.getElementById('price').textContent = user.transactionList[user.transactionList.length - 1].toLocaleString('vi-VN',{
      style: 'currency',
      currency: 'VND'
    });
    document.getElementById('paymt').textContent = 'MOMO Pay'

    currentTrans.push(user.transactionList.length + 1);
    currentTrans.push(cinema);
    currentTrans.push(movie_name);
    currentTrans.push(user.seatList);
    currentTrans.push(user.itemContent);
    currentTrans.push(time);
    console.log(currentTrans)



});

async function getOrder(){ 
    const serviceID = 'default_service';
    const templateID = 'template_0g8qxcr';
    var infor = "Tên khách hàng: " + user.fullname;
    infor += "\n\nSố điện thoại: " + user.phoneNumber;
    infor += "\n\nTên rạp: " + cinema;
    infor += "\n\nTên phim: " + movie_name;
    infor += "\n\nGhế đã đặt: " + user.seatList;
    infor += "\n\nThời gian: " + time;
    infor += "\n\nTổng đơn: " + user.transactionList[user.transactionList.length - 1].toLocaleString('vi-VN',{
        style: 'currency',
        currency: 'VND'
    });
    infor += "\n\nThanh toán: Đã thanh toán " ;
    emailjs.send(serviceID, templateID, { message: infor, email:user.email})
     .then(() => {
       alert('Sent!');
     }, (err) => {
       alert(JSON.stringify(err));
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

