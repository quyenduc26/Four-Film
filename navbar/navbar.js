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


    var user = {
      email : email,
      password : password,
      name: name,
  }
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
    document.getElementById('postButton').addEventListener('click',function(event){
      var list = JSON.parse(localStorage.getItem('accountList'));
  
      if (emailPost.value === "" || showPassword.value === "") {
        document.getElementById('errorPost').innerHTML = "Vui lòng điền đầy đủ thông tin";
      } else {
        var isFound = false;
      
        list.forEach(function(element) {
          if (element.password === showPassword.value && element.email === emailPost.value) {
            isFound = true;
          }
        });
      
        if (isFound) {
          var iconUser =`<i class="fa-solid fa-user" id="iconUser"></i>`
          document.getElementById('changeItem').innerHTML = iconUser;
          
          signupModal.style.display = 'none';
        } else {
          document.getElementById('errorPost').innerHTML = "Sai email hoặc mật khẩu";
        }
      }
    })
    document.getElementById("registerButton").addEventListener("click", function(event) {
      event.preventDefault();
    
      var email = document.getElementById("emailRegister").value;
      console.log(email);
      var fullName = document.getElementById("fullName").value;
      var passwordFirst = document.getElementById("passwordFirst").value;
      var passwordSecond = document.getElementById("passwordSecond").value;
    
      var errorEmail = document.getElementById("errorEmail");
      var errorFullname = document.getElementById("errorFullname");
      var errorPassword = document.getElementById("errorPassword");
    
      errorEmail.innerText = "";
      errorFullname.innerText = "";
      errorPassword.innerText = "";
    
      var isValid = true;
    
      if (fullName === "") {
        errorFullname.innerText = "Vui lòng nhập tên.";
        isValid = false;
      }
  if(JSON.parse(localStorage.getItem('accountList')) !== null){
    JSON.parse(localStorage.getItem('accountList')).forEach(function(nameUser){
      if(fullName === nameUser.name){
        errorFullname.innerText = "Tên đã tồn tại";
        isValid = false;
      }
    })
  }
      if (email === "") {
        errorEmail.innerText = "Vui lòng nhập email.";
        isValid = false;
      } else if (!isValidEmail(email)) {
        errorEmail.innerText = "Email không hợp lệ.";
        isValid = false;
      }
    
      if (passwordFirst === "") {
        errorPassword.innerText = "Vui lòng nhập mật khẩu.";
        isValid = false;
      } else if (!isValidPassword(passwordFirst)) {
        errorPassword.innerText = "Mật khẩu từ 8 kí tự và chứa A-Z, a-z, 1-9 và kí tự đặc biệt.";
        isValid = false;
      } else if (passwordFirst !== passwordSecond) {
        errorPassword.innerText = "Hai mật khẩu không khớp.";
        isValid = false;
      }
    
      if (isValid) {
          user.email = emailRegister.value
          user.password = passwordData2.value
          user.name = fullNameUser.value
          accountList.push(user);
          var updatedAccountListJSON = JSON.stringify(accountList);
        localStorage.setItem("accountList", updatedAccountListJSON);
        notificationModal.style.display = 'block'
        document.getElementById('notificationContent').innerHTML = "Chúc mừng bạn đăng ký thành công!"
        registerModal.style.display = 'none'
        var iconUser =`<i class="fa-solid fa-user" id="iconUser"></i>`
        document.getElementById('changeItem').innerHTML = iconUser;
      }

    });
    
    function isValidEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function isValidPassword(password) {
      // Kiểm tra mật khẩu có đủ 8 kí tự, chứa ít nhất một chữ hoa, một chữ thường, một số và một kí tự đặc biệt
      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
  