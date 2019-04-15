import React, { Component } from 'react';
import PropTypes from "prop-types";
import AlbumCard from './SongCard';

class AlbumsList extends Component {
    render() {
        const { resultsArray, addFavouritesTotal, deductFavouritesTotal} = this.props;

        return(
            <ul className="Albums__list">
                {resultsArray.map((item, index) => {
                    return(
                        <AlbumCard key={index}
                        image={item.artworkUrl100}
                        collectionName={item.collectionName}
                        addFavouritesTotal={addFavouritesTotal}
                        deductFavouritesTotal={deductFavouritesTotal} />
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