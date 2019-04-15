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
      const newData = data.results;

      const results = newData.map((item, index)=>{return {...item, id: index, favouriteStatus: false, favouriteIcon: 'favorite_border'}});
  
      this.setState({resultsArray: results})
    })
    this.setState({resultsArray: []})
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
  }

  selectFavourites = (e) => {
    const { resultsArray } = this.state;
    const buttonValue = e.currentTarget.value;

    const newResultsArray = resultsArray.map(item => {
      if(item.id === parseInt(buttonValue) && item.favouriteStatus === false) {
        this.addFavouritesTotal();

        return {
          ...item, favouriteStatus: true, favouriteIcon: 'favorite'
        };

      } else if (item.id === parseInt(buttonValue) && item.favouriteStatus === true) {
        this.deductFavouritesTotal();
        return {
          ...item, favouriteStatus: false, favouriteIcon: 'favorite_border'
        }
      }
      return item;
    });
    
    this.setState({resultsArray : newResultsArray});
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
    const { getSearchName, selectFavourites } = this;
    
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
                  selectFavourites={selectFavourites} />      
                )}/>
                
                <Route path="/AlbumsApp" render={()=>(
                <AlbumsApp 
                  resultsArray={resultsArray} />
                )}/>
              </Fragment>
            </Switch>
        </main>
      </div>
    );
  }
}

export default App;
