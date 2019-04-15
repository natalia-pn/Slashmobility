import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        favouriteStatus: true,
        favouritesIcon: 'favorite_border',
      }
  }

  toggleHeart = () => {
    this.setState((prevState) => {
      console.log(prevState)
      return {
        favouriteStatus: !prevState.favouriteStatus,
      };
    });
      console.log(this.state.favouriteStatus)
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
      const { image, trackName, collectionName } = this.props;
      const { selectFavourites} = this;
      const { favouritesIcon} = this.state;

      return(
        <li className="Song__item">
            <img className="Song__sleeve" src={image} alt={collectionName}></img>

            <div className="Card__info">
              <p className="Song__title">{trackName}</p>

              <p className="Song__album">{collectionName}</p>
            </div> 

            <button type="button" className="Favourites__heart" onClick={selectFavourites}><i className="material-icons">{favouritesIcon}</i></button>
        </li>
      );
    }
}

SongCard.propTypes = {
  image: PropTypes.string,
  trackName: PropTypes.string,
  collectionName: PropTypes.string,
  deductFavouritesTotal: PropTypes.func,
  addFavouritesTotal: PropTypes.func
}

export default SongCard;