import React, { Component } from 'react';
import IonSearchbar from './IonSearchbar';
import PropTypes from "prop-types";

class Header extends Component {
    render() {
        const { favouritesTotal, getSearchName, query } = this.props;

        return(
            <header className="App-header">
                <div className="Header__content">
                    <i className="material-icons Hand-tapping">touch_app</i>
        
                    <IonSearchbar getSearchName={getSearchName}
                    query={query} />

                    <div className="Favourites-counter__container">
                        <i className="material-icons Header__heart">favorite</i>
                        
                        <span className="Favourites__counter">{favouritesTotal}</span>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    favouritesTotal: PropTypes.number
}

export default Header;