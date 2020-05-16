import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PlaylistMenu from './PlaylistMenu';
import SelectPlaylistModal from '../modals/SelectPlaylistModal';
import UpdatePlaylistModal from '../modals/update-playlist-modal/UpdatePlaylistModal';
import Bookmarks from '../../store/data/Bookmarks';

import { Music } from '../../../shared/LoukiTypes';
import NavigationForm from '../../store/navigation/Navigation';
import LoukiStore from '../../store/data/LoukiStore';

import {
  RemoveMusicFromPlaylist,
  RemoveMusicResponse,
  DeletePlaylist,
  DeletePlaylistResponse,
} from '../../requests/Playlists';

import texts from '../../lang/fragments/options';
import { withSnackbar, WithSnackbarProps } from 'notistack';

const styles = (theme: Theme) =>
  createStyles({
    menuIcon: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  music?: Music;
  playlist?: boolean;
  musicInPlaylist?: boolean;
  removeBookmark?: boolean;
  allSongs?: boolean;
}

@observer
class PlaylistOptions extends React.Component<Props & WithSnackbarProps & RouteComponentProps, NoState> {
  @observable anchorEl: HTMLElement | null = null;
  @observable openPlaylistsModal: boolean = false;
  @observable openUpdatePlaylistModal: boolean = false;

  handleDeletePlaylist = event => {
    event.stopPropagation();
    const playlistId = LoukiStore.currentPlaylist.__id;

    DeletePlaylist(playlistId).then((response: DeletePlaylistResponse) => {
      const snackbarOptions = { variant: 'success' as any };
      const playlistName = LoukiStore.idToPlaylist(playlistId).name;

      LoukiStore.setPlaylists(response);
      this.props.enqueueSnackbar(texts.current.playlistHasBeenDeletedNotif(playlistName), snackbarOptions);
      this.props.history.push(NavigationForm.previousRoute);
      this.anchorEl = null;
    });
  };

  handleUpdatePlaylist = event => {
    event.stopPropagation();
    this.openUpdatePlaylistModal = true;
    this.anchorEl = null;
  };

  handleMenu = event => {
    event.stopPropagation();
    this.anchorEl = event.currentTarget;
  };

  handleClose = event => {
    event.stopPropagation();
    this.anchorEl = null;
  };

  editInformation = event => {
    event.stopPropagation();
  };

  removeBookmark = event => {
    event.stopPropagation();
    if (this.props.music) {
      Bookmarks.deleteBookmark(this.props.music.__id);
      const snackbarOptions = { variant: 'success' as any };
      const musicName = LoukiStore.idToMusic(this.props.music.__id).title;
      this.props.enqueueSnackbar(texts.current.removeBookmarkNotif(musicName), snackbarOptions);
    }
  };

  removeFromPlaylist = event => {
    event.stopPropagation();
    if (this.props.music) {
      const musicId = this.props.music.__id;
      const playlistId = LoukiStore.currentPlaylist.__id;

      RemoveMusicFromPlaylist(musicId, playlistId).then((response: RemoveMusicResponse) => {
        LoukiStore.setCurrentPlaylist(response);
        const snackbarOptions = { variant: 'success' as any };
        const musicName = LoukiStore.idToMusic(musicId).title;
        const playlistName = LoukiStore.idToPlaylist(playlistId).name;
        this.props.enqueueSnackbar(texts.current.removedFromPlaylistNotif(musicName, playlistName), snackbarOptions);
      });
    }
  };

  addMusicToPlaylist = event => {
    event.stopPropagation();
    this.openPlaylistsModal = true;
  };

  handleCloseModal = event => {
    event.stopPropagation();
    this.openPlaylistsModal = false;
  };

  handleCloseUpdateModal = () => {
    this.openUpdatePlaylistModal = false;
  };

  render() {
    const { classes, music, playlist, musicInPlaylist, removeBookmark, allSongs } = this.props;

    return (
      <React.Fragment>
        <SelectPlaylistModal
          open={this.openPlaylistsModal}
          handleClose={this.handleCloseModal}
          musicId={music ? music.__id : ''}
        />
        <UpdatePlaylistModal open={this.openUpdatePlaylistModal} handleClose={this.handleCloseUpdateModal} />
        <IconButton aria-label='options' onClick={this.handleMenu}>
          <MoreVertIcon className={classes.menuIcon} />
          <PlaylistMenu
            anchorEl={this.anchorEl}
            addMusicToPlaylist={allSongs ? this.addMusicToPlaylist : null}
            editInformation={music ? this.editInformation : null}
            removeBookmark={removeBookmark ? this.removeBookmark : null}
            handleClose={this.handleClose}
            removeFromPlaylist={musicInPlaylist ? this.removeFromPlaylist : null}
            updatePlaylist={playlist ? this.handleUpdatePlaylist : null}
            deletePlaylist={playlist ? this.handleDeletePlaylist : null}
          />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default withSnackbar(withRouter(withStyles(styles)(PlaylistOptions)));
