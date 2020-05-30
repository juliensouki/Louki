import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Grid, Typography } from '@material-ui/core';
import { Page } from '../../pages/artists-or-albums/ArtistsOrAlbums';
import { Artist, Album } from '../../../../shared/LoukiTypes';
import texts from '../../../lang/playlist/artists-or-albums-playlist-layout';

const styles = (theme: Theme) =>
  createStyles({
    songContainer: {
      width: '100%',
      height: 80,
    },
    songName: {
      color: theme.palette.primary.light,
      fontSize: 16,
      fontWeight: 'bold',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: 'calc(100% - 15px)',
    },
    artistName: {
      color: theme.palette.primary.main,
      fontSize: 14,
    },
    songDuration: {
      fontSize: 14,
      color: theme.palette.primary.main,
    },
    songInfoContainer: {
      width: 'auto',
      flexGrow: 1,
    },
  });

interface Props extends WithStyles<typeof styles> {
  playlist: any;
  page: Page;
}

@observer
class PlaylistBodyMobile extends React.Component<Props & RouteComponentProps, NoState> {
  @action redirectToSpecificArtistOrAlbum = (item: Artist | Album) => {
    const page = this.props.page == Page.ARTISTS ? 'artist' : 'album';
    this.props.history.push('/' + page + '/' + item.__id);
  };

  redirectHome = () => {
    this.props.history.push('/all-musics');
  };

  render() {
    const { classes, playlist } = this.props;
    const T = texts.current;

    if (playlist.length == 0) {
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
        <div style={{ width: '100%' }}>
          {playlist.map((row, index) => (
            <Grid
              key={index}
              container
              direction='row'
              alignItems='center'
              justify='space-between'
              className={classes.songContainer}
              onClick={() => {
                this.redirectToSpecificArtistOrAlbum(row);
              }}
            >
              <Grid
                item
                container
                direction='column'
                alignItems='flex-start'
                justify='space-between'
                className={classes.songInfoContainer}
              >
                <Grid item style={{ width: '100%' }}>
                  <Typography className={classes.songName}>{row.title || row.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.artistName}>{row.artist}</Typography>
                </Grid>
              </Grid>
              <Grid item style={{ width: 'auto' }}>
                <Typography className={classes.songDuration}>{row.duration}</Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      );
    }
  }
}

export default withRouter(withStyles(styles)(PlaylistBodyMobile));
