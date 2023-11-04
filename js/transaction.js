let apiMainStorage = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
let apiItems = 'https://65300e576c756603295e2eec.mockapi.io/Items';
let user;


document.addEventListener('DOMContentLoaded', async () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let email = userInfo[0][1];
    let password = userInfo[0][0];
    let dataUser = await getList(apiMainStorage);
    user = dataUser.find(user => email === user.email && user.password === password);
    console.log(user)
    for (let i = 0; i < user.transactionList.length ; i++) {
      let html = `
        <div class="transaction row py-2">
            <div class="col-md-1 col-1" id="id">${user.transactionList[i][0]}</div>
            <div class="col-md-5 col-5 text-start" id="movie">${user.transactionList[i][2]}</div>
            <div class="col-md-3 col-3 text-start" id="price">${user.transactionList[i][6].toLocaleString('vi-VN',{
              style: 'currency',
              currency: 'VND'
          })}</div>
            <button class="col-md-2 col-2 mx-2 p-0 rounded-1 text-light" style="background-color: var(--button); border: none;" ">Chi tiết</button>
        </div>
      `
      document.getElementById('transactions').innerHTML += html;
    }
    var detailButtons = document.querySelectorAll('button.text-light');
    detailButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            showDetail(this);
        });
    });

    function showDetail(button) {
        var transaction = button.parentElement;
        var id = parseInt(transaction.querySelector('#id').textContent) -1;
        var html = `
            <p class="movie_name">TÊN PHIM : ${user.transactionList[id][2]}</p>
            <p class="seats">GHẾ : ${user.transactionList[id][3].join(', ')} </p>
            <p class="corn">BẮP NƯỚC : ${user.transactionList[id][4]} </p>
            <p class="price">TỔNG ĐƠN : ${user.transactionList[id][6].toLocaleString('vi-VN',{
              style: 'currency',
              currency: 'VND'
          })} </p>
            <p class="pay_method">THANH TOÁN : Đã thanh toán </p>
        `;
        document.getElementById('detail').innerHTML = html;

    }

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

