import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MusicPlayer from '../../../store/features/MusicPlayer';
import LoukiStore from '../../../store/data/LoukiStore';

const timeProperties = {
  position: 'absolute' as any,
  fontWeight: 'lighter' as any,
  margin: 0,
  marginTop: -9,
  fontSize: 14,
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    progressBackground: {
      position: 'relative',
      width: '100%',
      height: 3,
      backgroundColor: theme.palette.primary.contrastText,
      '&:hover': {
        cursor: 'pointer',
      },
      [theme.breakpoints.down('xs')]: {
        height: 6,
      },
    },
    currentProgress: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
    currentTime: {
      ...timeProperties,
      left: '-3em',
      fontSize: '1.5rem',
      [theme.breakpoints.down('sm')]: {
        left: -35,
        fontSize: 11,
        marginTop: -7,
      },
    },
    totalTime: {
      ...timeProperties,
      fontSize: '1.5rem',
      right: '-3em',
      [theme.breakpoints.down('sm')]: {
        right: -35,
        fontSize: 11,
        marginTop: -7,
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  mobile?: boolean;
}

@observer
class ProgressBar extends React.Component<Props, NoState> {
  handleClick = event => {
    if (MusicPlayer.audio == null) return;
    const currentTargetRect = event.currentTarget.getBoundingClientRect();
    const x = event.pageX - currentTargetRect.left;
    const width = event.currentTarget.offsetWidth;
    MusicPlayer.changeTime((100 / width) * x);
  };

  render() {
    const { classes, mobile } = this.props;
    const progress = MusicPlayer.audio == null ? 0 : (MusicPlayer.timePlayed / MusicPlayer.duration) * 100;

    return (
      <div onClick={this.handleClick} className={classes.progressBackground}>
        {mobile ? (
          <React.Fragment />
        ) : (
          <React.Fragment>
            <Typography className={classes.currentTime}>{LoukiStore.msTosec(MusicPlayer.timePlayed)}</Typography>
            <Typography className={classes.totalTime}>{LoukiStore.msTosec(MusicPlayer.duration)}</Typography>
          </React.Fragment>
        )}
        <div style={{ width: progress + '%' }} className={classes.currentProgress}></div>
      </div>
    );
  }
}

export default withStyles(styles)(ProgressBar);
