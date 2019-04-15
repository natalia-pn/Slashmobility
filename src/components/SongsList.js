import React, { Component } from 'react';
import PropTypes from "prop-types";
import SongCard from './SongCard';

class SongsList extends Component {
    render() {
        const { resultsArray, selectFavourites } = this.props;

        return(
            <ul className="Songs__list">
                {resultsArray.map(item => {
                    return(
                        <SongCard key={item.id}
                        id={item.id}
                        image={item.artworkUrl100}
                        trackName={item.trackName}
                        collectionName={item.collectionName}
                        selectFavourites={selectFavourites} 
                        favouriteIcon={item.favouriteIcon} />
                    )
                })}
            </ul>
        );
    }
}

SongsList.propTypes = {
    resultsArray: PropTypes.array,
}

export default SongsList;