import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
    render() {
      const { image, collectionName, selectFavourites, favouriteIcon, id } = this.props;
      return(
        <li className="Song__item">
            <img className="Song__sleeve" src={image} alt={collectionName}></img>

            <p className="Song__album">{collectionName}</p>
    
            <button type="button" className="Favourites__heart" value={id} onClick={selectFavourites}><i className="material-icons">{favouriteIcon}</i></button>
        </li>
      );
    }
}

SongCard.propTypes = {
  image: PropTypes.string,
  collectionName: PropTypes.string,
  id: PropTypes.number,
  selectFavourites: PropTypes.func,
  favouriteIcon: PropTypes.string
}

export default SongCard;