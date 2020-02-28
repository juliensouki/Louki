import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PlaylistMenu from './PlaylistMenu';
import SelectPlaylistModal from './SelectPlaylistModal';
import UpdatePlaylistModal from '../update-playlist-modal/UpdatePlaylistModal';
import BookmarksData from '../../../store/common/BookmarksData';

import IMusic from '../../../../shared/IMusic';
import PlaylistData from '../../../store/common/PlaylistData';
import DeletePlaylist from '../../../store/functions/playlists/DeletePlaylist';
import { useHistory } from 'react-router';

const styles = (theme: Theme) =>
  createStyles({
    menuIcon: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  music?: IMusic;
  playlist?: boolean;
  musicInPlaylist?: boolean;
  removeBookmark?: boolean;
  allSongs?: boolean;
}

@observer
class PlaylistOptions extends React.Component<IProps, NoState> {
  @observable anchorEl: HTMLElement | null = null;
  @observable openPlaylistsModal: boolean = false;
  @observable openUpdatePlaylistModal: boolean = false;

  handleDeletePlaylist = event => {
    event.stopPropagation();
    const playlistId = PlaylistData.currentPlaylist.__id;

    DeletePlaylist(playlistId); // eslint-disable-line
    const history = useHistory();
    history.push('/all-music');
    this.anchorEl = null;
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
      BookmarksData.deleteBookmark(this.props.music.__id);
    }
  };

  removeFromPlaylist = event => {
    event.stopPropagation();
    if (this.props.music) {
      const musicId = this.props.music.__id;
      const playlistId = PlaylistData.currentPlaylist.__id;
      fetch('/removeSongFromPlaylist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // eslint-disable-line
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playlistId: playlistId,
          musicId: musicId,
        }),
      });
    }
  };

  addMusicToPlaylist = event => {
    event.stopPropagation();
    this.openPlaylistsModal = true;
  };

  handleCloseModal = () => {
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

export default withStyles(styles)(PlaylistOptions);
