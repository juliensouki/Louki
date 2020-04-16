import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Button } from '@material-ui/core';

import CurrentArtistOrAlbum from '../../../store/pages/artistsOrAlbums/CurrentArtistOrAlbum';
import AlbumIcon from '@material-ui/icons/Album';
import MicIcon from '@material-ui/icons/Mic';

import IArtist from '../../../../shared/IArtist';
import IAlbum from '../../../../shared/IAlbum';
import { Page } from '../../pages/artists-or-albums/ArtistsOrAlbums';
import MusicsData from '../../../store/common/MusicsData';

import texts from '../../../lang/fragments/playlist/playlist-body-artists-or-albums';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiTableCell-root': {
        padding: '1.3em',
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
      paddingBottom: '0.8em',
    },
    whiteTableRow: {
      color: '#fff',
      fontSize: '1.3rem',
    },
    tableRow: {
      color: theme.palette.primary.main,
      fontSize: '1.3rem',
    },
    row: {
      '&:hover': {
        backgroundColor: '#151414',
        cursor: 'pointer',
      },
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
  playlist: Array<IArtist> | Array<IAlbum>;
  page: Page;
}

@observer
class PlaylistBodyDesktop extends React.Component<IProps & RouteComponentProps, NoState> {
  @action redirectToSpecificArtistOrAlbum = (item: IArtist | IAlbum) => {
    const page = this.props.page == Page.ARTISTS ? 'artist' : 'album';
    this.props.history.push('/' + page + '/' + item.__id);
  };

  redirectHome = () => {
    this.props.history.push('/all-music');
  };

  render() {
    const { classes, playlist, page } = this.props;
    const T = texts.current;

    if (playlist.lenght == 0) {
      return (
        <React.Fragment>
          <Typography style={{ fontSize: '1.3rem', display: 'inline-block' }}>
            {this.props.page == Page.ARTISTS ? T.artists.emptyText : T.albums.emptyText}
          </Typography>
          <Button className={classes.button} onClick={this.redirectHome}>
            {this.props.page == Page.ARTISTS ? T.artists.emptyButton : T.albums.emptyButton}
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <Table aria-label='simple table'>
          <TableHead className={classes.rowTitles}>
            <TableRow>
              <TableCell className={classes.rowTitles}></TableCell>
              <TableCell className={classes.rowTitles}>{page == Page.ARTISTS ? T.artist : T.albums.title}</TableCell>
              {page == Page.ARTISTS ? (
                <React.Fragment />
              ) : (
                <TableCell className={classes.rowTitles}>{T.artist}</TableCell>
              )}
              <TableCell className={classes.rowTitles}>{T.nbSongs}</TableCell>
              <TableCell className={classes.rowTitles}>{T.duration}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(playlist as Array<IArtist | IAlbum>).map(row => (
              <TableRow
                key={(row as IAlbum).title || (row as IArtist).name}
                onClick={() => {
                  this.redirectToSpecificArtistOrAlbum(row);
                }}
                className={classes.row}
              >
                <TableCell component='th' scope='row'>
                  {page == Page.ARTISTS ? <MicIcon /> : <AlbumIcon />}
                </TableCell>
                <TableCell className={classes.whiteTableRow} component='th' scope='row'>
                  {page == Page.ARTISTS ? (row as IArtist).name : (row as IAlbum).title}
                </TableCell>
                {page == Page.ARTISTS ? (
                  <React.Fragment />
                ) : (
                  <TableCell className={classes.whiteTableRow}>
                    {MusicsData.getArtistNameById((row as IAlbum).author)}
                  </TableCell>
                )}
                <TableCell className={classes.tableRow}>{row.musics.length}</TableCell>
                <TableCell className={classes.tableRow}>{MusicsData.totalDuration(row.musics)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  }
}

export default withRouter(withStyles(styles)(PlaylistBodyDesktop));
