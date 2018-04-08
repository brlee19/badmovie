import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    }
    this.getGenres = this.getGenres.bind(this)
  }
  getGenres() {
    Axios.get('/genres')
      .then((genres) => {
        console.log('genres are:', JSON.stringify(genres.data.genres));
      })
      .catch((err) => {
        console.log('error in getGenres:', err);
      });
  }
  
  componentDidMount(){
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
{/* 


    Make the select options dynamic from genres !!!

    How can you tell which option has been selected from here?

*/}

        <select>
          {/* make this its own component???*/}
          <option value="theway">The Way</option>
          <option value="thisway">This Way</option>
          <option value="thatway">That Way</option>
        </select>
        <br/><br/>

        <button>Search</button>

      </div>)
  }
}

export default Search