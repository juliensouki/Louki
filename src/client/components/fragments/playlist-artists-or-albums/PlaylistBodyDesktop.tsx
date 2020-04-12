import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Redirect } from 'react-router';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CurrentArtistOrAlbum from '../../../store/pages/artistsOrAlbums/CurrentArtistOrAlbum';
import AlbumIcon from '@material-ui/icons/Album';
import MicIcon from '@material-ui/icons/Mic';

import IArtist from '../../../../shared/IArtist';
import IAlbum from '../../../../shared/IAlbum';
import { Page } from '../../pages/artists-or-albums/ArtistsOrAlbums';
import MusicsData from '../../../store/common/MusicsData';

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
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IArtist> | Array<IAlbum>;
  page: Page;
}

@observer
class PlaylistBodyDesktop extends React.Component<IProps, NoState> {
  @observable url: string | null = null;

  @action redirectToSpecificArtistOrAlbum = (item: IArtist | IAlbum) => {
    const page = this.props.page == Page.ARTISTS ? 'artist' : 'album';
    this.url = '/' + page + '/' + item.__id;
  };

  render() {
    const { classes, playlist, page } = this.props;

    if (this.url == null) {
      return (
        <Table aria-label='simple table'>
          <TableHead className={classes.rowTitles}>
            <TableRow>
              <TableCell className={classes.rowTitles}></TableCell>
              <TableCell className={classes.rowTitles}>{CurrentArtistOrAlbum.showArtist ? 'Name' : 'Title'}</TableCell>
              {page == Page.ARTISTS ? <React.Fragment /> : <TableCell className={classes.rowTitles}>Artist</TableCell>}
              <TableCell className={classes.rowTitles}>Number of songs</TableCell>
              <TableCell className={classes.rowTitles}>Duration</TableCell>
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
    } else return <Redirect to={this.url} push />;
  }
}

export default withStyles(styles)(PlaylistBodyDesktop);
