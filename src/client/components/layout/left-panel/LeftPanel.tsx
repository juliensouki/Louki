import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import AlbumIcon from '@material-ui/icons/Album';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MicIcon from '@material-ui/icons/Mic';
import FavoriteIcon from '@material-ui/icons/Favorite';

import LeftPanelButton from './LeftPanelButton';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import MobileMenu from '../../../store/features/MobileMenu';
import LoukiStore from '../../../store/data/LoukiStore';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import texts from '../../../lang/fragments/left-panel';

const styles = (theme: Theme) =>
  createStyles({
    desktopContainer: {
      width: '17%',
      height: 'calc(100% - 4em)',
    },
    root: {
      width: 'calc(100% - 4em)',
      borderTop: '1px solid #403F3F',
      borderBottom: '1px solid #403F3F',
      height: '100%',
      overflow: 'auto',
      padding: '2em',
      display: 'inline-block',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      [theme.breakpoints.down('sm')]: {
        height: 'calc(100% - 4em)',
      },
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 40px)',
      },
    },
    sectionTitle: {
      textTransform: 'uppercase',
      fontSize: '1.7rem',
      '&:not(:first-child)': {
        marginTop: '2em',
      },
      marginBottom: '1em',
    },
    playlistsContainer: {
      overflowY: 'auto',
      flexWrap: 'unset',
    },
  });

@observer
class LeftPanel extends React.Component<WithStyles, NoState> {
  @observable checked: boolean = true;

  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <ResponsiveAdapter
        breakpoint='sm'
        desktop={<div className={classes.desktopContainer} />}
        mobile={<Slide direction='right' in={MobileMenu.isOpen} mountOnEnter unmountOnExit />}
      >
        <div className={classes.root}>
          <Typography className={classes.sectionTitle}>{T.music.title}</Typography>
          <LeftPanelButton routePath='/all-music' text={T.music.allSongs} icon={MusicNoteIcon} />
          <LeftPanelButton showArtist routePath='/artists' text={T.music.artists} icon={MicIcon} />
          <LeftPanelButton routePath='/albums' text={T.music.albums} icon={AlbumIcon} />
          <LeftPanelButton routePath='/favorites' text={T.music.favorites} icon={FavoriteIcon} />

          <Typography className={classes.sectionTitle}>{T.playlists.title}</Typography>
          <Grid container direction='column' className={classes.playlistsContainer}>
            {LoukiStore.allPlaylists.map(playlist => (
              <LeftPanelButton
                playlist
                aboutprops={{ playlist: playlist }}
                key={playlist.__id}
                playlistId={playlist.__id}
                routePath='/playlist'
                text={playlist.name}
                icon={QueueMusicIcon}
              />
            ))}
          </Grid>
          <LeftPanelButton routePath='/new-playlist' text={T.playlists.newPlaylist} icon={PlaylistAddIcon} />
        </div>
      </ResponsiveAdapter>
    );
  }
}

export default withStyles(styles)(LeftPanel);
