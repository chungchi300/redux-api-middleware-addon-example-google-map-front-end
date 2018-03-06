import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {
  addLocation,
  removeLocation,
  locationChange,
  reloadRoute,
} from 'actions';
import { isFailed } from 'helpers';
import { Button } from 'rebass';
import { Provider, connect } from 'react-redux';
import Container from 'components/LocationsInput/Container';
import ButtonContainer from 'components/LocationsInput/ButtonContainer';
import LocationInput from 'components/LocationsInput/LocationInput';
import ErrorContainer from 'components/LocationsInput/ErrorContainer';
class LocationsInput extends React.Component {
  placeholder(index) {
    if (index == 0) {
      return 'origin';
    }
    if (index == this.props.locations.length - 1) {
      return 'destination';
    }
    return 'stop';
  }
  render() {
    let inputs = this.props.locations.map((location, index) => {
      console.log('index', index);
      return (
        <LocationInput
          key={index}
          index={index}
          disabled={this.props.loading}
          locationChange={this.props.locationChange}
          type="text"
          onBlur={this.props.reloadRoute}
          location={location}
          placeholder={this.placeholder.bind(this)(index)}
        />
      );
    });
    let actionBtn = (
      <Button onClick={this.props.addLocation}>Add Location</Button>
    );
    if (this.props.loading) {
      actionBtn = <Button disabled>REQUESTING</Button>;
    }
    let reloadBtn;

    if (this.props.failed) {
      reloadBtn = (
        <Button disabled={this.props.loading} onClick={this.props.reloadRoute}>
          Server busy,Reload Route
        </Button>
      );
    }
    let routeErr;
    if (_.get(this, 'props.route.status') == 'failure') {
      routeErr = <ErrorContainer>{this.props.route.error}</ErrorContainer>;
    }
    if (_.get(this, 'props.route.status') == 'in progress') {
      routeErr = (
        <ErrorContainer>
          The Route Path is calculating,please wait 15 second and retry
        </ErrorContainer>
      );
    }
    return (
      <Container>
        <div className={this.props.className}>{inputs}</div>
        <ButtonContainer>{actionBtn}</ButtonContainer>
        <ButtonContainer>{reloadBtn}</ButtonContainer>
        {routeErr}
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  //

  return {
    failed: isFailed(state),
    locations: state.locations,
    loading:
      state.network.postRoute == 'REQUEST' ||
      state.network.getRoute == 'REQUEST' ||
      state.map.loaded == false,
    mapLoaded: state.map.loaded,
    route: state.route,
  };
}

// Map Redux actions to component props,a way that allow presentation component to get dispatch action function from parent
function mapDispatchToProps(dispatch, ownProps) {
  //
  return {
    addLocation: () => dispatch(addLocation()),
    reloadRoute: () => dispatch(reloadRoute()),
    removeLocation: index => dispatch(removeLocation(index)),
    locationChange: (index, val) => dispatch(locationChange(index, val)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationsInput);
