import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import IonSearchbar from './IonSearchbar';
import PropTypes from "prop-types";


class Header extends Component {
    render() {
        const { favouritesTotal, getSearchName } = this.props;

        return(
            <header className="App-header">
                <div className="Header__content">
                    <i className="material-icons Hand-tapping">touch_app</i>
        
                    <IonSearchbar getSearchName={getSearchName} />

                    <div className="Menu">
                        <NavLink exact to="/" className="Show-songs__link" activeClassName="is-active"><p className="Show-songs">Songs</p>
                        </NavLink>
        
                        <NavLink to="/AlbumsApp" className="Show-albums__link" activeClassName="is-active"><p className="Show-albums__title">Albums</p></NavLink>
                    </div>

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
    favouritesTotal: PropTypes.number,
}

export default Header;