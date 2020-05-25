import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Grid, Typography } from '@material-ui/core';
import { EmptyPlaylistTexts } from '../../utils/ClientTypes';
import PlaylistOptions from '../../utils/PlaylistOptions';
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';
import Bookmarks from '../../../store/data/Bookmarks';
import { AddBookmark, AddBookmarkResponse, RemoveBookmark, RemoveBookmarkResponse } from '../../../requests/Bookmarks';
import Notifications, { NotificationType } from '../../../store/features/Notifications';
import notifsTexts from '../../../lang/notifications';

import { Music } from '../../../../shared/LoukiTypes';
import LoukiStore from '../../../store/data/LoukiStore';
import MusicPlayer from '../../../store/features/MusicPlayer';
import Navigation from '../../../store/navigation/Navigation';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
      },
    },
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
      width: 'calc(100% - 150px)',
      flexGrow: 1,
    },
  });

interface Props extends WithStyles<typeof styles> {
  playlist: Array<Music>;
  searchResults: Array<string> | null;
  addBookmarksEnabled?: boolean;
  getPlaylistOptionsItems: (id: string) => Array<JSX.Element>;
  emptySettings: EmptyPlaylistTexts;
  image: string;
}

@observer
class PlaylistBodyMobile extends React.Component<Props & RouteComponentProps, NoState> {
  playMusic = (index: number): void => {
    MusicPlayer.setCurrentPlaylist(this.props.playlist);
    MusicPlayer.setCurrentPlaylist(this.props.image);
    MusicPlayer.playMusic(index);
  };

  redirectHome = () => {
    const emptySettings: EmptyPlaylistTexts = this.props.emptySettings;
    this.props.history.push(emptySettings.redirectRoute);
  };

  handleAddBookmark = (musicId: string): void => {
    AddBookmark(musicId).then((response: AddBookmarkResponse) => {
      if (response.status == 200) {
        Bookmarks.setBookmarks(LoukiStore.idsToMusics(response.data));
        Notifications.addNotification(
          notifsTexts.current.addedBookmark(LoukiStore.idToMusic(musicId).title),
          NotificationType.SUCCESS,
        );
      }
    });
  };

  handleRemoveBookmark = (musicId: string): void => {
    RemoveBookmark(musicId).then((response: RemoveBookmarkResponse) => {
      if (response.status == 200) {
        Bookmarks.setBookmarks(LoukiStore.idsToMusics(response.data));
        Notifications.addNotification(
          notifsTexts.current.removedBookmark(LoukiStore.idToMusic(musicId).title),
          NotificationType.SUCCESS,
        );
      }
    });
  };

  render() {
    const {
      classes,
      playlist,
      emptySettings,
      getPlaylistOptionsItems,
      searchResults,
      addBookmarksEnabled,
    } = this.props;

    if (playlist == null || playlist.length == 0) {
      return (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography style={{ fontSize: '1.3rem', display: 'inline-block' }}>{emptySettings.emptyText}</Typography>
          <Button className={classes.button} onClick={this.redirectHome}>
            {emptySettings.emptyButtonText}
          </Button>
        </Grid>
      );
    } else {
      return (
        <div style={{ width: '100%' }}>
          {playlist.map((music, index) => (
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='space-between'
              key={music.__id}
              style={searchResults != null && !searchResults.includes(music.__id) ? { display: 'none' } : {}}
              className={classes.songContainer}
            >
              <Grid item style={{ marginLeft: -15 }}>
                <PlaylistOptions>
                  {getPlaylistOptionsItems(music.__id)}
                  {addBookmarksEnabled ? (
                    <PlaylistOptionsItem
                      title={Bookmarks.isInBookmarks(music.__id) ? 'Remove from favorites' : 'Add to favorites'}
                      handleClick={() => {
                        Bookmarks.isInBookmarks(music.__id)
                          ? this.handleRemoveBookmark(music.__id)
                          : this.handleAddBookmark(music.__id);
                      }}
                    />
                  ) : (
                    []
                  )}
                </PlaylistOptions>
              </Grid>
              <Grid
                item
                container
                direction='column'
                alignItems='flex-start'
                justify='space-between'
                onClick={() => {
                  this.playMusic(index);
                }}
                className={classes.songInfoContainer}
              >
                <Grid item style={{ width: '100%' }}>
                  {MusicPlayer.playingMusicId == music.__id && Navigation.currentRoute == MusicPlayer.playlistRoute ? (
                    <Typography style={{ color: 'rgb(255, 177, 59)' }} className={classes.songName}>
                      {music.title}
                    </Typography>
                  ) : (
                    <Typography className={classes.songName}>{music.title}</Typography>
                  )}
                </Grid>
                <Grid item>
                  <Typography className={classes.artistName}>{LoukiStore.getArtistNameById(music.artist)}</Typography>
                </Grid>
              </Grid>
              <Grid item style={{ width: 'auto' }}>
                <Typography className={classes.songDuration}>{LoukiStore.msTosec(music.duration)}</Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      );
    }
  }
}

export default withRouter(withStyles(styles)(PlaylistBodyMobile));
