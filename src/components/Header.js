import React, { Component} from 'react';
import IonSearchbar from './IonSearchbar';
import PropTypes from "prop-types";


class Header extends Component {
    render() {
        const { favouritesTotal} = this.props;

        return(
            <header className="App-header">
                <i className="material-icons Hand-tapping">touch_app</i>
    
                <IonSearchbar />
                
                <div className="Favourites-counter__container">
                    <i className="material-icons Header__heart">favorite</i>
                    
                    <span className="Favourites__counter">{favouritesTotal}</span>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    favouritesTotal: PropTypes.number,
}

export default Header;