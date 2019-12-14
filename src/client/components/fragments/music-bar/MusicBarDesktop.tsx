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

import MusicPreview from './MusicPreview';
import ProgressBar from './ProgressBar';

const styles = (theme: Theme) => createStyles({
  root: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: 80,
      width: "100%",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
  },
  musicControlsContainer: {
    width: "calc(100% - 350px)",
    height: "100%",
    paddingLeft: 60,
    paddingRight: 60,
    [theme.breakpoints.down('md')]: {
      width: "calc(100% - 80px)",
    },
  },
  progerssBarContainer: {
    width: "50%",
    maxWidth: 700,
  },
  arrowIcon: {
    fontSize: 40,
    verticalAlign: "super",
    transition: "color .5s ease-in-out",
    '&:hover': {
      cursor: "pointer",
      color: theme.palette.primary.light,
    },
  },
  playPauseIcon: {
    fontSize: 55,
    transition: "color .5s ease-in-out",
    '&:hover': {
      cursor: "pointer",
      color: theme.palette.secondary.main,
    },
  },
  controlIcons: {
    fontSize: 25,
    transition: "color .5s ease-in-out",
    marginRight: 15,
    '&:hover': {
      cursor: "pointer",
      color: theme.palette.primary.light,
    },
  }
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class MusicBarDesktop extends React.Component<Props, NoState>
{
  render()
  {
    // const T = texts.current.appBar;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container direction="row" className={classes.root}>
          <Grid item>
            <MusicPreview/>
          </Grid>
          <Grid container alignItems="center" justify="space-between" className={classes.musicControlsContainer}>
            <Grid item>
              <SkipPreviousIcon className={classes.arrowIcon}/>
              <PlayArrowIcon className={classes.playPauseIcon}/>
              <SkipNextIcon className={classes.arrowIcon}/>
            </Grid>
            <Grid item className={classes.progerssBarContainer}>
              <ProgressBar/>
            </Grid>
            <Grid item>
              <ShuffleIcon className={classes.controlIcons}/>
              <LoopIcon className={classes.controlIcons}/>
              <VolumeUpIcon className={classes.controlIcons}/>
            </Grid>
          </Grid>
        </Grid>        
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(MusicBarDesktop);