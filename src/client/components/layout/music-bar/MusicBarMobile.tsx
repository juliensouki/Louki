import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import LoopIcon from '@material-ui/icons/Loop';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseIcon from '@material-ui/icons/Pause';

import MusicPreview from './MusicPreview';
import ProgressBar from './ProgressBar';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import MusicPlayer, { MusicLoop } from '../../../store/features/MusicPlayer';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 80,
      [theme.breakpoints.down('xs')]: {
        height: 50,
      },
      width: '100%',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    bubbleRepeat: {
      position: 'absolute',
      bottom: 0,
      fontFamilty: 'Roboto',
      right: 3,
      height: 13,
      width: 13,
      fontSize: 10,
      textAlign: 'center',
      borderRadius: '100%',
      backgroundColor: theme.palette.secondary.main,
      color: '#FFF',
    },
    musicControlsContainer: {
      position: 'relative',
      height: '100%',
      padding: 20,
      paddingLeft: 20,
      paddingRight: 20,
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 50px)',
      },
      width: 'calc(100% - 80px)',
    },
    arrowIcon: {
      fontSize: 40,
      verticalAlign: 'super',
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
    },
    playPauseIcon: {
      fontSize: 25,
      transition: 'color .5s ease-in-out',
      [theme.breakpoints.down('xs')]: {
        fontSize: 40,
      },
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.secondary.main,
      },
    },
    controlIcons: {
      fontSize: 25,
      transition: 'color .5s ease-in-out',
      marginRight: 15,
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
      },
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
    audioControlIcons: {
      position: 'relative',
      fontSize: 25,
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
      },
    },
    progressBarContainer: {
      width: 'calc(100% - 75px)',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    mobileProgressBarContainer: {
      position: 'absolute',
      bottom: 80,
      [theme.breakpoints.down('xs')]: {
        bottom: 50,
      },
      left: 0,
      height: 6,
      width: '100%',
      zIndex: 2,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  });

@observer
class MusicBarMobile extends React.Component<WithStyles, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.mobileProgressBarContainer}>
          <ProgressBar mobile />
        </div>
        <Grid container direction='row' className={classes.root}>
          <Grid item>
            <MusicPreview />
          </Grid>
          <ResponsiveAdapter
            desktop={
              <Grid
                item
                container
                direction='column'
                alignItems='center'
                justify='space-between'
                className={classes.musicControlsContainer}
              />
            }
            mobile={
              <Grid
                item
                container
                direction='column'
                alignItems='center'
                justify='center'
                className={classes.musicControlsContainer}
              />
            }
          >
            <Grid container item alignItems='center' justify='space-between' direction='row'>
              <Grid item style={{ position: 'relative' }}>
                <ShuffleIcon
                  onClick={MusicPlayer.changeRandom}
                  style={{ color: MusicPlayer.random ? '#FFB13B' : '' }}
                  className={classes.controlIcons}
                />
                <LoopIcon
                  onClick={MusicPlayer.changeRepeatMode}
                  style={{ color: MusicPlayer.repeat == MusicLoop.NO_REPEAT ? '' : '#FFB13B' }}
                  className={classes.controlIcons}
                />
                {MusicPlayer.repeat == MusicLoop.REPEAT_ONE && (
                  <Typography className={classes.bubbleRepeat}>1</Typography>
                )}
              </Grid>
              <Grid item container direction='row' justify='center' alignItems='center' style={{ width: 'auto' }}>
                <SkipPreviousIcon
                  onClick={MusicPlayer.prevSong}
                  className={classes.audioControlIcons}
                  style={{ marginRight: -5 }}
                />
                {MusicPlayer.isPlaying ? (
                  <PauseIcon onClick={MusicPlayer.pauseOrPlay} className={classes.playPauseIcon} />
                ) : (
                  <PlayArrowIcon onClick={MusicPlayer.pauseOrPlay} className={classes.playPauseIcon} />
                )}
                <SkipNextIcon
                  onClick={MusicPlayer.nextSong}
                  className={classes.audioControlIcons}
                  style={{ marginLeft: -5 }}
                />
              </Grid>
              <Grid item>
                <VolumeUpIcon className={classes.controlIcons} />
              </Grid>
            </Grid>
            <Grid item className={classes.progressBarContainer}>
              <ProgressBar />
            </Grid>
          </ResponsiveAdapter>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MusicBarMobile);
