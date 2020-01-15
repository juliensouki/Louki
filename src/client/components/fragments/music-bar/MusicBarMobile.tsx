import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import LoopIcon from '@material-ui/icons/Loop';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import MusicPreview from './MusicPreview';
import ProgressBar from './ProgressBar';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 80,
      width: '100%',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    musicControlsContainer: {
      height: '100%',
      padding: 20,
      paddingLeft: 20,
      paddingRight: 20,
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
      fontSize: 55,
      transition: 'color .5s ease-in-out',
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
      left: 0,
      height: 6,
      width: '100%',
      zIndex: 2,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {}; //eslint-disable-line

@observer
class MusicBarMobile extends React.Component<IProps, NoState> {
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
              <Grid item>
                <ShuffleIcon className={classes.controlIcons} />
                <LoopIcon className={classes.controlIcons} />
              </Grid>
              <Grid item>
                <SkipPreviousIcon className={classes.audioControlIcons} />
                <PlayArrowIcon className={classes.audioControlIcons} />
                <SkipNextIcon className={classes.audioControlIcons} />
              </Grid>
              <Grid item>
                <FavoriteBorderOutlinedIcon className={classes.controlIcons} />
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
