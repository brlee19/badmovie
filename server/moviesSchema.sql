CREATE DATABASE movies;

USE movies;

CREATE TABLE faves (
  id INT not null UNIQUE,
  poster_path VARCHAR(255),
  title VARCHAR(140) not null,
  overview VARCHAR(255),
  release_date VARCHAR(140),
  vote_average VARCHAR(140) not null,
  vote_count INT,
  primary key (id)
);

/*
mysql -u root < server/schema.sql
*/
