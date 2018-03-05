import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
class Container extends React.Component {
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}
export default styled(Container)`
  width: 500px;
  height: 500px;
  display: inline-block;
`;
