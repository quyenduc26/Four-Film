//Navbar
document.addEventListener('DOMContentLoaded',function(){
  const signupButton = document.getElementById("post")
  const singupMobile = document.getElementById('singupMobile')
    const signupModal = document.getElementById("signup-modal")
    var icon = document.getElementById('icon_eye')
    var iconRegister = document.getElementById('icon_eyes')
    var checkbox = document.getElementById('checked_icon')
    var checkboxRegister = document.getElementById('checked-eye')
    var emailPost = document.getElementById('email')
    var showPassword = document.getElementById('password')
    const register_link = document.getElementById('registerLink')
    const registerModal = document.getElementById("register-modal")
    var passwordData1 = document.getElementById('passwordFirst');
    var passwordData2 = document.getElementById('passwordSecond');
    var registerButton = document.getElementById('registerButton')
    var emailRegister = document.getElementById('emailRegister')
    var checkboxRegisterSecond = document.getElementById('checked-eye-second')
    var iconRegisterSecond = document.getElementById("icon_eyes_second")
  var fullNameUser = document.getElementById("fullName")
  var notificationModal = document.getElementById('notification')
  var home = document.getElementById('home')
  var next = document.getElementById('next')
    var accountListJSON = localStorage.getItem("accountList");
    var accountList = accountListJSON ? JSON.parse(accountListJSON) : [];

  singupMobile.addEventListener('click', function() {
    signupModal.style.display = "block";
    menuMobile.classList.toggle("open");

  })
    
    signupButton.addEventListener("click", function() {
      signupModal.style.display = "block";
    });
    
    signupModal.addEventListener("click", function(event) {
      if (event.target === signupModal) {
        signupModal.style.display = "none";
      }
    });
    
    checkbox.addEventListener("change",function(){
      if(icon.classList.contains('fa-eye-slash')){
        icon.classList.remove('fa-eye-slash')
        icon.classList.add("fa-eye")
      }
      else{
        icon.classList.remove("fa-eye")
        icon.classList.add('fa-eye-slash')
      }
    
      icon.classList.contains("fa-eye")? showPassword.type = 'text': showPassword.type ='password'
    })
  
    checkboxRegister.addEventListener("change",function(){
      if(iconRegister.classList.contains('fa-eye-slash')){
        iconRegister.classList.remove('fa-eye-slash')
        iconRegister.classList.add("fa-eye")
      }
      else{
        iconRegister.classList.remove("fa-eye")
        iconRegister.classList.add('fa-eye-slash')
      }
    
      iconRegister.classList.contains("fa-eye")? passwordData1.type = 'text': passwordData1.type ='password'
    })
  
    checkboxRegisterSecond.addEventListener("change",function(){
      if(iconRegisterSecond.classList.contains('fa-eye-slash')){
        iconRegisterSecond.classList.remove('fa-eye-slash')
        iconRegisterSecond.classList.add("fa-eye")
      }
      else{
        iconRegisterSecond.classList.remove("fa-eye")
        iconRegisterSecond.classList.add('fa-eye-slash')
      }
    
      iconRegisterSecond.classList.contains("fa-eye")? passwordData2.type = 'text': passwordData2.type ='password'
    })
    
    register_link.addEventListener('click',function(event){
      event.preventDefault()
      signupModal.style.display="none"
      registerModal.style.display="block"
    })
    registerModal.addEventListener('click',function(event){
      if(event.target === registerModal){
        registerModal.style.display ='none'
        signupModal.style.display ="block"
      }
    })
    const apiURL = 'https://65180651582f58d62d355368.mockapi.io/MainStorage';
    document.getElementById('postButton').addEventListener('click', function(event) {

      const errorPost = document.getElementById('errorPost');
    
      if (emailPost.value === '' || showPassword.value === '') {
        errorPost.innerHTML = 'Vui lòng điền đầy đủ thông tin';
      } else {
        fetch(apiURL)
          .then(response => response.json())
          .then(data => {
            const foundUser = data.find(user =>showPassword.value === user.password && user.infoAccount === emailPost.value);
            if (foundUser) {

              let userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
              let a = [showPassword.value,emailPost.value]
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              userInfo.push(a);
              localStorage.setItem('userInfo', JSON.stringify(userInfo));


              const iconUser = `<a href="Feature_profile_quyen.html"><i class="fa-solid fa-user" id="iconUser"></i></a>`;
              document.getElementById('changeItem').innerHTML = iconUser;
              signupModal.style.display = 'none';
              
            } else {
              errorPost.innerHTML = 'Sai email hoặc mật khẩu';
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
    
    document.getElementById('registerButton').addEventListener('click', function(event) {
      event.preventDefault();
    
      const email = document.getElementById('emailRegister').value;
      const fullName = document.getElementById('fullName').value;
      const passwordFirst = document.getElementById('passwordFirst').value;
      const passwordSecond = document.getElementById('passwordSecond').value;
      const errorEmail = document.getElementById('errorEmail');
      const errorFullname = document.getElementById('errorFullname');
      const errorPassword = document.getElementById('errorPassword');
    
      errorEmail.innerText = '';
      errorFullname.innerText = '';
      errorPassword.innerText = '';
    
      let isValid = true;
    
      if (fullName === '') {
        errorFullname.innerText = 'Vui lòng nhập tên.';
        isValid = false;
      }
    
      if (email === '') {
        errorEmail.innerText = 'Vui lòng nhập email.';
        isValid = false;
      } else if (!isValidEmail(email)) {
        errorEmail.innerText = 'Email không hợp lệ.';
        isValid = false;
      }
    
      if (passwordFirst === '') {
        errorPassword.innerText = 'Vui lòng nhập mật khẩu.';
        isValid = false;
      } else if (!isValidPassword(passwordFirst)) {
        errorPassword.innerText = 'Mật khẩu từ 8 kí tự và chứa A-Z, a-z, 1-9 và kí tự đặc biệt.';
        isValid = false;
      } else if (passwordFirst !== passwordSecond) {
        errorPassword.innerText = 'Hai mật khẩu không khớp.';
        isValid = false;
      }
    
      if (isValid) {
        const newUser = {
          userAccount: fullName,
          infoAccount:email,
          password: passwordFirst,     
        };
    
        fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
          .then(response => response.json())
          .then(data => {
            notificationModal.style.display = 'block';
            document.getElementById('notificationContent').innerHTML = 'Chúc mừng bạn đăng ký thành công!';
            registerModal.style.display = 'none';
            const iconUser = `<a href="Feature_profile_quyen.html"><i class="fa-solid fa-user" id="iconUser"></i></a>`;
            document.getElementById('changeItem').innerHTML = iconUser;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    }
  const displayMenu = document.getElementById('displayMenuMobile')
  const menuMobile = document.getElementById('headerSidebar')
  displayMenu.addEventListener('click', () => {
    menuMobile.classList.toggle("open");
  })
  menuMobile.addEventListener("click", function(event) {
    if (event.target === menuMobile) {
      menuMobile.classList.toggle("open");
    }
  });
  home.addEventListener('click', () => {
    notificationModal.style.display ='none'
  })
  next.addEventListener('click', () => {
    notificationModal.style.display = 'none'
  })
  })

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Home
//Tạomộtmảng chứa thông tin về các phim
var movies = [
  {
    id: 'p1',
    src: "https://bizweb.dktcdn.net/100/330/208/files/hinh-nen-kimetsu-yaiba-ngau-6-1.jpg?v%5Cu003d1649906743187",
    alt: "Movie 1",
    title: "Thanh gương diệt quỷ",
    describe: "Thanh Gươm Diệt Quỷ - phần phim tại Phố Đèn Đỏ cuối cùng cũng đã kết thúc. Sau trận chiến khốc liệt, Tanjiro và Uzui đã thành công chặt đầu Gyutaro. Trong khi đó, Zenitsu và Inosuke hợp sức chặt đầu Daki cùng một lúc. Tuy nhiên, Gyutaro đã giải phóng Huyết thuật của mình và bao phủ khắp toàn bộ khu vực. Tanjiro tỉnh dậy và hội ngộ cùng Nezuko và Zenitsu, nhưng Inosuke và Uzui đang cận kề cái chết vì bị Gyutaro đầu độc.",
    episodes: "Tập 24",
    watchLink: "https://pops.vn/video/thanh-guom-diet-quy-s2-ky-vien-tran-long-tieng-tap-11-du-co-trai-qua-bao-nhieu-vong-luan-hoi-622b084363105c00593da4a8", // Liên kết xem phim 1
    category: 'anime',
    anotherName: "Kimetsu no YaibaLưỡi gươm diệt quỷDiệt quỷ cứu nhân",
    countryOfManufacture: "japan",
    yearOfRelease: '2019',
    type: "Phiêu lưu - mạo hiểm - kịch tính",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  },
  {
    id: 'p2',
    src: "https://riki.edu.vn/wp-content/uploads/2019/10/14775-768x1121.jpg",
    alt: "Movie 1",
    title: "Lá thư gửi Momo (A letter to Momo)",
    describe: "“Lá thư gửi Momo” được công chiếu và giới thiệu lần đầu tiên vào năm 2011. Khi vừa ra mắt, bộ phim này đã tạo nên một làn sóng mới với hiệu ứng người xem rất tốt và nhanh chóng đạt được nhiều giải thưởng. Bộ phim hội tụ đủ mọi yếu tố: hài hước, phiêu lưu, thần thoại. Vừa ý nghĩa vừa có tính nhân văn sâu sắc. Hãy xem để nhận ra cuộc sống đáng quý và cần được nâng niu ra sao. Xem để sống chậm lại, nghĩ khác đi và yêu thương nhiều hơn…",
    episodes: "Tập 1",
    watchLink: "https://pops.vn/video/thanh-guom-diet-quy-s2-ky-vien-tran-long-tieng-tap-11-du-co-trai-qua-bao-nhieu-vong-luan-hoi-622b084363105c00593da4a8", // Liên kết xem phim 1
    category: 'anime',
    countryOfManufacture: "japan",
    yearOfRelease: '2010',
    type: "Phiêu lưu",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  },
  {
    id: 'p3',
    src: "https://th.bing.com/th/id/R.9082926e4c15ed8eb3d132d7b8d0d58b?rik=4djG0dLea0wG2A&pid=ImgRaw&r=0",
    alt: "Movie 1",
    title: "conan(Thám tử lừng danh)",
    describe: " Thám Tử Lừng Danh Conan được mua bản quyền và được cập nhật phát sóng mới nhất trên ứng dụng giải trí POPS. Đây là bộ phim hoạt hình chuyển thể từ truyện tranh hấp dẫn nhất: Thám Tử Lừng Danh Conan của tác giả Aoyama Gosho. Phim Conan kể về thần đồng 17 tuổi Shinichi Kudo - còn được biết đến với biệt danh “Cứu tinh của Sở Cảnh sát Nhật Bản” - người thường xuyên giúp lực lượng cảnh sát giải quyết các vụ án phức tạp.",
    episodes: "Tập 1",
    watchLink: "https://www.youtube.com/embed/CL_SiaJsm9Q", // Liên kết xem phim 1
    category: 'anime',
    countryOfManufacture: "japan",
    yearOfRelease: '2000',
    type: "Trinh thám",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  },
  {
    id: 'p4',
    src: "https://th.bing.com/th/id/R.9082926e4c15ed8eb3d132d7b8d0d58b?rik=4djG0dLea0wG2A&pid=ImgRaw&r=0",
    alt: "Movie 1",
    title: "conan(Thám tử lừng danh)",
    describe: " Thám Tử Lừng Danh Conan được mua bản quyền và được cập nhật phát sóng mới nhất trên ứng dụng giải trí POPS. Đây là bộ phim hoạt hình chuyển thể từ truyện tranh hấp dẫn nhất: Thám Tử Lừng Danh Conan của tác giả Aoyama Gosho. Phim Conan kể về thần đồng 17 tuổi Shinichi Kudo - còn được biết đến với biệt danh “Cứu tinh của Sở Cảnh sát Nhật Bản” - người thường xuyên giúp lực lượng cảnh sát giải quyết các vụ án phức tạp.",
    episodes: "Tập 1",
    watchLink: "https://www.youtube.com/embed/CL_SiaJsm9Q", // Liên kết xem phim 1
    category: 'phim chiếu rạp',
    countryOfManufacture: "japan",
    yearOfRelease: '2000',
    type: "Trinh thám",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  },
  {
    id: 'p5',
    src: "https://th.bing.com/th/id/R.9082926e4c15ed8eb3d132d7b8d0d58b?rik=4djG0dLea0wG2A&pid=ImgRaw&r=0",
    alt: "Movie 1",
    title: "conan(Thám tử lừng danh)",
    describe: " Thám Tử Lừng Danh Conan được mua bản quyền và được cập nhật phát sóng mới nhất trên ứng dụng giải trí POPS. Đây là bộ phim hoạt hình chuyển thể từ truyện tranh hấp dẫn nhất: Thám Tử Lừng Danh Conan của tác giả Aoyama Gosho. Phim Conan kể về thần đồng 17 tuổi Shinichi Kudo - còn được biết đến với biệt danh “Cứu tinh của Sở Cảnh sát Nhật Bản” - người thường xuyên giúp lực lượng cảnh sát giải quyết các vụ án phức tạp.",
    episodes: "Tập 1",
    watchLink: "https://www.youtube.com/embed/CL_SiaJsm9Q", // Liên kết xem phim 1
    category: 'âm nhạc',
    countryOfManufacture: "japan",
    yearOfRelease: '2000',
    type: "Trinh thám",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  },
  {
    id: 'p6',
    src: "https://th.bing.com/th/id/R.9082926e4c15ed8eb3d132d7b8d0d58b?rik=4djG0dLea0wG2A&pid=ImgRaw&r=0",
    alt: "Movie 1",
    title: "conan(Thám tử lừng danh)",
    describe: " Thám Tử Lừng Danh Conan được mua bản quyền và được cập nhật phát sóng mới nhất trên ứng dụng giải trí POPS. Đây là bộ phim hoạt hình chuyển thể từ truyện tranh hấp dẫn nhất: Thám Tử Lừng Danh Conan của tác giả Aoyama Gosho. Phim Conan kể về thần đồng 17 tuổi Shinichi Kudo - còn được biết đến với biệt danh “Cứu tinh của Sở Cảnh sát Nhật Bản” - người thường xuyên giúp lực lượng cảnh sát giải quyết các vụ án phức tạp.",
    episodes: "Tập 1",
    watchLink: "https://www.youtube.com/embed/CL_SiaJsm9Q", // Liên kết xem phim 1
    category: 'thể thao',
    countryOfManufacture: "japan",
    yearOfRelease: '2000',
    type: "Trinh thám",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  },
  {
    id: 'p7',
    src: "https://th.bing.com/th/id/R.9082926e4c15ed8eb3d132d7b8d0d58b?rik=4djG0dLea0wG2A&pid=ImgRaw&r=0",
    alt: "Movie 1",
    title: "conan(Thám tử lừng danh)",
    describe: " Thám Tử Lừng Danh Conan được mua bản quyền và được cập nhật phát sóng mới nhất trên ứng dụng giải trí POPS. Đây là bộ phim hoạt hình chuyển thể từ truyện tranh hấp dẫn nhất: Thám Tử Lừng Danh Conan của tác giả Aoyama Gosho. Phim Conan kể về thần đồng 17 tuổi Shinichi Kudo - còn được biết đến với biệt danh “Cứu tinh của Sở Cảnh sát Nhật Bản” - người thường xuyên giúp lực lượng cảnh sát giải quyết các vụ án phức tạp.",
    episodes: "Tập 1",
    watchLink: "https://www.youtube.com/embed/CL_SiaJsm9Q", // Liên kết xem phim 1
    category: 'phim bộ',
    countryOfManufacture: "japan",
    yearOfRelease: '2000',
    type: "Trinh thám",
    author: 'Đặng vĂn Sinh',
    actor: "sinh-loan-anh-quyền"
  }
];

localStorage.setItem('listMovies', JSON.stringify(movies));
var movies = JSON.parse(localStorage.getItem('listMovies')) || [];

var carouselIndicators = document.querySelector(".carousel-indicators");
var carouselInner = document.querySelector(".carousel-inner");

movies.forEach(function (movie, index) {
  var indicatorButton = document.createElement("button");
  indicatorButton.category = "button";
  indicatorButton.dataset.bsTarget = "#carouselExampleIndicators";
  indicatorButton.dataset.bsSlideTo = index;
  indicatorButton.setAttribute("aria-label", "Slide " + (index + 1));

  if (index === 0) {
    indicatorButton.classList.add("active");
    indicatorButton.setAttribute("aria-current", "true");
  }

  carouselIndicators.appendChild(indicatorButton);

  var carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");

  if (index === 0) {
    carouselItem.classList.add("active");
  }

  var image = document.createElement("img");
  image.classList.add("d-block", "w-100", "img");
  image.src = movie.src;
  image.alt = movie.alt;

  var caption = document.createElement("div");
  caption.classList.add("carousel-caption");

  var title = document.createElement("h5");
  title.textContent = movie.title;

  var subtitle = document.createElement("p");
  subtitle.textContent = movie.caption;

  var watchLink = document.createElement("a");
  watchLink.classList.add("btn", "btn-primary");
  watchLink.href = movie.watchLink; // Gắn liên kết xem phim
  var icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-play", "icon");
  var watchText = document.createTextNode("Xem ngay"); // Nội dung nút "Xem ngay"
  watchLink.appendChild(watchText);
  watchLink.insertBefore(icon, watchLink.firstChild);

  caption.appendChild(title);
  caption.appendChild(subtitle);
  caption.appendChild(watchLink); // Thêm nút "Xem ngay" vào caption

  carouselItem.appendChild(image);
  carouselItem.appendChild(caption);

  carouselInner.appendChild(carouselItem);
});

// Khởi tạo carousel
var carousel = new bootstrap.Carousel(
  document.querySelector("#carouselExampleIndicators"),
  {
    interval: 5000, // Đặt thời gian trôi qua giữa các slide là 5 giây
    wrap: true, // Cho phép trượt vòng qua các slide
  }
);
movies.forEach(function (movie) {
  if (movie.category === 'phim bộ') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
    document.getElementById('series').innerHTML += movieMemory
  }
  else if (movie.category === 'âm nhạc') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
    document.getElementById('music').innerHTML += movieMemory
  }
  else if (movie.category === 'anime') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
    document.getElementById('anime').innerHTML += movieMemory
  }
  else if (movie.category === 'thể thao') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
    document.getElementById('sport').innerHTML += movieMemory
  }
  else if (movie.category === 'phim chiếu rạp') {
    var movieMemory = `
    <div class="card" style="width: 12rem; height: 20rem; background-color:black;margin-right: 10px;" data-id="${movie.id}">
    <img id="watching" src="${movie.src}" class="card-img-top" alt="..." style="height: 15rem;object-fit: cover;">
    <div class="card-body" style="padding: 10px 0px">
      <p class="card-text" style="color:white; text-align:left">${movie.title}</p>
    </div>
  </div> `
    document.getElementById('theaters').innerHTML += movieMemory
  }
})


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Slider
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderItemWidth = sliderItems[0].offsetWidth + 1; // Lấy kích thước mỗi phần tử và margin-right

let currentPosition = 0;

const moveSlider = () => {
  const maxPosition = 0;
  const minPosition = -(sliderItems.length - 1) * sliderItemWidth;
  if (currentPosition > maxPosition) {
    currentPosition = maxPosition;
  }
  if (currentPosition < minPosition) {
    currentPosition = minPosition;
  }
  slider.style.transform = `translateX(${currentPosition}px)`;
};

prevButton.addEventListener('click', () => {
  currentPosition += sliderItemWidth;
  moveSlider();
});

nextButton.addEventListener('click', () => {
  currentPosition -= sliderItemWidth;
  moveSlider();

  // Kiểm tra nếu đạt đến phần tử cuối cùng
  if (currentPosition <= -(sliderItems.length - 6) * sliderItemWidth) {
    currentPosition = -(sliderItems.length -6.4 ) * sliderItemWidth;
  }
});
  

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Profile
const getUserList = require('Feature_profile_quyen.js');
console.log(start());