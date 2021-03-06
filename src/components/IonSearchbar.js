import React, { Component} from 'react';
import PropTypes from "prop-types";

class IonSearchbar extends Component {
    render() {
        const { getSearchName, query } = this.props;

        return(
            <div className="Search-bar">
                <label htmlFor="search-field" className="Search-field__label"></label>
                <input type="text" id="search-field" className="Search-field__input" placeholder="Search" onChange={getSearchName} value={query}/>   

                <i className="material-icons Magnify">search</i>
            </div>
        );
    }
}

IonSearchbar.propTypes = {
    getSearchName: PropTypes.func,
    query: PropTypes.string
}

export default IonSearchbar;

               