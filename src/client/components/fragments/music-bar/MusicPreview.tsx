import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { withRouter, RoutePropsComponent } from 'react-router';

import MusicPlayer from '../../../store/common/MusicPlayer';
import MusicsData from '../../../store/common/MusicsData';

const textProperties = {
  maxWidth: '250px',
  overflow: 'hidden',
  whiteSpace: 'nowrap' as any,
  textOverflow: 'ellipsis',
  lineHeight: 'unset',
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 80,
      width: 350,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      transition: 'background-color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#494949',
      },
      [theme.breakpoints.down('md')]: {
        width: 80,
      },
    },
    musicImage: {
      height: '100%',
    },
    musicTitle: {
      color: theme.palette.primary.light,
    },
    musicInformationContainer: {
      width: 'auto',
      marginLeft: 10,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    fromText: {
      ...textProperties,
      fontSize: 13,
    },
    artistAndTitleText: {
      ...textProperties,
    },
  });

interface IProps extends WithStyles<typeof styles> {}; //eslint-disable-line

@observer
class MusicPreview extends React.Component<IProps & RoutePropsComponent, NoState> {
  handleClick = () => {
    this.props.history.push(MusicPlayer.playlistRoute);
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction='row' className={classes.root} onClick={this.handleClick}>
        <Grid item style={{ height: '100%' }}>
          <img
            src='https://images.genius.com/cd64d6c15657a9d85823d3666969a00d.1000x1000x1.jpg'
            className={classes.musicImage}
          />
        </Grid>
        <Grid
          item
          container
          direction='column'
          alignItems='flex-start'
          justify='center'
          className={classes.musicInformationContainer}
        >
          <Grid item>
            <Typography className={classes.artistAndTitleText}>
              {MusicsData.getArtistNameById(MusicPlayer.currentArtist)}
            </Typography>
          </Grid>
          <Grid item className={classes.musicTitle}>
            <Typography className={classes.artistAndTitleText}>{MusicPlayer.currentMusicName}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.fromText}>Louki</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(MusicPreview));
