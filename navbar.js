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
            const iconUser = `<i class="fa-solid fa-user" id="iconUser"></i>`;
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
  