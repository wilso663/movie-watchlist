# Stephen Wilson - Movie Watchlist

## Purpose
This app is meant to be a self directed exercise in 
1. Fetch API
2. Data Persistence with LocalStorage
## General Use
[Repository](https://github.com/wilso663/movie-watchlist)  
[Live Solution](https://wilso663.github.io/movie-watchlist/)

![image](/images/movies.png)

Users can
1) Type into the search for movie field and press the search button to populate the web app with movie data from the omdbapi
2) Add movies from the search to their watch list by clicking the plus icon next to add to watch list text
3) Look at the watchlist page

## Other Notes
While this app is meant for use on a desktop, it is responsive and will work on modern phone sizes and layouts.

Additionally, while I have removed the public API key from the repository, I'm aware that having it reinjected to the project via command line on the server still causes it to be exposed to the client in received network resources that any savvy person can view. However, because this is a free public API key that is shut off after more than 1000 uses in a day, I'm satisfied with the current obfuscation.
