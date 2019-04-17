import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { debounce, cloneDeep  } from 'lodash';
import Header from './components/Header';
import './styles/App.scss';
import { fetchSongs } from './services/ApiRequest';
import SongsList from './components/SongsList';
import AlbumsApp from './components/AlbumsApp';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songsArray: [],
      albumsArray: [],
      favArray: [],
      query: '',
    }
  }

  // Check LS When running the component.
  // If there's data, store it in the state favArray to have the favourite's total when refreshing the app.
  componentDidMount() {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (savedFavourites !== null) {
      this.setState({
        favArray: savedFavourites
      });
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const newData = data.results;

      //Add the property favouriteStatus to newData array:
      const songsArray = newData.map(object => {return {...object, favouriteStatus: false }})
      
      //Create a new deep copy of the array with Lodash;
      const deepcloned = cloneDeep(newData)

      //Return an array of objects which don't contain the collectionName value repeated;
      //reduce goes through the array, and for each element it calls the provided function with accumulator (the return value of the previous call) and the current element. concat adds the current element to the accumulator if it doesn't exist there yet. find checks if the current element exists in the accumulator by comparing the collectionName properties:
      const uniqueValues = deepcloned.reduce((acc, x) =>
      acc.concat(acc.find(y => y.collectionName === x.collectionName) ? [] : [x]), []);
      
      //Add the property favouriteStatus to the uniqueValues array:
      const newAlbumsArray = uniqueValues.map((object, index) => {return {...object, id: index, favouriteStatus: false }});

      //Create a new array for both songs and albums favourites'array:
      const favouritesArray = newAlbumsArray.concat(songsArray)

      //Check if there are favourite songs in LS
      this.checkFavouritesLocalStorage(favouritesArray);

      this.setState({songsArray: songsArray, albumsArray: newAlbumsArray})
    })

    this.setState({songsArray: [], albumsArray: []})
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
  }

  selectFavourites = (e) => {
    const { songsArray, albumsArray, favArray } = this.state;
    const buttonValue = e.currentTarget.value;

    let newFavArray = [...favArray];

    const newSongsArray = songsArray.map(item => {
      if(item.trackId === parseInt(buttonValue) && item.favouriteStatus === false) {

        // Add item's trackId to that copy of the array:
        newFavArray.push(item.trackId);
        return {
          ...item, favouriteStatus: true
        };

        } 
      else if (item.trackId  === parseInt(buttonValue) && item.favouriteStatus === true) {
        //Search for the item's index through its ID and remove that position in the array.
        const favIndex = newFavArray.indexOf(item.trackId);
        newFavArray.splice(favIndex, 1);
        return {
          ...item, favouriteStatus: false
        }
      } return item;

    });

    const newAlbumsArray = albumsArray.map(item => {
      if (item.id === parseInt(buttonValue) && item.favouriteStatus === false) {
          // Add item's Id to that copy of the array:
          newFavArray.push(item.id);
        return {
          ...item, favouriteStatus: true
        }
        
      } else if (item.id === parseInt(buttonValue) && item.favouriteStatus === true) {
         //Search for the item's index through its ID and remove that position in the array.
         const favIndex = newFavArray.indexOf(item.id);
         newFavArray.splice(favIndex, 1);

        return {
          ...item, favouriteStatus: false
        }
      } 
      return item;
    });

    // Save the state favourite's array in LS.
    this.saveFavouritesLS('favourites', favArray);

    this.setState({songsArray : newSongsArray, albumsArray: newAlbumsArray, favArray: newFavArray});
  }

  saveFavouritesLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Check if there are favourites stored in LS:
  checkFavouritesLocalStorage = (data) => {
    const dataArray = data;
    const savedFavourites = JSON.parse(localStorage.getItem('favourites'));

    // If there's data in LS, go through every element to compare their trackIds with those from the resultsArray.
    // If they match, change the favouriteStatus to true in the resultsArray:

    console.log(dataArray)

    if (savedFavourites !== null) {
      for (const item of dataArray) {
        for (const favourite of savedFavourites) {
          if(favourite === parseInt(item.trackId) || parseInt(item.id) ) {
            item.favouriteStatus = true;
          }
        }
      }
    }
    this.setState({ resultsArray: dataArray });
  };



  render() {
    const { songsArray, albumsArray, favArray } = this.state;
    const { getSearchName, selectFavourites } = this;
    const favouritesTotal = favArray.length;

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
                  songsArray={songsArray}
                  selectFavourites={selectFavourites} />      
                )}/>
                
                <Route path="/AlbumsApp" render={()=>(
                <AlbumsApp 
                  albumsArray={albumsArray}
                  selectFavourites={selectFavourites} />
                )}/>
              </Fragment>
            </Switch>
        </main>
      </div>
    );
  }
}

export default App;
