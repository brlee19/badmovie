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
  }

  getMovies(genre) {
    //make an axios request to your server on the GET SEARCH endpoint
    const params = {genre: genre}; //genre will be the ID
    Axios.get('/search', {params: params})
      .then(resp => console.log('resp is', resp))
      .catch((err) => console.log('err in getMovies', err))
  }

  saveMovie() {
    //same as above but do something diff
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
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));