import React, { Component } from 'react';
import { debounce  } from 'lodash';
import Header from './components/Header';
import './styles/App.scss';
import { fetchSongs } from './services/ApiRequest';
import SongsList from './components/SongsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsArray: [],
      query: '',
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const newData = data.results;

      //Add the property favouriteStatus to newData array:
      const newResultsArray = newData.map(object => {return {...object, favouriteStatus: false }})
      this.setState({resultsArray: newResultsArray})
    })

    this.setState({query: ''})
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
      if(item.trackId === parseInt(buttonValue) && item.favouriteStatus === false) {
        localStorage.setItem('trackId', JSON.stringify(item.trackId));

        console.log('add',item.trackId);

        return {
          ...item, favouriteStatus: true
        };

        } 
      else if (item.trackId  === parseInt(buttonValue) && item.favouriteStatus === true) {
        localStorage.removeItem('trackId', JSON.stringify(item.trackId));
        
        console.log('remove', item.trackId);
        return {
          ...item, favouriteStatus: false
        }
      } return item;

    });
    
    this.setState({resultsArray : newResultsArray});
  }

  render() {
    const { resultsArray, query } = this.state;
    const { getSearchName, selectFavourites } = this;

    // Get favourite songs' total:
    const favouritesTotal = resultsArray.filter(item => item.favouriteStatus === true).length;



    return (
      <div className="App">
        <Header  
          getSearchName={getSearchName} 
          favouritesTotal={favouritesTotal}
          query={query} />

        <main className="Main-section">
          <SongsList    
            resultsArray={resultsArray}
            selectFavourites={selectFavourites} />      
        </main>
      </div>
    );
  }
}

export default App;
