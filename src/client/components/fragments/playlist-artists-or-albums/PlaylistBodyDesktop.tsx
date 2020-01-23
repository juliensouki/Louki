import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  });

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IArtist> | Array<IAlbum>;
  page: Page;
}

@observer
class PlaylistBodyDesktop extends React.Component<IProps, NoState> {
  render() {
    const { classes, playlist, page } = this.props;

    return (
      <Table aria-label='simple table'>
        <TableHead className={classes.rowTitles}>
          <TableRow>
            <TableCell className={classes.rowTitles}></TableCell>
            <TableCell className={classes.rowTitles}>{CurrentArtistOrAlbum.showArtist ? 'Name' : 'Title'}</TableCell>
            {page == Page.ARTISTS ? <React.Fragment /> : <TableCell className={classes.rowTitles}>Artist</TableCell>}
            <TableCell className={classes.rowTitles}>Number of songs</TableCell>
            <TableCell className={classes.rowTitles}>Duration</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(playlist as Array<IArtist | IAlbum>).map(row => (
            <TableRow key={(row as IAlbum).title || (row as IArtist).name}>
              <TableCell component='th' scope='row'>
                {page == Page.ARTISTS ? <MicIcon /> : <AlbumIcon />}
              </TableCell>
              <TableCell style={{ color: '#FFF' }} component='th' scope='row'>
                {page == Page.ARTISTS ? (row as IArtist).name : (row as IAlbum).title}
              </TableCell>
              {page == Page.ARTISTS ? (
                <React.Fragment />
              ) : (
                <TableCell style={{ color: '#FFF' }}>{MusicsData.getArtistNameById((row as IAlbum).author)}</TableCell>
              )}
              <TableCell className={classes.tableRow}>{row.musics.length}</TableCell>
              <TableCell className={classes.tableRow}>{MusicsData.totalDuration(row.musics)}</TableCell>
              <TableCell className={classes.tableRow} align='right'>
                <IconButton aria-label='options'>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(PlaylistBodyDesktop);
