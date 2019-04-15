import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { debounce } from 'lodash';
import Header from './components/Header';
import './styles/App.scss';
import { fetchSongs } from './services/ApiRequest';
import SongsList from './components/SongsList';
import AlbumsApp from './components/AlbumsApp';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsArray: [],
      query: '',
      favouritesTotal: 0
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const results = data.results;
      this.setState({resultsArray: results})
    })
    this.setState({resultsArray: [], favouritesTotal: 0})
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
  }

  addFavouritesTotal = () => {
    this.setState(prevState => {
      return {
        favouritesTotal: prevState.favouritesTotal + 1
      }
    })
  }

  deductFavouritesTotal = () => {
    this.setState(prevState => {
      return {
        favouritesTotal: prevState.favouritesTotal - 1
      }
    })
  }

  render() {
    const { resultsArray, favouritesTotal } = this.state;
    const { getSearchName, addFavouritesTotal, deductFavouritesTotal } = this;
    
    return (
      <div className="App">
        <Header  
            getSearchName={getSearchName} 
            favouritesTotal={favouritesTotal} />

        <main className="Main-section">
          <Switch>
              <Fragment>
                <Route exact path="/" render={()=>(
                  <SongsList    
                  resultsArray={resultsArray}
                  addFavouritesTotal={addFavouritesTotal}
                  deductFavouritesTotal={deductFavouritesTotal} />    
                )}/>
                
                <Route path="/AlbumsApp" render={()=>(
                <AlbumsApp 
                  resultsArray={resultsArray}
                  addFavouritesTotal={addFavouritesTotal}
                  deductFavouritesTotal={deductFavouritesTotal} />
                )}/>
              </Fragment>
            </Switch>
        </main>
      </div>
    );
  }
}

export default App;
