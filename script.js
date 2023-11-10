const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))


var myDropdown = document.getElementById('myDropdown')
myDropdown.addEventListener('show.bs.dropdown', function () {
  // do something...
})



function printMovies(movies) {
    $("#movie-list").html("");
    movies.forEach((movie) => {
        $("#movie-list").append(`<li data-grade="${movie.grade}" data-title="${movie.title}">
            ${movie.title}
            <img src="images/delete.png" alt="Delete movie" class="delete-movie">
            ${getStars(movie.grade)}
        </li>`);
    });
}

function loadMovies() {
    const movies = localStorage.movies;
    if (movies == undefined) {
        return [];
    }
    return JSON.parse(movies);
}


function saveMovies(movies) {
    let jsonMovies = JSON.stringify(movies);
    localStorage.setItem("movies", jsonMovies);
}

$("#new-movie-form").on("submit", function (e) {
    e.preventDefault();

    const title = $("#title").val();
    const grade = $("#grade").val();

    if (title == "" || grade == "") {
        alert("Du måste ange både titel & betyg för att kunna spara filmen!")
        return false;
    }

    const movie = {
        title: title,
        grade: grade
    }

    const movies = loadMovies();
    movies.push(movie);

    $("#new-movie-form").trigger("reset");
    $("#new-movie-form")[0].reset();

    saveMovies(movies);
    printMovies(movies);
});




// Skriver ut filmerna i vår lista när sidan laddats klart
$(document).ready(function () {
    const movies = loadMovies();
    printMovies(movies);
});
