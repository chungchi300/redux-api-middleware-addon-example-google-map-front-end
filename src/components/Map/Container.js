import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
class Container extends React.Component {
  render() {
    if (this.props.mapLoaded) {
      return <div className={this.props.className}>{this.props.children}</div>;
    } else {
      return (
        <div>
          Loading Map
          <div style={{ display: 'none' }}>{this.props.children}</div>
        </div>
      );
    }
  }
}
export default styled(Container)`
  width: 500px;
  height: 500px;
  display: inline-block;
  vertical-align: top;
`;
