import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IconButton, Grid, Typography } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = (theme: Theme) =>
  createStyles({
    songContainer: {
      width: '100%',
      height: 80,
    },
    songName: {
      color: theme.palette.primary.light,
      fontSize: 16,
      fontWeight: 'bold',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: 'calc(100% - 15px)',
    },
    artistName: {
      color: theme.palette.primary.main,
      fontSize: 14,
    },
    songDuration: {
      fontSize: 14,
      color: theme.palette.primary.main,
    },
    songInfoContainer: {
      width: 'auto',
      flexGrow: 1,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: any;
}

@observer
class PlaylistBodyMobile extends React.Component<IProps & RouteComponentProps, NoState> {
  goTo = (row: any) => {
    if (row.title) {
      this.props.history.push('/artist/' + row.__id);
    } else {
      this.props.history.push('/album/' + row.__id);
    }
  };

  render() {
    const { classes, playlist } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {playlist.map((row, index) => (
          <Grid
            key={index}
            container
            direction='row'
            alignItems='center'
            justify='space-between'
            className={classes.songContainer}
          >
            <Grid item style={{ marginLeft: -15 }}>
              <IconButton aria-label='options'>
                <MoreVertIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              container
              direction='column'
              alignItems='flex-start'
              justify='space-between'
              className={classes.songInfoContainer}
            >
              <Grid item style={{ width: '100%' }}>
                <Typography className={classes.songName}>{row.title || row.name}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.artistName}>{row.artist}</Typography>
              </Grid>
            </Grid>
            <Grid item style={{ width: 'auto' }}>
              <Typography className={classes.songDuration}>{row.duration}</Typography>
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(PlaylistBodyMobile));
