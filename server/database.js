const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});

connection.connect();

const getAllFavorites = function(callback) {
  connection.query('SELECT * FROM FAVES', function(err, results, fields) {
    // console.log('results from fave query', results);
    callback(err, results, fields);
  });
};
const saveFavorite = function(params, callback) {
  let queryStr = 'insert into faves(id, poster_path, title, overview, release_date, vote_average, vote_count)\
  values(?, ?, ?, ?, ?, ?, ?)'
  connection.query(queryStr, params, (err, results, fields) => {
    callback(err, results, fields);
  });
};

const deleteFavorite = function(params, callback) {
  let queryStr = 'DELETE FROM faves WHERE id = ?'
  connection.query(queryStr, params, (err, results, fields) => {
    callback(err, results, fields);
  })
};
module.exports = {
  connection: connection,
  getAllFavorites: getAllFavorites,
  saveFavorite: saveFavorite,
  deleteFavorite: deleteFavorite
};