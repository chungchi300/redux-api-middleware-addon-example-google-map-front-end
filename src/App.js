import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import configureStore from './configureStore';
import { Provider, connect } from 'react-redux';
import Map from './views/Map';
import LocationsInput from './views/LocationsInput';
import SWAGGER from 'swagger.js';
import API from 'redux-api-middleware-addon';
const store = configureStore({});
store.dispatch(API.Action.setProtocol('http'));
store.dispatch(API.Action.setSwagger(SWAGGER));
store.dispatch(
  API.Action.setHeaders({
    // 'X-Token': 'base64TokenForApiCall',
    Accept: 'application/json',
    ['Content-Type']: 'application/json',
  })
);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Map />
          <LocationsInput />
        </div>
      </Provider>
    );
  }
}

export default App;
