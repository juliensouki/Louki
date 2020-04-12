import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IconButton } from '@material-ui/core';

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
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IMusic>;
  canAddToFavorites?: boolean;
  favorites: boolean;
  customPlaylist?: boolean;
  allSongs?: boolean;
}

@observer
class PlaylistBodyDesktop extends React.Component<IProps & WithSnackbarProps, NoState> {
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
    this.props.enqueueSnackbar(musicName + ' has been added to favorites ', snackbarOptions);
  };

  deleteBookmark = (event, id: string) => {
    event.stopPropagation();
    const snackbarOptions = { variant: 'success' as any };
    const musicName = MusicsData.idToMusic(id).title;
    this.props.enqueueSnackbar(musicName + ' has been removed from favorites ', snackbarOptions);
    BookmarksData.deleteBookmark(id);
  };

  render() {
    const { classes, playlist, favorites, customPlaylist, allSongs } = this.props;

    return (
      <Table aria-label='simple table'>
        <TableHead className={classes.rowTitles}>
          <TableRow>
            <TableCell className={classes.rowTitles}>Song</TableCell>
            <TableCell className={classes.rowTitles}>Artist</TableCell>
            <TableCell className={classes.rowTitles}>Album</TableCell>
            <TableCell className={classes.rowTitles}>Duration</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlist.map((row, index) => (
            <TableRow
              key={row.__id}
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

export default withSnackbar(withStyles(styles)(PlaylistBodyDesktop));
