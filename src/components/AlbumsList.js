import React, { Component } from 'react';
import PropTypes from "prop-types";
import AlbumCard from './SongCard';

class AlbumsList extends Component {
    render() {
        const { resultsArray, selectFavourites } = this.props;

        return(
            <ul className="Albums__list">
                {resultsArray.map(item => {
                    return(
                        <AlbumCard key={item.id}
                        id={item.id}
                        image={item.artworkUrl100}
                        collectionName={item.collectionName}
                        selectFavourites={selectFavourites}
                        favouriteIcon={item.favouriteIcon}  />
                    )
                })}
            </ul>
        );
    }
}

AlbumsList.propTypes = {
    resultsArray: PropTypes.array,
}

export default AlbumsList;