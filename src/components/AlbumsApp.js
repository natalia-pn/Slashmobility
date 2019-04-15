import React, { Component } from 'react';
import AlbumsList from './AlbumsList';

class AlbumsApp extends Component {
  
  render() {
    const { resultsArray, selectFavourites } = this.props;
    
    return (
      <div className="App">
        <main className="Main-section">
          <AlbumsList    
            resultsArray={resultsArray}
            selectFavourites={selectFavourites} />
        </main>
      </div>
    );
  }
}

export default AlbumsApp;
