import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import LoopIcon from '@material-ui/icons/Loop';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PauseIcon from '@material-ui/icons/Pause';

import MusicPreview from './MusicPreview';
import ProgressBar from './ProgressBar';

import MusicPlayer, { MusicLoop } from '../../../store/features/MusicPlayer';
import Volume from './volume-button/Volume';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '6.5em',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    musicControlsContainer: {
      width: '83%',
      height: '100%',
      paddingLeft: '4em',
      paddingRight: '4em',
      [theme.breakpoints.down('md')]: {
        width: 'calc(100% - 80px)',
      },
    },
    progerssBarContainer: {
      width: '50%',
      maxWidth: 700,
    },
    arrowIcon: {
      position: 'relative',
      top: '-0.1em',
      fontSize: '3rem',
      verticalAlign: 'super',
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
    },
    playPauseIcon: {
      fontSize: '5rem',
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.secondary.main,
      },
    },
    controlIcons: {
      fontSize: '2.3rem',
      transition: 'color .5s ease-in-out',
      marginRight: '0.5em',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
    },
    bubbleRepeat: {
      position: 'absolute',
      bottom: 0,
      fontFamilty: 'Roboto',
      right: 15,
      height: 13,
      width: 13,
      fontSize: 10,
      textAlign: 'center',
      borderRadius: '100%',
      backgroundColor: theme.palette.secondary.main,
      color: '#FFF',
    },
  });

@observer
class MusicBarDesktop extends React.Component<WithStyles, NoState> {
  @observable volumeAnchorEl: HTMLElement | null = null;

  handlePopoverOpen = event => {
    this.volumeAnchorEl = event.currentTarget;
  };

  handlePopoverClose = () => {
    this.volumeAnchorEl = null;
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction='row' className={classes.root}>
        <MusicPreview />
        <Grid container alignItems='center' justify='space-between' className={classes.musicControlsContainer}>
          <Grid item>
            <SkipPreviousIcon onClick={MusicPlayer.prevSong} className={classes.arrowIcon} />
            {!MusicPlayer.playing ? (
              <PlayArrowIcon onClick={MusicPlayer.pauseOrPlay} className={classes.playPauseIcon} />
            ) : (
              <PauseIcon onClick={MusicPlayer.pauseOrPlay} className={classes.playPauseIcon} />
            )}
            <SkipNextIcon onClick={MusicPlayer.nextSong} className={classes.arrowIcon} />
          </Grid>
          <Grid item className={classes.progerssBarContainer}>
            <ProgressBar />
          </Grid>
          <Grid item>
            <ShuffleIcon
              className={classes.controlIcons}
              onClick={MusicPlayer.changeRandom}
              style={{ color: MusicPlayer.random ? '#FFB13B' : '' }}
            />
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <LoopIcon
                className={classes.controlIcons}
                onClick={MusicPlayer.changeRepeatMode}
                style={{ color: MusicPlayer.repeat == MusicLoop.NO_REPEAT ? '' : '#FFB13B' }}
              />
              {MusicPlayer.repeat == MusicLoop.REPEAT_ONE ? <div className={classes.bubbleRepeat}>1</div> : null}
            </div>
            <div
              style={{ display: 'inline-block' }}
              onMouseEnter={this.handlePopoverOpen}
              onMouseLeave={this.handlePopoverClose}
            >
              {MusicPlayer.volume == 0 || MusicPlayer.mute ? (
                <VolumeOffIcon onClick={MusicPlayer.muteUnMute} className={classes.controlIcons} />
              ) : (
                <VolumeUpIcon onClick={MusicPlayer.muteUnMute} className={classes.controlIcons} />
              )}
              <Volume anchorEl={this.volumeAnchorEl} handleClose={this.handlePopoverClose} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MusicBarDesktop);
