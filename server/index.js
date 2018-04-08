var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
const config = require('./config.js');
const axios = require('axios');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.get('/search', function(req, res) {
    //get the search genre     

    //https://www.themoviedb.org/account/signup

    // use this endpoint to search for movies by genres, you will need an API key

    //https://developers.themoviedb.org/3/discover/movie-discover

    //and sort them by horrible votes using the search parameters in the API
  const movieDB = 'https://api.themoviedb.org/3/discover/movie'
  let params = {
    api_key: config.API_KEY,
    sort_by: 'popularity.desc'
  };
  axios.get(movieDB, {
    params: params
  })
    .then((resp) => {
      console.log('resp is', resp.data);
      res.send(resp.data);
    })
    .catch((err) => {
      console.log('error is', err);
      res.send(err);
    })
})

app.get('/genres', function(req, res) {
    //make an axios request to get the list of official genres

    // from this endpoint https://developers.themoviedb.org/3/genres/get-movie-list which needs your api key

    //send back
})

app.post('/save', function(req, res) {

})

app.post('/delete', function(req, res) {

})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});