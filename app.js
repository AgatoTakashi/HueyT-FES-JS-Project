const apikey = "c706a2e0&s"
const apiString = `http://www.omdbapi.com/?apikey=${apikey}&s=future`;
const searchResultsEl = document.querySelector('.results-list');

async function main () {
    const results = await fetch(`${apiString}`);
    const resultsArr = await results.json();
    console.log(resultsArr.Search)
    searchResultsEl.innerHTML = resultsArr.Search.map((movie) => 
        `<div class="card">
            <img src="${movie.Poster}" alt="Movie Poster" class="movie__poster--img" height="444" width="300">
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">${movie.Year}</h3>
            <p class="movie__id libre-barcode-128-regular">${movie.imdbID}</p>
        </div>`);
}

main();