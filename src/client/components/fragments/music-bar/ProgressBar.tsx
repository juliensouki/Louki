import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MusicPlayer from '../../../store/common/MusicPlayer';
import MusicsData from '../../../store/common/MusicsData';

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
      left: -55,
      [theme.breakpoints.down('sm')]: {
        left: -35,
        fontSize: 11,
        marginTop: -7,
      },
    },
    totalTime: {
      ...timeProperties,
      right: -55,
      [theme.breakpoints.down('sm')]: {
        right: -35,
        fontSize: 11,
        marginTop: -7,
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  mobile?: boolean;
}

@observer
class ProgressBar extends React.Component<IProps, NoState> {
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
            <Typography className={classes.currentTime}>{MusicsData.msTosec(MusicPlayer.timePlayed)}</Typography>
            <Typography className={classes.totalTime}>{MusicsData.msTosec(MusicPlayer.duration)}</Typography>
          </React.Fragment>
        )}
        <div style={{ width: progress + '%' }} className={classes.currentProgress}></div>
      </div>
    );
  }
}

export default withStyles(styles)(ProgressBar);
