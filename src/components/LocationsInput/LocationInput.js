import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
class LocationInput extends React.Component {
  render() {
    let deleteLocation;
    if (!this.props.disabled) {
      deleteLocation = (
        <span onClick={() => this.props.removeLocation(this.props.index)}>
          X
        </span>
      );
    }
    return (
      <div>
        <input
          key={this.props.index}
          onChange={event =>
            this.props.locationChange(this.props.index, event.target.value)}
          type="text"
          onBlur={this.props.onBlur}
          value={this.props.location}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
        />
        {deleteLocation}
      </div>
    );
  }
}
export default styled(LocationInput)`
  color: red;
`;
