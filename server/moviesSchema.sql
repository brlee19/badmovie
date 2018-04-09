CREATE DATABASE movies;

USE movies;

CREATE TABLE faves (
  id INT not null UNIQUE,
  poster_path VARCHAR(2550),
  title VARCHAR(255) not null,
  overview VARCHAR(2550),
  release_date VARCHAR(140),
  vote_average VARCHAR(140) not null,
  vote_count INT,
  primary key (id)
);

/*
mysql -u root < server/schema.sql
*/
