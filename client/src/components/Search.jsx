import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: ''
    }
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  getGenres() {
    Axios.get('/genres')
      .then((resp) => {
        this.setState({genres: resp.data.genres});
      })
      .catch((err) => {
        console.log('error in getGenres:', err);
      });
  }
  
  componentDidMount(){
    this.getGenres();
  }

  search() {
    // Axios.get('/search', {params: {genre: this.state.selectedGenre}})
    //   .then(resp => console.log('resp is', resp))
    //   .catch(err => console.log('err searching:', err))
    this.props.searchGenre(this.state.selectedGenre);
  }

  handleChange(e) {
    this.setState({
      selectedGenre: e.target.value
    });
  }

  render() {
    if (!this.state.genres.length) {
      return (<div></div>)
    }
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <form>
          <select name='selectedGenre' value={this.state.value} onChange={this.handleChange}>
            {this.state.genres.map(genre => (<option value={genre.id.toString()} key={genre.id}>{genre.name}</option>))}
          </select>
        </form>
        <br/><br/>

        <button onClick={this.search}>Search</button>

      </div>)
  }
}

export default Search