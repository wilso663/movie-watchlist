
//todo extract to env variable fil

const emptyMovieContainer = document.querySelector('.empty-movie-container')
const emptyWatchListContainer = document.querySelector('.emptylist-container')

const watchlistElement = document.querySelector('.watchlist-container')
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

if(getWatchList().size !== 0){
  watchList = getWatchList()
}

function addRemoveListeners(){
  let watchIcons = document.querySelectorAll('.watch-icon')
  watchIcons.forEach((item) => {
    item.addEventListener('click', (event) => {
      let index = parseInt(event.target.classList[1].slice(-1))
      removeFromWatchList(index)
    })
  })
}

function saveWatchList(){
  localStorage.setItem("wlist", JSON.stringify([...watchList]))
}

function getWatchList() {
  return new Map(JSON.parse(localStorage.getItem('wlist')))
}

function populateWatchList(watchlist) {
  if(watchlist.size === 0) {
    emptyWatchListContainer.classList.add('show')
    watchlistElement.innerHTML = ``
  } else if(watchList.size > 0) {
    emptyWatchListContainer.classList.remove('show')
    let watchString = ``
    let index = 0
    watchlist.forEach((movie) => {
      watchString += `
      <div class="movie-container">
        <div class="movie-poster">
          <img src="${movie.posterImg}"/>
        </div>
        <div class="movie-info">
          <div class="movie-rating">
            <h3>${movie.title}</h3><img src="./images/star-icon.svg" /><span>${movie.imdbRating}</span>
          </div>
          <div class="misc-info">
            <p class="watchtime">${movie.runtime}</p>
            <p class="genre">${movie.genre}</p>
            <span class="add-watchlist"><img class="watch-icon watch-icon-${index}" src="./images/minus-icon.svg""/>  
              <span>Watchlist</span>
            </span>
          </div>
          <p class="movie-plot">${movie.plot}
          </p>
        </div>
      </div>
      `
      index++
    })
    watchlistElement.innerHTML = watchString
    addRemoveListeners()
  }
}

function showRemoveNotification(movieTitle){
  if(watchList.has(movieTitle)){
    snackbar.innerHTML = `${movieTitle} removed`
  } else {
    snackbar.innerHTML = `Not in watchlist`
  }
  snackbar.className = "show"
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "")
  }, 2000)
}


function removeFromWatchList(index){
  let title = Array.from(watchList.keys())[index]
  showRemoveNotification(title)
  if(watchList.has(title)){
    watchList.delete(title)
    saveWatchList()
  }
  populateWatchList(watchList)
}

populateWatchList(watchList)
