import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import { IconButton, Grid, Typography } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IMusic from '../../../../shared/IMusic';
import MusicsData from '../../../store/common/MusicsData';

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
      width: 'calc(100% - 150px)',
      flexGrow: 1,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IMusic>;
}

@observer
class PlaylistBodyMobile extends React.Component<IProps, NoState> {
  render() {
    const { classes, playlist } = this.props;

    return (
      <div style={{ width: '100%' }}>
        {playlist.map(row => (
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
            key={row.__id}
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
                <Typography className={classes.songName}>{row.title}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.artistName}>{MusicsData.getArtistNameById(row.artist)}</Typography>
              </Grid>
            </Grid>
            <Grid item style={{ width: 'auto' }}>
              <Typography className={classes.songDuration}>{MusicsData.msTosec(row.duration)}</Typography>
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBodyMobile);
