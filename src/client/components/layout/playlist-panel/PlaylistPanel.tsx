import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.loader-grid': {
        display: 'none',
      },
    },
    root: {
      backgroundColor: 'black',
      overflowY: 'auto',
      height: '100%',
      display: 'inline-block',
      width: '83%',
      color: '#FFF',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        left: 0,
      },
    },
  });

@observer
class PlaylistPanel extends React.Component<WithStyles, NoState> {
  render() {
    const { classes, children } = this.props;

    return <div className={classes.root}>{children}</div>;
  }
}

export default withStyles(styles)(PlaylistPanel);
