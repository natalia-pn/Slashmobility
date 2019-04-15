import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        favouriteStatus: 'false',
        favouritesIcon: 'favorite_border',
      }
  }

  toggleHeart = () => {
      const { favouriteStatus} = this.state;
  
      this.setState({
        favouriteStatus:!favouriteStatus
      })
    }
  
    selectFavourites = () => {
      const { favouriteStatus} = this.state;
      let favouriteIcon;
  
      this.toggleHeart();
  
      if(favouriteStatus === false) {
        favouriteIcon = 'favorite_border';
        this.props.deductFavouritesTotal();
  
      } else {
        favouriteIcon = 'favorite';
        this.props.addFavouritesTotal();
      }

      this.setState({
        favouritesIcon: favouriteIcon
      })
    }
    
    render() {
      const { image, collectionName } = this.props;
      const { selectFavourites} = this;
      const { favouritesIcon} = this.state;

      return(
        <li className="Song__item">
            <img className="Song__sleeve" src={image} alt={collectionName}></img>

            <p className="Song__album">{collectionName}</p>
    
            <button type="button" className="Favourites__heart" onClick={selectFavourites}><i className="material-icons">{favouritesIcon}</i></button>
        </li>
      );
    }
}

SongCard.propTypes = {
  image: PropTypes.string,
  deductFavouritesTotal: PropTypes.func,
  addFavouritesTotal: PropTypes.func
}

export default SongCard;