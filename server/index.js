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
  console.log('req is', req);
  // console.log(req.genre);
  // let genreId = '99';
  const movieDB = 'https://api.themoviedb.org/3/discover/movie'
  let params = {
    api_key: config.API_KEY,
    sort_by: 'vote_average.asc'
    // with_genres: genreId
  };
  axios.get(movieDB, {
    params: params
  })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      console.log('error is', err);
      res.send();
    })
})

app.get('/genres', function(req, res) {
  const movieGenres = 'https://api.themoviedb.org/3/genre/movie/list'
  let params = {
    api_key: config.API_KEY,
  };
  axios.get(movieGenres, {
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

app.post('/save', function(req, res) {

})

app.post('/delete', function(req, res) {

})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});