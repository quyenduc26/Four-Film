function cancelCreate() {
	document.getElementById("create-form").style.display = "none";
  }
  function showCreateForm() {
	document.getElementById("create-form").style.display = "block";
  }

  function createMovie() {
	var movie = {
	  src: document.getElementById("movie-image").value,
	  title: document.getElementById("movie-name").value,
	  author: document.getElementById("movie-author").value,
	  yearOfRelease: document.getElementById("movie-year").value,
	  countryOfManufacture: document.getElementById("movie-country").value,
	  actor: document.getElementById("movie-actors").value,
	  type: document.getElementById("movie-type").value,
	  category: document.getElementById("movie-category").value,
	  describe: document.getElementById("movie-description").value,
	  watchLink: document.getElementById("movie-link").value,
	};

	axios
	  .post("https://65180651582f58d62d355368.mockapi.io/Movies", movie)
	  .then(function (response) {
		// Tạo phim thành công, làm mới danh sách phim
		getMovies();
		document.getElementById("create-form").style.display = "none";
	  })
	  .catch(function (error) {
		console.error("Lỗi khi tạo phim:", error);
	  });
  }

  function deleteMovie(id) {
	axios
	  .delete(`https://65180651582f58d62d355368.mockapi.io/Movies/${id}`)
	  .then(function (response) {
		// Xóa phim thành công, làm mới danh sách phim
		getMovies();
	  })
	  .catch(function (error) {
		console.error("Lỗi khi xóa phim:", error);
	  });
  }

  // ...

  function showUpdateForm(id) {
	localStorage.setItem("idFilmAdmin", id);
	axios
	  .get(`https://65180651582f58d62d355368.mockapi.io/Movies/${id}`)
	  .then(function (response) {
		var movie = response.data;
		document.getElementById("update-movie-name").value = movie.title;
		document.getElementById("update-movie-author").value = movie.author;
		document.getElementById("update-movie-year").value =
		  movie.yearOfRelease;
		document.getElementById("update-movie-country").value =
		  movie.countryOfManufacture;

		  document.getElementById("overlay").style.display = "block";
		  document.getElementById("modal").style.display = "block";
	  })
	  .catch(function (error) {
		console.error("Lỗi khi lấy thông tin phim:", error);
	  });
  }

  function hideModal() {
	document.getElementById("overlay").style.display = "none";
  }

  function updateMovie() {
	var id = localStorage.getItem("idFilmAdmin");

	var movie = {
	  title: document.getElementById("update-movie-name").value,
	  author: document.getElementById("update-movie-author").value,
	  yearOfRelease: document.getElementById("update-movie-year").value,
	  countryOfManufacture: document.getElementById("update-movie-country")
		.value,
	};

	axios
	  .put(
		`https://65180651582f58d62d355368.mockapi.io/Movies/${id}`,
		movie
	  )
	  .then(function (response) {
		hideModal();
		getMovies();
		// Thực hiện các thao tác cần thiết khi cập nhật phim thành công
		// Ví dụ: load lại danh sách phim
	  })
	  .catch(function (error) {
		console.error("Lỗi khi cập nhật phim:", error);
	  });
  }

  // ...

  function getMovies() {
	axios
	  .get("https://65180651582f58d62d355368.mockapi.io/Movies")
	  .then(function (response) {
		var movies = response.data;
		var tableBody = document.getElementById("movie-table-body");
		tableBody.innerHTML = "";

		for (var i = 0; i < movies.length; i++) {
		  var movie = movies[i];
		  var row = `<tr>
				<td>${movie.id}</td>
				<td class="imgtd"><img class="imgAdmin" src="${movie.src}"></td>
				<td>${movie.title}</td>
				<td>${movie.author}</td>
				<td>${movie.yearOfRelease}</td>
				<td class="country">${movie.countryOfManufacture}</td>
				<td class="k"><button class="delete-button" onclick="deleteMovie(${movie.id})"><i class="fa-solid fa-trash"></i></button>
				  <button class="update-button" onclick="showUpdateForm(${movie.id})"><i class="fa-solid fa-wrench"></i></button>
				  </td>

			  </tr>`;
		  tableBody.innerHTML += row;
		}

		document.getElementById("create-form").style.display = "none";
		document.getElementById("movie-table").style.display = "block";
	  })
	  .catch(function (error) {
		console.error("Lỗi khi lấy danh sách phim:", error);
	  });
  }

  // Load danh sách phim khi trang được tải
getMovies();
  
var buttonNavbar = document.getElementById('sidebarToggle')
var layoutSidenav = document.querySelector('#layoutSidenav_nav');

buttonNavbar.addEventListener('click', function () {
	layoutSidenav.classList.toggle("open");
})