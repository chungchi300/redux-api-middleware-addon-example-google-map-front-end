import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
class ButtonContainer extends React.Component {
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}
export default styled(ButtonContainer)`
  margin: 5px;
  display: block;
`;
