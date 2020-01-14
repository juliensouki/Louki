import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import CurrentArtistOrAlbum from '../../../store/pages/artistsOrAlbums/CurrentArtistOrAlbum';

const styles = (theme: Theme) => createStyles({
    '@global': {
        '.MuiTableCell-root': {
            padding: 8,
        },
    },
    root: {
        marginLeft: 20,
        width: "calc(100% - 40px)",
        height: "calc(100% - 280px)",
        marginTop: 20,
        [theme.breakpoints.down("xs")]: {
            height: "calc(100% - 240px)",
        }
    },
    table: {
    },
    rowTitles: {
        fontWeight: "bolder",
        textTransform: "uppercase",
        fontSize: 16,
        color: theme.palette.primary.main,
    },
    tableRow: {
        color: theme.palette.primary.main,        
    },
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class PlaylistBody extends React.Component<Props, NoState>
{
  get playlistArtist(): Array<any> 
  {
    return [
      {
        name: 'Coldplay',
        numberSongs: '14',
        duration: '31:42',
      },
      {
        name: 'Radiohead',
        numberSongs: '19',
        duration: '43:21',
      },
      {
        name: 'Hans Zimmer',
        numberSongs: '12',
        duration: '39:29',
      },
    ];
  }

  get playlistAlbum(): Array<any> 
  {
    return [
      {
        title: 'A Rush Of Blood to the Head',
        artist: 'Coldplay',
        numberSongs: '4',
        duration: '13:42',
      },
      {
        title: 'Rainbo',
        artist: 'Radiohead',
        numberSongs: '2',
        duration: '8:42',
      },
    ];
  }

  render()
  {
      const { classes } = this.props;
      const playlist = CurrentArtistOrAlbum.showArtist ? this.playlistArtist : this.playlistAlbum;
  
      return (
          <div className={classes.root}>
              <ResponsiveAdapter mobile={
                  <PlaylistBodyMobile playlist={playlist}/>
              }
              desktop={
                  <PlaylistBodyDesktop playlist={playlist}/>
              }/>
          </div>
      );
  }
}

export default withStyles(styles)(PlaylistBody);