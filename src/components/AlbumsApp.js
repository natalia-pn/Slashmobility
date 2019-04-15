import React, { Component } from 'react';
import AlbumsList from './AlbumsList';

class AlbumsApp extends Component {
  
  render() {
    const { resultsArray, addFavouritesTotal, deductFavouritesTotal } = this.props;
    
    return (
      <div className="App">
        <main className="Main-section">
          <AlbumsList    
            resultsArray={resultsArray}
            addFavouritesTotal={addFavouritesTotal}
            deductFavouritesTotal={deductFavouritesTotal} />
        </main>
      </div>
    );
  }
}

export default AlbumsApp;
