import locations from './locations';
import API from 'redux-api-middleware-addon';
import route from './route';
import map from './map';
const rootReducer = function(state = {}, action) {
  return {
    network: API.Reducer.network(state.network, action),
    api: API.Reducer.api(state.api, action),
    route: route(state.route, action),
    map: map(state.map, action),
    locations: locations(state.locations, action),
  };
};
export default rootReducer;
