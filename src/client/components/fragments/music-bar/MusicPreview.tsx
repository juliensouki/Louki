import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { withRouter, RoutePropsComponent } from 'react-router';

import MusicPlayer from '../../../store/common/MusicPlayer';
import MusicsData from '../../../store/common/MusicsData';

const textProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap' as any,
  textOverflow: 'ellipsis',
  lineHeight: 'unset',
  fontSize: '1.5rem',
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '17%',
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
      maxWidth: '100%',
    },
    musicTitle: {
      color: theme.palette.primary.light,
    },
    musicInformationContainer: {
      width: 'auto',
      height: '100%',
      marginLeft: '1.5em',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    fromText: {
      ...textProperties,
      fontSize: '1.2rem',
    },
    artistAndTitleText: {
      ...textProperties,
      maxWidth: 'calc(17vw - 6.5em)',
    },
    pictureConatainer: {
      [theme.breakpoints.up('md')]: {
        height: '6.5em',
        width: '6.5em',
      },
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
      <Grid container item direction='row' className={classes.root} onClick={this.handleClick}>
        <Grid item className={classes.pictureConatainer}>
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
          <Grid item style={{ width: 'calc(17vw - 8em)' }}>
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
