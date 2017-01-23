import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

import muiThemeable from 'material-ui/styles/muiThemeable'

injectTapEventPlugin();
const styles = {
  title: {
    cursor: 'pointer',
  },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
export class AppBarExampleIconButton extends React.Component{
  render() {
    return(
      <AppBar
        title={<span style={styles.title}>Reset the whole board!</span>}
        onTitleTouchTap={() => this.props.handleTouchTap()}
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label="Save" />}
      />
    )
  }
}
