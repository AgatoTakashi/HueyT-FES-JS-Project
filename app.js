const apikey = "c706a2e0&s"
const searchResultsEl = document.querySelector('.results-list');
let sortMethod = 'Sort';

async function submitInput() {
    const inputElement = document.getElementById("userInput");
    const userValue = inputElement.value.trim();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    return renderSearch(userValue);
}

async function renderSearch(userValue) {
    try {
        searchResultsEl.innerHTML = `<i class="loading fas fa-spinner"></i>`;

        const apiString = `https://www.omdbapi.com/?apikey=${apikey}&s=${userValue}`;
        const results = await fetch(`${apiString}`);
        const resultsArr = await results.json();

        if (sortMethod === 'A_TO_Z') {
            const filteredArr = resultsArr.Search.sort((a, b) => a.Title.localeCompare(b.Title));
            searchResultsEl.innerHTML = filteredArr.slice(0,6).map(movie => postHTML(movie));
        }
        else if (sortMethod === 'Z_TO_A') {
            const filteredArr = resultsArr.Search.sort((a, b) => b.Title.localeCompare(a.Title));
            searchResultsEl.innerHTML = filteredArr.slice(0,6).map(movie => postHTML(movie));
        }
        else if (sortMethod === 'NEW_TO_OLD') {
            const filteredArr = resultsArr.Search.sort((a, b) => b.Year.slice(0,4) - a.Year.slice(0,4));
            searchResultsEl.innerHTML = filteredArr.slice(0,6).map(movie => postHTML(movie));
        }
        else if (sortMethod === 'OLD_TO_NEW') {
            const filteredArr = resultsArr.Search.sort((a, b) => a.Year.slice(0,4) - b.Year.slice(0,4));
            searchResultsEl.innerHTML = filteredArr.slice(0,6).map(movie => postHTML(movie));
        }
        else {
            searchResultsEl.innerHTML = resultsArr.Search.slice(0,6).map(movie => postHTML(movie));
        }
    } catch (err) {
        searchResultsEl.innerHTML = `<p class="error">Movie not found!</p>`;
    }
}

function postHTML(movie) {
    return `
        <div class="card">
            <img src="${movie.Poster}" alt="Movie Poster" class="movie__poster--img" height="444" width="300">
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">${movie.Year}</h3>
            <p class="movie__id libre-barcode-128-regular">${movie.imdbID}</p>
        </div>
    `
}

const input = document.getElementById("userInput");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitInput();
  }
});


function sortMovies(event) {
    sortMethod = event.target.value;
    submitInput();
}