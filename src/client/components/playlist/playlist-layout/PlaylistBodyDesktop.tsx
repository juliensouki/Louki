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
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';
import SelectPlaylistModal from '../../modals/SelectPlaylistModal';

import { Music } from '../../../../shared/LoukiTypes';
import LoukiStore from '../../../store/data/LoukiStore';
import MusicPlayer from '../../../store/features/MusicPlayer';
import Navigation from '../../../store/navigation/Navigation';
import Bookmarks from '../../../store/data/Bookmarks';

import { RemoveMusicFromPlaylist, RemoveMusicResponse } from '../../../requests/Playlists';

import MusicPlayingIcon from './MusicPlayingIcon';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import texts from '../../../lang/fragments/playlist/playlist-body';

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
  playlist: Array<Music>;
  canAddToFavorites?: boolean;
  favorites: boolean;
  customPlaylist?: boolean;
  allSongs?: boolean;
  emptyPlaylistText: string;
  emptyPlaylistButtonText: string;
  emptyPlaylistRedirectRoute: string;
  searchResults: Array<string>;
}

@observer
class PlaylistBodyDesktop extends React.Component<Props & WithSnackbarProps & RouteComponentProps, NoState> {
  @observable openSelectPlaylistModal: boolean = false;
  @observable musicToAddToPlaylist: string = '';

  @action playMusic = (index: number): void => {
    MusicPlayer.setCurrentPlaylist(this.props.playlist);
    MusicPlayer.playMusic(index);
  };

  addBookmark = (event, id: string) => {
    event.stopPropagation();
    Bookmarks.addBookmark(id);
    const snackbarOptions = { variant: 'success' as any };
    const musicName = LoukiStore.idToMusic(id).title;
    this.props.enqueueSnackbar(texts.current.addBookmarkNotif(musicName), snackbarOptions);
  };

  deleteBookmark = (event, id: string) => {
    event.stopPropagation();
    const snackbarOptions = { variant: 'success' as any };
    const musicName = LoukiStore.idToMusic(id).title;
    this.props.enqueueSnackbar(texts.current.removeBookmarkNotif(musicName), snackbarOptions);
    Bookmarks.deleteBookmark(id);
  };

  redirectHome = () => {
    this.props.history.push(this.props.emptyPlaylistRedirectRoute);
  };

  handleEditMusic = () => {
    const snackbarOptions = { variant: 'info' as any };
    this.props.enqueueSnackbar('This feature has not been developed yet.', snackbarOptions);
  };

  handleRemoveBookmark = (id: string) => {
    const snackbarOptions = { variant: 'success' as any };
    const musicName = LoukiStore.idToMusic(id).title;
    this.props.enqueueSnackbar(texts.current.removeBookmarkNotif(musicName), snackbarOptions);
    Bookmarks.deleteBookmark(id);
  };

  @action handleAddMusicToPlaylist = (id: string) => {
    this.openSelectPlaylistModal = true;
    this.musicToAddToPlaylist = id;
  };

  @action handleCloseModal = event => {
    event.stopPropagation();
    this.openSelectPlaylistModal = false;
  };

  @action removeFromPlaylist = (id: string) => {
    const playlistId = LoukiStore.currentPlaylist.__id;

    RemoveMusicFromPlaylist(id, playlistId).then((response: RemoveMusicResponse) => {
      LoukiStore.setCurrentPlaylist(response);
      const snackbarOptions = { variant: 'success' as any };
      const musicName = LoukiStore.idToMusic(id).title;
      const playlistName = LoukiStore.idToPlaylist(playlistId).name;
      this.props.enqueueSnackbar('Song removed from playlist', snackbarOptions);
    });
  };

  getPlaylistOptionsItems(id: string): Array<JSX.Element> {
    if (this.props.favorites) {
      return [
        <PlaylistOptionsItem
          key={0}
          title='Remove bookmark'
          handleClick={() => {
            this.handleRemoveBookmark(id);
          }}
        />,
        <PlaylistOptionsItem key={1} title='Edit music' handleClick={this.handleEditMusic} />,
      ];
    } else if (this.props.allSongs) {
      return [
        <PlaylistOptionsItem
          key={0}
          title='Add to playlist..'
          handleClick={() => {
            this.handleAddMusicToPlaylist(id);
          }}
        />,
        <PlaylistOptionsItem key={1} title='Edit music' handleClick={this.handleEditMusic} />,
      ];
    } else if (this.props.customPlaylist) {
      return [
        <PlaylistOptionsItem
          key={0}
          title='Remove from playlist'
          handleClick={() => {
            this.removeFromPlaylist(id);
          }}
        />,
        <PlaylistOptionsItem key={1} title='Edit music' handleClick={this.handleEditMusic} />,
      ];
    }
    return [];
  }

  render() {
    const { classes, playlist, emptyPlaylistText, emptyPlaylistButtonText, searchResults } = this.props;

    const T = texts.current;

    if (playlist == null || playlist.length == 0) {
      return (
        <React.Fragment>
          <Typography style={{ fontSize: '1.3rem', display: 'inline-block' }}>{emptyPlaylistText}</Typography>
          <Button className={classes.button} onClick={this.redirectHome}>
            {emptyPlaylistButtonText}
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <SelectPlaylistModal
            open={this.openSelectPlaylistModal}
            handleClose={this.handleCloseModal}
            musicId={this.musicToAddToPlaylist}
          />
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
                    {this.props.canAddToFavorites ? (
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
                    <PlaylistOptions>{this.getPlaylistOptionsItems(music.__id)}</PlaylistOptions>
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

export default withSnackbar(withRouter(withStyles(styles)(PlaylistBodyDesktop)));
