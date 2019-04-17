import React, { Component } from 'react';
import PropTypes from "prop-types";
import AlbumCard from './AlbumCard';

class AlbumsList extends Component {
    render() {
        const { albumsArray, selectFavourites } = this.props;

        return(
            <ul className="Albums__list">
                {albumsArray.map(item => {
                    return(
                        <AlbumCard key={item.id}
                        id={item.id}
                        image={item.artworkUrl100}
                        collectionName={item.collectionName}
                        selectFavourites={selectFavourites}
                        favouriteStatus={item.favouriteStatus}  />
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