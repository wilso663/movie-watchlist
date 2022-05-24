
import API_KEY from './apikey.js'

const baseURL = "http://www.omdbapi.com/"

const emptyMovieContainer = document.querySelector('.empty-movie-container')
const emptyWatchListContainer = document.querySelector('.emptylist-container')

const movielistElement = document.querySelector('.movie-list')
const searchInputText = document.querySelector('.search-text')
const searchButton = document.querySelector('.search-button')
var watchList = new Map()

const dummyMovie = {
  posterImg: "../images/PosterImg.png",
  title: "Blade Runner",
  imdbRating: 8.1,
  runtime: "116 min",
  genre: "Drama, Mystery, Sci-fi",
  plot: "A blade runner must pursue and terminate four replications who stole a ship in space, and have returned to Earth to find their creator."
}
const dummyMovie2 = {
  posterImg: "../images/PosterImg.png",
  title: "Blade Runner 2",
  imdbRating: 8.1,
  runtime: "116 min",
  genre: "Drama, Mystery, Sci-fi",
  plot: "A #2 blade runner must pursue and terminate four replications who stole a ship in space, and have returned to Earth to find their creator."
}

var globalMovieList = []

if(getWatchList().size !== 0){
  watchList = getWatchList()
}

function getMovieQuery(title, flag){
  if(flag === "s")
    return `?s=${title.replace(" ", "+")}`
  else if (flag === "t")
    return `?t=${title.replace(" ", "+")}`
}

async function fetchMovie(title) {
  let response = await fetch(baseURL + getMovieQuery(title, "t") + API_KEY)
  let data = await response.json()
  let movie = {}
  data.then(() => {
    movie = {
      posterImg: data.Poster,
      title: data.Title,
      imdbRating: data.imdbRating,
      runtime: data.Runtime,
      genre: data.Genre,
      plot: data.Plot
    }
  }).then(() => {
    return movie
  })
       

}

function saveWatchList(){
  localStorage.setItem("wlist", JSON.stringify([...watchList]))
}

function getWatchList() {
  return new Map(JSON.parse(localStorage.getItem('wlist')))
}

function addWatchListeners(){
  let watchIcons = document.querySelectorAll('.watch-icon')
  watchIcons.forEach((item) => {
    item.addEventListener('click', (event) => {
      let index = parseInt(event.target.classList[1].slice(-1))
      addToWatchList(index)
    })
  })
}

function populateMovies(movieList) {
  if(movieList.length === 0){
    emptyMovieContainer.classList.add('show')
    movielistElement.innerHTML = ``
  } else if(movieList.length > 0) {
    emptyMovieContainer.classList.remove('show')

    let index = 0 //index is tied to globalMovieList index used in fetchMovies
    let movieStr = ``
    movieList.forEach((movie) => {
      movieStr += `
    <div class="movie-container">
      <div class="movie-poster">
        <img src="${movie.posterImg === 'N/A' ? 'https://via.placeholder.com/99x150.png?text=N/A': movie.posterImg}"/>
      </div>
      <div class="movie-info">
        <div class="movie-rating">
          <h3>${movie.title}</h3><img src="./images/star-icon.svg" /><span>${movie.imdbRating}</span>
        </div>
        <div class="misc-info">
          <p class="watchtime">${movie.runtime}</p>
          <p class="genre">${movie.genre}</p>
          <span class="add-watchlist"><img class="watch-icon watch-icon-${index}" src="./images/plus-icon.svg""/>  
            <span>Watchlist</span>
          </span>
        </div>
        <p class="movie-plot">${movie.plot.length > 180 ? movie.plot.slice(0,180)+"..." : movie.plot}
        </p>
      </div>
    </div>
      `
      index++
    })
    movielistElement.innerHTML = movieStr
    addWatchListeners()
  }
}

async function fetchMovies(title) {
  try{
  const response = await fetch(baseURL + getMovieQuery(title, "s") + API_KEY)
  const data = await response.json()
  let movieNames = []
  let numMovies = data.Search ? data.Search.length : 0
  for(let i = 0; i < numMovies; i++){
    movieNames.push(data.Search[i].Title)
  }
  // console.log(movieNames)
  globalMovieList = [] //reset movie data on each search
  for(const item of movieNames) {
    const res = await fetch(baseURL + getMovieQuery(item, "t") + API_KEY)
    const data1 = await res.json()
    let movie = {
      posterImg: data1.Poster,
      title: data1.Title,
      imdbRating: data1.imdbRating,
      runtime: data1.Runtime,
      genre: data1.Genre,
      plot: data1.Plot
    }
    globalMovieList.push(movie)
  }
  showSearchNotification(globalMovieList.length)
  populateMovies(globalMovieList)
  }catch(err){
    console.log(err)
  } 
}

function showAddNotification(movieTitle) {
  if(watchList.has(movieTitle)){
    snackbar.innerHTML = `Already in watchlist`
  } else {
    snackbar.innerHTML = `${movieTitle} watchlisted`
  }
  snackbar.className = "show"
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "")
  }, 2000)
} 

function showSearchNotification(number){
  snackbar.innerHTML = `${number} results found`
  snackbar.className = "show"
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "")
  }, 2000)
}

function addToWatchList(index){
  showAddNotification(globalMovieList[index].title)
  if(!watchList.has(globalMovieList[index].title)){
    watchList.set(globalMovieList[index].title, globalMovieList[index])
    saveWatchList()
  }
}

searchButton.addEventListener('click', (event) => {
  fetchMovies(searchInputText.value)
  searchInputText.value = ""
})

