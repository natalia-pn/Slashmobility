import React, { Component } from 'react';
import PropTypes from "prop-types";

class albumCard extends Component {
    render() {
      const { image, collectionName, selectFavourites, favouriteStatus, id } = this.props;

      const favouriteIcon = favouriteStatus === true ? "favorite" : "favorite_border";
 

      return(
        <li className="Song__item">
            <img className="Song__sleeve" src={image} alt={collectionName}></img>

            <p className="Song__album">{collectionName}</p>
 
            <button type="button" className="Favourites__heart" value={id} onClick={selectFavourites}><i className="material-icons">{favouriteIcon}</i></button>
        </li>
      );
    }
}

albumCard.propTypes = {
  image: PropTypes.string,
  collectionName: PropTypes.string,
  id: PropTypes.number,
  selectFavourites: PropTypes.func,
  favouriteAlbumStatus: PropTypes.bool
}

export default albumCard;