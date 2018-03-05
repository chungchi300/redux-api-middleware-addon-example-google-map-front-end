import React, { Component } from 'react';
import _ from 'lodash';
import { Provider, connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Container from 'components/Map/Container';
import { isFailed } from 'helpers';
import { mapLoaded } from 'actions';
Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
class Map extends React.Component {
  constructor() {
    super();
    this.directionsDisplay = undefined;
    this.directionsService = undefined;
    this.map = undefined;
    this.maps = undefined;
  }
  apiIsLoaded(map, maps) {
    this.props.googleMapLoaded();
    if (map) {
      this.map = map;
      this.maps = maps;
      this.directionsDisplay = new maps.DirectionsRenderer();
      this.directionsService = new maps.DirectionsService();
    }
  }
  updateDirections() {
    this.directionsDisplay.setMap(this.map);
    var waypts = this.props.route.path
      .slice(1, this.props.route.path.length - 1)
      .map(path => {
        return {
          location: { lat: path.lat, lng: path.lng },
          stopover: true,
        };
      });
    var start = _.first(this.props.route.path);
    var end = _.last(this.props.route.path);
    //Direct waypoints on tommorow
    this.directionsService.route(
      {
        origin: {
          lat: start.lat,
          lng: start.lng,
        }, // Haight.
        destination: {
          lat: end.lat,
          lng: end.lng,
        }, // Ocean Beach.
        waypoints: waypts,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: this.maps.TravelMode.DRIVING,
      },
      function(response, status) {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }.bind(this)
    );
  }
  clearDirections() {
    this.directionsDisplay.setMap(null);
    this.directionsDisplay.setDirections({ routes: [] });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidUpdate(nextProps, nextState) {
    if (_.get(this, 'props.route.status') == 'success' && this.map) {
      this.updateDirections.bind(this)();
    } else if (this.props.failed) {
      this.clearDirections.bind(this)();
    }
  }
  render() {
    let totalTime = _.get(this, 'props.route.total_time');
    let totalDistance = _.get(this, 'props.route.total_distance');
    if (totalDistance) {
      totalDistance = totalDistance.format(0, 3);
    }
    let routeDescription;
    if (totalDistance || totalTime) {
      routeDescription = (
        <div>
          {' '}
          <div>Distance: {totalDistance}m</div>
          <div>Time: {totalTime}s</div>
        </div>
      );
    }

    //Clear google map when failure
    return (
      <Container mapLoaded={this.props.mapLoaded}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: ['AIzaSyCYud1SI_duEuDmwho3GqwJ96dlfzsvxDI'],
          }}
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.defaultZoom}
          onGoogleApiLoaded={({ map, maps }) =>
            this.apiIsLoaded.bind(this)(map, maps)}
        />
        {routeDescription}
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  //
  return {
    defaultZoom: 11,
    defaultCenter: {
      lat: 22.372081,
      lng: 114.107877,
    },
    failed: isFailed(state),
    mapLoaded: state.map.loaded,
    //should retrieve from domain
    route: state.route,
  };
}

// Map Redux actions to component props,a way that allow presentation component to get dispatch action function from parent
function mapDispatchToProps(dispatch, ownProps) {
  //
  return { googleMapLoaded: () => dispatch(mapLoaded()) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
