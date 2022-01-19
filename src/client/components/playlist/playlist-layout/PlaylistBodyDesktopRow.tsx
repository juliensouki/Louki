import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Grid, IconButton, Typography } from '@material-ui/core';

import PlaylistOptions from '../../utils/options/PlaylistOptions';

import { Music } from '../../../../shared/LoukiTypes';
import LoukiStore from '../../../store/data/LoukiStore';
import MusicPlayer from '../../../store/features/MusicPlayer';
import Navigation from '../../../store/navigation/Navigation';
import Bookmarks from '../../../store/data/Bookmarks';
import Notifications, { NotificationType } from '../../../store/features/Notifications';

import MusicPlayingIcon from './MusicPlayingIcon';
import notifsTexts from '../../../lang/notifications';

const styles = (theme: Theme) =>
  createStyles({
    whiteTableRow: {
      color: '#fff',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    tableRow: {
      color: theme.palette.primary.main,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
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
    fillFavIcon: {
      color: theme.palette.secondary.main,
    },
    tableText: {
      fontSize: 14,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  });

interface Props extends WithStyles<typeof styles> {
  searchResults: Array<string> | null;
  getPlaylistOptionsItems: (id: string) => Array<JSX.Element>;
  music: Music;
  index: number;
  playlist: Music[];
  image: string;
  addBookmarksEnabled?: boolean;
}

@observer
class PlaylistBodyDesktopRow extends React.Component<Props, NoState> {
  @observable ref: React.RefObject<HTMLDivElement> = React.createRef();
  @observable maxWidthTitle: number | undefined;

  constructor(props) {
    super(props);
    window.addEventListener('resize', this.handleResize);
  }

  @action playMusic = (index: number): void => {
    MusicPlayer.setCurrentPlaylist(this.props.playlist);
    MusicPlayer.setPreviewImage(this.props.image);
    MusicPlayer.playMusic(index);
  };

  addBookmark = (event, id: string) => {
    const T = notifsTexts.current;

    event.stopPropagation();
    Bookmarks.addBookmark(id);
    const musicName = LoukiStore.idToMusic(id).title;
    Notifications.addNotification(T.addedBookmark(musicName), NotificationType.SUCCESS);
  };

  deleteBookmark = (event, id: string) => {
    const T = notifsTexts.current;

    event.stopPropagation();
    const musicName = LoukiStore.idToMusic(id).title;
    Notifications.addNotification(T.removedBookmark(musicName), NotificationType.SUCCESS);
    Bookmarks.deleteBookmark(id);
  };

  @action
  handleResize = () => {
    this.maxWidthTitle = this.ref && this.ref.current ? this.ref.current.offsetWidth - 50 : undefined;
  };

  render() {
    const { classes, music, index, searchResults, getPlaylistOptionsItems } = this.props;
    const isMusicPlaying =
      MusicPlayer.isPlaying &&
      MusicPlayer.playingMusicId == music.__id &&
      Navigation.currentRoute == MusicPlayer.playlistRoute;

    return (
      <Grid
        container
        direction='row'
        alignItems='center'
        style={searchResults != null && !searchResults.includes(music.__id) ? { display: 'none' } : {}}
        className={MusicPlayer.playingMusicId == music.__id ? classes.rowSelected : classes.row}
        onClick={() => {
          this.playMusic(index);
        }}
      >
        <Grid className={classes.whiteTableRow} container alignItems='center' item ref={this.ref} xs={6}>
          {this.props.addBookmarksEnabled ? (
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
          {isMusicPlaying ? <MusicPlayingIcon /> : null}
          <Typography
            style={{
              maxWidth: this.maxWidthTitle,
              paddingLeft: isMusicPlaying ? undefined : 5,
            }}
            className={classes.tableText}
          >
            {music.title}
          </Typography>
        </Grid>
        <Grid container item xs={2} className={classes.whiteTableRow}>
          <Typography className={classes.tableText}>{LoukiStore.getArtistNameById(music.artist)}</Typography>
        </Grid>
        <Grid container item xs={2} className={classes.tableRow}>
          <Typography className={classes.tableText}>{LoukiStore.getAlbumNameById(music.album)}</Typography>
        </Grid>
        <Grid container item xs={1} className={classes.tableRow}>
          <Typography className={classes.tableText}>{LoukiStore.msTosec(music.duration)}</Typography>
        </Grid>
        <Grid container item xs={1} className={classes.tableRow}>
          <PlaylistOptions>{getPlaylistOptionsItems(music.__id)}</PlaylistOptions>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PlaylistBodyDesktopRow);
