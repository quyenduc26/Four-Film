function fetchData() {
    return fetch(
      "https://65180651582f58d62d355368.mockapi.io/MainStorage"
    ).then((response) => response.json());
  }

  function generatePDF() {
    fetchData()
      .then((data) => {
        const doc = new jsPDF();

        let yPos = 20;
        let pageHeight = doc.internal.pageSize.height;
        let currentPage = 1;

        data.forEach((user) => {
          doc.text(`Tên: ${user.name}`, 20, yPos);
          doc.text(`Email: ${user.email}`, 20, yPos + 10);
          doc.text(`Password: ${user.password}`, 20, yPos + 20);

          if (yPos + 40 > pageHeight) {
            doc.addPage();
            currentPage++;
            yPos = 20;
          } else {
            yPos += 40;
          }
        });

        const pdfDataUri = doc.output("datauristring");

        const downloadLink = document.createElement("a");
        downloadLink.href = pdfDataUri;
        downloadLink.download = "user_information.pdf";
        downloadLink.click();
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API:", error);
      });
  }

  const generatePdfBtn = document.getElementById("generatePdfBtn");
  generatePdfBtn.addEventListener("click", generatePDF);
             document.addEventListener("DOMContentLoaded", function() {
      var tableBody = document.querySelector("#user-table tbody");

      // Lấy danh sách người dùng từ API và hiển thị lên bảng
      fetch("https://65180651582f58d62d355368.mockapi.io/MainStorage")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var users = data;

          users.forEach(function(user) {
            var row = document.createElement("tr");

            // Hiển thị thông tin người dùng trong các ô cột
            var nameCell = document.createElement("td");
            nameCell.textContent = user.userAccount;
            row.appendChild(nameCell);

            var passwordCell = document.createElement("td");
            passwordCell.textContent = user.password;
            row.appendChild(passwordCell);

            var emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            // Tạo nút xóa người dùng
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Xóa";
            deleteButton.dataset.id = user.id;
            deleteButton.addEventListener("click", deleteUser);
            var actionCell = document.createElement("td");
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
          });
        });

      // Hàm xử lý sự kiện xóa người dùng
      function deleteUser() {
        var userId = this.dataset.id;

        fetch("https://65180651582f58d62d355368.mockapi.io/MainStora/" + userId, {
          method: "DELETE"
        })
          .then(function() {
            // Xóa hàng từ bảng
            var row = this.closest("tr");
            row.parentNode.removeChild(row);
          }.bind(this));
      }
             });
             var buttonNavbar = document.getElementById('sidebarToggle')
             var layoutSidenav = document.querySelector('#layoutSidenav_nav');
             
             buttonNavbar.addEventListener('click', function () {
                 layoutSidenav.classList.toggle("open");
             })