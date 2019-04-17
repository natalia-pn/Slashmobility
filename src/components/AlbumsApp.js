import React, { Component, Fragment } from 'react';
import AlbumsList from './AlbumsList';

class AlbumsApp extends Component {
  
  render() {
    const { albumsArray, selectFavourites } = this.props;
    
    return (
      <Fragment>
        <AlbumsList    
          albumsArray={albumsArray}
          selectFavourites={selectFavourites} />
      </Fragment>
    );
  }
}

export default AlbumsApp;
