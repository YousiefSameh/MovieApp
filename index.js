let API_KEY = "api_key=c2801f8a9910c955bc50364436c8cdd5";
let BASE_URL = "https://api.themoviedb.org/3";
let API_URL = BASE_URL + "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" + API_KEY;

let IMG_URL = "https://image.tmdb.org/t/p/w500";
let searchURL = BASE_URL + "/search/movie?" + API_KEY;
const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

function getMovies(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.results);
    showMovies(data.results);
  })
}

function showMovies(movies) {
  // Clear Main
  main.innerHTML = "";
  // Loop Movies
  movies.forEach(movie => {
    const {poster_path, title, vote_average, overview} = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview:</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieEl);
  })
}


getMovies(API_URL);

function getClassByRate(vote) {
  if (vote >= 8) return "green";
  else if (vote >= 5) return "orange";
  else return "red";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
})