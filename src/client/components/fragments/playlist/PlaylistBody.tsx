import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

import IMusic from '../../../../shared/IMusic';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiTableCell-root': {
        padding: 8,
      },
    },
    root: {
      marginLeft: 20,
      width: 'calc(100% - 40px)',
      height: 'calc(100% - 280px)',
      marginTop: 20,
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 240px)',
      },
    },
    rowTitles: {
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      fontSize: 16,
      color: theme.palette.primary.main,
    },
    tableRow: {
      color: theme.palette.primary.main,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IMusic>;
}

@observer
class PlaylistBody extends React.Component<IProps, NoState> {
  render() {
    const { classes, playlist } = this.props;

    return (
      <div className={classes.root}>
        {playlist ? (
          <ResponsiveAdapter
            mobile={<PlaylistBodyMobile playlist={playlist} />}
            desktop={<PlaylistBodyDesktop playlist={playlist} />}
          />
        ) : (
          <Typography>This feature has not been developed yet.</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBody);
