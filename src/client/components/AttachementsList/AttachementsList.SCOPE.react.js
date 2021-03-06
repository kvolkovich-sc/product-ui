/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapita/react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { ThemeProvider } from '@opuscapita/react-theming';
import theme from '../../theme';

@showroomScopeDecorator
export default
class AttachementsListScope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          {this._renderChildren()}
        </ThemeProvider>
      </div>
    );
  }
}

AttachementsListScope.contextTypes = {
  i18n: PropTypes.object
};
AttachementsListScope.childContextTypes = {
  i18n: PropTypes.object
};
