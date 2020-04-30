import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IconButton, Button, Typography } from '@material-ui/core';

import PlaylistOptions from './PlaylistOptions';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import IMusic from '../../../../shared/IMusic';
import MusicsData from '../../../store/common/MusicsData';
import MusicPlayer from '../../../store/common/MusicPlayer';
import NavigationForm from '../../../store/common/NavigationForm';
import BookmarksData from '../../../store/common/BookmarksData';

import MusicPlayingIcon from '../../../assets/MusicPlayingIcon';
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

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IMusic>;
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
class PlaylistBodyDesktop extends React.Component<IProps & WithSnackbarProps & RouteComponentProps, NoState> {
  @observable arrayOfAnchorEl: Array<HTMLElement | null> = [];

  playMusic = (index: number): void => {
    MusicPlayer.setCurrentPlaylist(this.props.playlist);
    MusicPlayer.playMusic(index);
  };

  handleMenu = (event, index) => {
    event.stopPropagation();
    this.arrayOfAnchorEl[index] = event.currentTarget;
  };

  handleClose = (event, index: number) => {
    event.stopPropagation();
    this.arrayOfAnchorEl[index] = null;
  };

  addBookmark = (event, id: string) => {
    event.stopPropagation();
    BookmarksData.addBookmark(id);
    const snackbarOptions = { variant: 'success' as any };
    const musicName = MusicsData.idToMusic(id).title;
    this.props.enqueueSnackbar(texts.current.addBookmarkNotif(musicName), snackbarOptions);
  };

  deleteBookmark = (event, id: string) => {
    event.stopPropagation();
    const snackbarOptions = { variant: 'success' as any };
    const musicName = MusicsData.idToMusic(id).title;
    this.props.enqueueSnackbar(texts.current.removeBookmarkNotif(musicName), snackbarOptions);
    BookmarksData.deleteBookmark(id);
  };

  redirectHome = () => {
    this.props.history.push(this.props.emptyPlaylistRedirectRoute);
  };

  render() {
    const {
      classes,
      playlist,
      favorites,
      customPlaylist,
      allSongs,
      emptyPlaylistText,
      emptyPlaylistButtonText,
      searchResults,
    } = this.props;

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
            {playlist.map((row, index) => (
              <TableRow
                key={row.__id}
                style={searchResults != null && !searchResults.includes(row.__id) ? { display: 'none' } : {}}
                className={MusicPlayer.playingMusicId == row.__id ? classes.rowSelected : classes.row}
                onClick={() => {
                  this.playMusic(index);
                }}
              >
                <TableCell className={classes.whiteTableRow} component='th' scope='row'>
                  {this.props.canAddToFavorites ? (
                    BookmarksData.isInBookmarks(row.__id) ? (
                      <IconButton
                        onClick={event => {
                          this.deleteBookmark(event, row.__id);
                        }}
                      >
                        <FavoriteIcon className={classes.fillFavIcon} />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={event => {
                          this.addBookmark(event, row.__id);
                        }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    )
                  ) : null}
                  {MusicPlayer.playingMusicId == row.__id && NavigationForm.currentRoute == MusicPlayer.playlistRoute ? (
                    <MusicPlayingIcon />
                  ) : null}
                  {row.title}
                </TableCell>
                <TableCell className={classes.whiteTableRow}>{MusicsData.getArtistNameById(row.artist)}</TableCell>
                <TableCell className={classes.tableRow}>{MusicsData.getAlbumNameById(row.album)}</TableCell>
                <TableCell className={classes.tableRow}>{MusicsData.msTosec(row.duration)}</TableCell>
                <TableCell className={classes.tableRow} align='right'>
                  <PlaylistOptions
                    music={row as IMusic}
                    allSongs={allSongs}
                    removeBookmark={favorites}
                    musicInPlaylist={customPlaylist}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  }
}

export default withRouter(withSnackbar(withStyles(styles)(PlaylistBodyDesktop)));
