import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
class ErrorContainer extends React.Component {
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}
export default styled(ErrorContainer)`
  color: red;
`;
