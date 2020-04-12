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
import MobileMenu from '../../../store/fragments/left-panel/MobileMenu';
import MusicsData from '../../../store/common/MusicsData';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

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

interface IProps extends WithStyles<typeof styles> {}; // eslint-disable-line

@observer
class LeftPanel extends React.Component<IProps, NoState> {
  @observable checked: boolean = true;

  render() {
    const { classes } = this.props;

    return (
      <ResponsiveAdapter
        breakpoint='sm'
        desktop={<div className={classes.desktopContainer} />}
        mobile={<Slide direction='right' in={MobileMenu.isOpen} mountOnEnter unmountOnExit />}
      >
        <div className={classes.root}>
          <Typography className={classes.sectionTitle}>Music</Typography>
          <LeftPanelButton routePath='/all-music' text='All Songs' icon={MusicNoteIcon} />
          <LeftPanelButton showArtist routePath='/artists' text='Artists' icon={MicIcon} />
          <LeftPanelButton routePath='/albums' text='Albums' icon={AlbumIcon} />
          <LeftPanelButton routePath='/favorites' text='Favorites' icon={FavoriteIcon} />

          <Typography className={classes.sectionTitle}>Playlists</Typography>
          <Grid container direction='column' className={classes.playlistsContainer}>
            {MusicsData.allPlaylists.map(playlist => (
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
          <LeftPanelButton routePath='/new-playlist' text='New Playlist' icon={PlaylistAddIcon} />
        </div>
      </ResponsiveAdapter>
    );
  }
}

export default withStyles(styles)(LeftPanel);
