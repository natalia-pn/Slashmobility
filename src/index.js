import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SongsApp from './SongsApp';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(<HashRouter><SongsApp /></HashRouter>, document.getElementById('root'));


