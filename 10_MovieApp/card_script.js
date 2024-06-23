const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const titleElmnt = document.getElementById('title');
const genreElmnt = document.getElementById('genres');
const ratingElmnt = document.getElementById('rating');
const posterElmnt = document.getElementById('poster');
const descriptionElmnt = document.getElementById('description');
const castElmnt = document.getElementById('cast');
const buyBtn = document.getElementById('buy-btn');
const trailerBtn = document.getElementById('trailer-btn');


async function getMovie(url) {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData);

    chosenMovie = respData.results[Math.floor(Math.random()*respData.results.length)];

    console.log(chosenMovie);
    
    setMovie(chosenMovie);
}

async function setMovie(movieId) {
    const movAPI = `https://api.themoviedb.org/3/movie/${movieId}?api_key=04c35731a5ee918f014970082a0088b1`;
    const resp = await fetch(movAPI); 
    const respData = await resp.json(); 

    let genres = [];
    respData.genres.forEach((genre) => {
        const {id, name} = genre;
        genres.push(name);
    });
    let genreText = '';
    genres.forEach((genre) => {
        genreText += `${genre}, `;
    });
    genreText = genreText.slice(0,-2);
    genreElmnt.innerText = genreText;
    
    const fixed_vote_average = respData.vote_average.toFixed(1);
    titleElmnt.innerHTML = `${respData.title}<span>${fixed_vote_average} / 10</span>`;
    descriptionElmnt.innerText = respData.overview;
    posterElmnt.src = IMGPATH + respData.poster_path;
    document.body.style.backgroundImage = `url(${IMGPATH + respData.backdrop_path})`
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
}

async function getGenres(id) {
    let genres = [];
    const movAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1`;
    const resp = await fetch(movAPI); 
    const respData = await resp.json(); 

    respData.genres.forEach((genre) => {
        const {id, name} = genre;
        genres.push(name);
    });
    
    return genres;
}

function returnToApp() {
    window.location.href = "index.html";
}

function getQueryParamter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const movieId = getQueryParamter('id');
setMovie(movieId);