import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton, Button, Typography } from '@material-ui/core';

import PlaylistOptions from '../../utils/PlaylistOptions';

import { Music } from '../../../../shared/LoukiTypes';
import LoukiStore from '../../../store/data/LoukiStore';
import MusicPlayer from '../../../store/features/MusicPlayer';
import Navigation from '../../../store/navigation/Navigation';
import Bookmarks from '../../../store/data/Bookmarks';
import Notifications, { NotificationType } from '../../../store/features/Notifications';

import MusicPlayingIcon from './MusicPlayingIcon';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { EmptyPlaylistTexts } from '../../utils/ClientTypes';
import texts from '../../../lang/playlist/playlist-layout';
import notifsTexts from '../../../lang/notifications';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiTableCell-root': {
        padding: '0.2em',
      },
    },
    rowTitles: {
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
      paddingBottom: '0.8em',
    },
    whiteTableRow: {
      color: '#fff',
      fontSize: '1.3rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: 300,
    },
    tableRow: {
      color: theme.palette.primary.main,
      fontSize: '1.3rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: 300,
    },
    rowSelected: {
      backgroundColor: '#151414',
    },
    row: {
      '&:hover': {
        backgroundColor: '#151414',
        cursor: 'pointer',
      },
    },
    menuIcon: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    fillFavIcon: {
      color: theme.palette.secondary.main,
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  searchResults: Array<string> | null;
  playlist: Array<Music>;
  addBookmarksEnabled?: boolean;
  getPlaylistOptionsItems: (id: string) => Array<JSX.Element>;
  emptySettings: EmptyPlaylistTexts;
}

@observer
class PlaylistBodyDesktop extends React.Component<Props & RouteComponentProps, NoState> {
  @observable openSelectPlaylistModal: boolean = false;
  @observable musicToAddToPlaylist: string = '';

  @action playMusic = (index: number): void => {
    MusicPlayer.setCurrentPlaylist(this.props.playlist);
    MusicPlayer.playMusic(index);
  };

  addBookmark = (event, id: string) => {
    const T = notifsTexts.current;

    event.stopPropagation();
    Bookmarks.addBookmark(id);
    const musicName = LoukiStore.idToMusic(id).title;
    Notifications.addNotification(T.addedBookmark(musicName), NotificationType.SUCCESS);
  };

  deleteBookmark = (event, id: string) => {
    const T = notifsTexts.current;

    event.stopPropagation();
    const musicName = LoukiStore.idToMusic(id).title;
    Notifications.addNotification(T.removedBookmark(musicName), NotificationType.SUCCESS);
    Bookmarks.deleteBookmark(id);
  };

  redirectHome = () => {
    const emptySettings: EmptyPlaylistTexts = this.props.emptySettings;
    this.props.history.push(emptySettings.redirectRoute);
  };

  render() {
    const { classes, playlist, searchResults, getPlaylistOptionsItems, emptySettings } = this.props;

    const T = texts.current;

    if (playlist == null || playlist.length == 0) {
      return (
        <React.Fragment>
          <Typography style={{ fontSize: '1.3rem', display: 'inline-block' }}>{emptySettings.emptyText}</Typography>
          <Button className={classes.button} onClick={this.redirectHome}>
            {emptySettings.emptyButtonText}
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Table aria-label='simple table'>
            <TableHead className={classes.rowTitles}>
              <TableRow>
                <TableCell className={classes.rowTitles}>{T.song}</TableCell>
                <TableCell className={classes.rowTitles}>{T.artist}</TableCell>
                <TableCell className={classes.rowTitles}>{T.album}</TableCell>
                <TableCell className={classes.rowTitles}>{T.duration}</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlist.map((music: Music, index: number) => (
                <TableRow
                  key={music.__id}
                  style={searchResults != null && !searchResults.includes(music.__id) ? { display: 'none' } : {}}
                  className={MusicPlayer.playingMusicId == music.__id ? classes.rowSelected : classes.row}
                  onClick={() => {
                    this.playMusic(index);
                  }}
                >
                  <TableCell className={classes.whiteTableRow} component='th' scope='row'>
                    {this.props.addBookmarksEnabled ? (
                      Bookmarks.isInBookmarks(music.__id) ? (
                        <IconButton
                          onClick={event => {
                            this.deleteBookmark(event, music.__id);
                          }}
                        >
                          <FavoriteIcon className={classes.fillFavIcon} />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={event => {
                            this.addBookmark(event, music.__id);
                          }}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                      )
                    ) : null}
                    {MusicPlayer.isPlaying &&
                    MusicPlayer.playingMusicId == music.__id &&
                    Navigation.currentRoute == MusicPlayer.playlistRoute ? (
                      <MusicPlayingIcon />
                    ) : null}
                    {music.title}
                  </TableCell>
                  <TableCell className={classes.whiteTableRow}>{LoukiStore.getArtistNameById(music.artist)}</TableCell>
                  <TableCell className={classes.tableRow}>{LoukiStore.getAlbumNameById(music.album)}</TableCell>
                  <TableCell className={classes.tableRow}>{LoukiStore.msTosec(music.duration)}</TableCell>
                  <TableCell className={classes.tableRow} align='right'>
                    <PlaylistOptions>{getPlaylistOptionsItems(music.__id)}</PlaylistOptions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      );
    }
  }
}

export default withStyles(styles)(withRouter(PlaylistBodyDesktop));
