import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
  	}
    this.getMovies = this.getMovies.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  getMovies(genre) {
    Axios.get('/search', {params: {genre: genre}})
        .then(resp => {
          this.setState({
            movies: resp.data.results
          })
        })
        .catch(err => console.log('err getting:', err))
  }

  saveMovie(movie) {
    // console.log('trying to save movie', movie)
    Axios.post('/save', movie)
      .then(resp => {
        console.log('resp from saving is', resp);
        this.getFaves();
      })
      .catch(err => console.log('error trying to save movie', err))
  }

  deleteMovie(movie) {
    // console.log('trying to delete movie', movie)
    Axios.post('/delete', movie)
      .then(resp => {
        console.log('resp from deleting is', resp)
        this.getFaves();
      })
      .catch(err => console.log('error trying to save movie', err))
  }

  getFaves() {
    Axios.get('/faves')
      .then(resp => {
        console.log('resp from getting faves is', resp.data);
        this.setState({
          favorites: resp.data
        }, () => console.log('current faves are', this.state.favorites))
      })
      .catch(err => console.log('error trying to get faves', err))
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  componentDidMount() {
    this.getMovies('12')
    this.getFaves()
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} searchGenre={this.getMovies}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
        saveFave={this.saveMovie} deleteFave={this.deleteMovie}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));