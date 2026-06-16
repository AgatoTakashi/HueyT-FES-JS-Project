const apikey = "c706a2e0&s"
const searchResultsEl = document.querySelector('.results-list');

async function submitInput() {
    const inputElement = document.getElementById("userInput");
    const userValue = inputElement.value.trim();
    return renderSearch(userValue);
}

async function renderSearch (userValue) {
    const apiString = `http://www.omdbapi.com/?apikey=${apikey}&s=${userValue}`;
    const results = await fetch(`${apiString}`);
    const resultsArr = await results.json();
    console.log(resultsArr);
    searchResultsEl.innerHTML = resultsArr.Search.map(movie => postHTML(movie));
}

function postHTML(movie) {
    return `<div class="card">
            <img src="${movie.Poster}" alt="Movie Poster" class="movie__poster--img" height="444" width="300">
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">${movie.Year}</h3>
            <p class="movie__id libre-barcode-128-regular">${movie.imdbID}</p>
        </div>`
}