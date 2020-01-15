import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import AlbumIcon from '@material-ui/icons/Album';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MicIcon from '@material-ui/icons/Mic';
import FavoriteIcon from '@material-ui/icons/Favorite';

import LeftPanelButton from './LeftPanelButton';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import MobileMenu from '../../../store/fragments/left-panel/MobileMenu';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      zIndex: 2,
      top: 60,
      left: 0,
      height: 'calc(100% - 60px - 80px - 40px)',
      width: 310,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      padding: 20,
      borderTop: '1px solid #403F3F',
      borderBottom: '1px solid #403F3F',
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 40px)',
      },
    },
    sectionTitle: {
      textTransform: 'uppercase',
      fontSize: 18,
      marginTop: 30,
      marginBottom: 15,
    },
    playlistsContainer: {
      maxHeight: 'calc(100% - 367px)',
      width: 'calc(100% - 20px)',
      overflowY: 'auto',
      flexWrap: 'unset',
    },
  });

interface IProps extends WithStyles<typeof styles> {}; // eslint-disable-line

@observer
class LeftPanel extends React.Component<IProps, NoState> {
  @observable checked: boolean = true;

  render() {
    const { classes } = this.props;

    return (
      <ResponsiveAdapter
        breakpoint='sm'
        desktop={<div />}
        mobile={<Slide direction='right' in={MobileMenu.isOpen} mountOnEnter unmountOnExit />}
      >
        <div className={classes.root}>
          <Typography className={classes.sectionTitle}>Music</Typography>
          <LeftPanelButton routePath='/all-music' text='All Songs' icon={<MusicNoteIcon />} />
          <LeftPanelButton showArtist routePath='/artists' text='Artists' icon={<MicIcon />} />
          <LeftPanelButton routePath='/albums' text='Albums' icon={<AlbumIcon />} />
          <LeftPanelButton routePath='/favorites' text='Favorites' icon={<FavoriteIcon />} />

          <Typography className={classes.sectionTitle}>Playlists</Typography>
          <Grid container direction='column' className={classes.playlistsContainer}>
            <LeftPanelButton playlist routePath='/playlist' text='playlist-1' icon={<QueueMusicIcon />} />
            <LeftPanelButton playlist routePath='/playlist' text='playlist-2' icon={<QueueMusicIcon />} />
            <LeftPanelButton playlist routePath='/playlist' text='playlist-3' icon={<QueueMusicIcon />} />
            <LeftPanelButton playlist routePath='/playlist' text='playlist-4' icon={<QueueMusicIcon />} />
            <LeftPanelButton playlist routePath='/playlist' text='playlist-5' icon={<QueueMusicIcon />} />
            <LeftPanelButton playlist routePath='/playlist' text='playlist-6' icon={<QueueMusicIcon />} />
          </Grid>
          <LeftPanelButton routePath='/new-playlist' text='New Playlist' icon={<PlaylistAddIcon />} />
        </div>
      </ResponsiveAdapter>
    );
  }
}

export default withStyles(styles)(LeftPanel);
