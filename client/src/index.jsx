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
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    // whats missing?
    this.swapFavorites = this.swapFavorites.bind(this)
    this.getMovies = this.getMovies.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
  }

  getMovies(genre) {
    Axios.get('/search', {params: {genre: genre}})
        .then(resp => {
          // console.log('resp FROM APP GET MOVIES IS', resp)
          this.setState({
            movies: resp.data.results
          }, () => {
            // console.log('this.state.movies is now', this.state.movies)
          })
        })
        .catch(err => console.log('err getting:', err))
  }

  saveMovie() {
    //same as above but do something diff
    alert('trying to save movie!');
    console.log('trying to save movie', this.state.movies[0])
    Axios.post('/save', this.state.movies[0])
      .then(resp => console.log('resp from saving is', resp))
      .catch(err => console.log('error trying to save movie', err))
  }

  deleteMovie() {
    //same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  componentDidMount() {
    this.getMovies('12')
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} searchGenre={this.getMovies}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
        saveFave={this.state.saveMovie}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));