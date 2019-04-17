import React, { Component } from "react";
import { debounce } from "lodash";
import Header from "./components/Header";
import "./styles/App.scss";
import { fetchSongs } from "./services/ApiRequest";
import SongsList from "./components/SongsList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favArray: [],
      resultsArray: [],
      query: ''
    };
  }

  // Check LS When running the component.
  // If there's data, store it in the state favArray to have the favourite's total when refreshing the app.
  componentDidMount() {
    const savedSongs = JSON.parse(localStorage.getItem("favSongs"));
    if (savedSongs !== null) {
      this.setState({
        favArray: savedSongs
      });
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query).then(data => {
      const newData = data.results;
      // //Add the property favouriteStatus to newData array:
      const newResultsArray = newData.map(object => {
        return { ...object, favouriteStatus: false };
      });
      // Check if there are favourite songs in LS
      this.checkFavouritesLocalStorage(newResultsArray);
    });

    this.setState({resultsArray: []});
  }, 1000);

  getSearchName = e => {
    const nameValue = e.currentTarget.value;
    this.setState({ query: nameValue });

    this.getSongs();
  };

  selectFavourites = e => {
    const { resultsArray, favArray } = this.state;
    const buttonValue = e.currentTarget.value;

    //Create a copy of the favArray in the state:
    let newFavArray = [...this.state.favArray];

    const newResultsArray = resultsArray.map(item => {
      if(item.trackId === parseInt(buttonValue) && item.favouriteStatus === false) {
        // Add item's ID to that copy of the array:
        newFavArray.push(item.trackId);
       
        return {
          ...item,
          favouriteStatus: true
        };
        
      } else if(item.trackId === parseInt(buttonValue) && item.favouriteStatus === true) {
        //Search for the item's index through its ID and remove that position in the array.
        const favIndex = newFavArray.indexOf(item.trackId);
        newFavArray.splice(favIndex, 1);

        return {
          ...item,
          favouriteStatus: false
        };
      }
      return item;
    });
    
    // Save the state favourite's array in LS.
    this.saveFavouritesLS('favSongs', favArray);
    this.setState({ resultsArray: newResultsArray, favArray: newFavArray});
  };

  saveFavouritesLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Check if there are favourites stored in LS:
  checkFavouritesLocalStorage = data => {
    const dataArray = data;
    const savedSongs = JSON.parse(localStorage.getItem('favSongs'));

    // If there's data in LS, go through every element to compare their trackIds with those from the resultsArray.
    // If they match, change the favouriteStatus to true in the resultsArray:

    if (savedSongs !== null) {
      for (const item of dataArray) {
        for (const song of savedSongs) {
          if(song === parseInt(item.trackId)) {
            item.favouriteStatus = true;
          }
        }
      }
    }
    this.setState({ resultsArray: dataArray });
  };

  render() {
    const { resultsArray, favArray } = this.state;
    const { getSearchName, selectFavourites } = this;

    const favouritesTotal = favArray.length;

    return (
      <div className="App">
        <Header
          getSearchName={getSearchName}
          favouritesTotal={favouritesTotal}
        />

        <main className="Main-section">
          <SongsList
            resultsArray={resultsArray}
            selectFavourites={selectFavourites}
          />
        </main>
      </div>
    );
  }
}

export default App;
