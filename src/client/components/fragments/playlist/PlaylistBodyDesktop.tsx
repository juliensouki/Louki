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

import IMusic from '../../../../shared/IMusic';
import MusicsData from '../../../store/common/MusicsData';
import MusicPlayer from '../../../store/common/MusicPlayer';
import AddBookmark from '../../../store/functions/bookmarks/AddBookmarks';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiTableCell-root': {
        padding: 8,
      },
    },
    root: {
      marginLeft: 20,
      width: 'calc(100% - 40px)',
      height: 'calc(100% - 280px)',
      marginTop: 20,
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 240px)',
      },
    },
    rowTitles: {
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      fontSize: 16,
      color: theme.palette.primary.main,
    },
    tableRow: {
      color: theme.palette.primary.main,
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
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IMusic>;
  favorites?: boolean;
}

@observer
class PlaylistBodyDesktop extends React.Component<IProps, NoState> {
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

  editInformation = (event, index: number) => {
    event.stopPropagation();
    console.log('Editing information of music ' + this.props.playlist[index].title);
  };

  addMusicToPlaylist = (event, index: number) => {
    event.stopPropagation();
  };

  addBookmark = (event, id: string) => {
    event.stopPropagation();
    AddBookmark(id);
  };

  render() {
    const { classes, playlist } = this.props;

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
              className={classes.row}
              onClick={() => {
                this.playMusic(index);
              }}
            >
              <TableCell style={{ color: '#FFF' }} component='th' scope='row'>
                {this.props.favorites ? (
                  <IconButton
                    onClick={event => {
                      this.addBookmark(event, row.__id);
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                ) : null}
                {row.title}
              </TableCell>
              <TableCell style={{ color: '#FFF' }}>{MusicsData.getArtistNameById(row.artist)}</TableCell>
              <TableCell className={classes.tableRow}>{MusicsData.getAlbumNameById(row.album)}</TableCell>
              <TableCell className={classes.tableRow}>{MusicsData.msTosec(row.duration)}</TableCell>
              <TableCell className={classes.tableRow} align='right'>
                <PlaylistOptions music={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(PlaylistBodyDesktop);
