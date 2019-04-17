import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
  
    
    render() {
      const { image, trackName, collectionName, favouriteStatus, id, selectFavourites } = this.props;

      const favouriteIcon = favouriteStatus === true? "favorite" : "favorite_border";

      return(
        <li className="Song__item">
            <img className="Song__sleeve" src={image} alt={collectionName}></img>

            <div className="Card__info">
              <p className="Song__title">{trackName}</p>

              <p className="Song__album">{collectionName}</p>
            </div> 

            <button type="button" className="Favourites__heart" value={id} onClick={selectFavourites}><i className="material-icons">{favouriteIcon}</i></button>
        </li>
      );
    }
}

SongCard.propTypes = {
  image: PropTypes.string,
  trackName: PropTypes.string,
  collectionName: PropTypes.string,
  selectFavourites: PropTypes.func,
  id: PropTypes.number,
  favouriteSongStatus: PropTypes.bool
}

export default SongCard;