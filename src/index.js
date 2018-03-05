import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
require('babel-polyfill');
const App = require('./App').default;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
