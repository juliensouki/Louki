import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Fab, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import PlaylistOptions from '../utils/PlaylistOptions';
import MusicPlayer from '../../store/features/MusicPlayer';
import Navigation from '../../store/navigation/Navigation';
import { Music } from '../../../shared/LoukiTypes';
import { Stats, getStat } from '../../store/statistics/Stats';

import texts from '../../lang/fragments/playlist/playlist-header';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiButtonBase-root .MuiSvgIcon-root': {
        fontSize: '2.5rem !important',
      },
    },
    root: {
      width: 'calc(100% - 4em)',
      position: 'relative',
      marginTop: '2em',
      marginLeft: '2em',
      [theme.breakpoints.down('xs')]: {
        height: 150,
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    playlistPictureContainer: {
      width: '15%',
      height: '100%',
      minWidth: 140,
      maxWidth: 200,
      marginRight: 20,
      backgroundColor: '#252525',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    playlistPicture: {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '100%',
    },
    playlistInfoContainer: {
      width: 'auto',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: 140,
      },
    },
    playlistCategory: {
      textTransform: 'uppercase',
      fontSize: '1.7rem',
      color: theme.palette.primary.main,
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    playlistName: {
      color: theme.palette.primary.light,
      fontSize: '3.3rem',
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: 350,
      [theme.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },
    playlistDescription: {
      color: theme.palette.primary.main,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      fontSize: '1.7rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    playlistButton: {
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.secondary.main,
      marginLeft: '1.3em',
      fontSize: '1.2rem',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        height: '25 !important',
        fontSize: 15,
      },
    },
    extendedIcon: {
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(1),
      },
    },
    headerLine: {
      backgroundColor: theme.palette.background.default,
      marginTop: '2em',
      height: 1,
      width: '100%',
    },
    playlistOptions: {
      position: 'absolute',
      right: 0,
      top: 0,
      color: theme.palette.primary.main,
    },
  });

interface Props extends WithStyles<typeof styles> {
  playlist?: Array<Music>;
  playlistId?: string;
  subTitle: string;
  title: string;
  image: string;
  description?: string;
  noStartButton?: boolean;
  stat: Stats;
  statArg?: any;
}

@observer
class PlaylistHeader extends React.Component<Props, NoState> {
  @observable ref: React.RefObject<HTMLInputElement> = React.createRef();
  @observable pictureHeight: number | null = null;

  componentDidMount() {
    window.addEventListener('resize', this.updatePictureDimensions);
  }

  componentDidUpdate() {
    this.updatePictureDimensions();
  }

  updatePictureDimensions = () => {
    if (this.ref != null && this.ref.current != null) {
      this.pictureHeight = this.ref.current.clientWidth;
    }
  };

  startPlaylist = (): void => {
    if (MusicPlayer.playlistRoute == Navigation.currentRoute) {
      MusicPlayer.pauseOrPlay();
    } else {
      MusicPlayer.setCurrentPlaylist(this.props.playlist);
      MusicPlayer.playMusic(0);
    }
  };

  render() {
    const { classes, playlist, description, image, noStartButton, stat, statArg } = this.props;
    const T = texts.current;
    let icon: JSX.Element;
    let buttonText: string;

    if (MusicPlayer.isPlaying && MusicPlayer.playlistRoute == Navigation.currentRoute) {
      icon = <PauseIcon />;
      buttonText = T.pause;
    } else if (MusicPlayer.playlistRoute != Navigation.currentRoute) {
      icon = <PlayArrowIcon />;
      buttonText = T.play;
    } else {
      icon = <PlayArrowIcon />;
      buttonText = T.continue;
    }

    const containerInformationWidth =
      this.pictureHeight > 0 ? 'calc(100% - 4em - 20px - ' + this.pictureHeight + 'px)' : 'calc(100% - 4em)';

    return (
      <Grid container direction='column' className={classes.root} justify='space-between'>
        {this.props.playlistId ? (
          <div className={classes.playlistOptions}>
            <PlaylistOptions playlist />
          </div>
        ) : null}
        <Grid container item direction='row' style={{ width: '100%' }}>
          <div
            ref={this.ref}
            className={classes.playlistPictureContainer}
            style={this.pictureHeight ? { height: this.pictureHeight } : {}}
          >
            <Grid container alignItems='center' justify='center' style={{ width: '100%', height: '100%' }}>
              <img src={image} className={classes.playlistPicture}></img>
            </Grid>
          </div>
          <Grid
            item
            container
            direction='column'
            className={classes.playlistInfoContainer}
            alignItems='flex-start'
            justify='space-between'
            style={{ width: containerInformationWidth }}
          >
            <Grid item>
              <Typography className={classes.playlistCategory}>{this.props.subTitle}</Typography>
              <Grid container direction='row' alignItems='center' justify='center'>
                <Grid item>
                  <Typography className={classes.playlistName}>{this.props.title}</Typography>
                </Grid>
                {noStartButton ? null : (
                  <Grid item>
                    <Fab
                      variant='extended'
                      size='medium'
                      className={classes.playlistButton}
                      disabled={!MusicPlayer.canPlayPlaylist}
                      aria-label='play'
                      onClick={this.startPlaylist}
                    >
                      {icon}
                      {buttonText}
                    </Fab>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <Typography className={classes.playlistDescription}>
                {description ? description : playlist ? T.nbMusics(playlist.length) : ''}
              </Typography>
              <Typography className={classes.playlistDescription}>{getStat(stat, statArg)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.headerLine}></div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PlaylistHeader);
