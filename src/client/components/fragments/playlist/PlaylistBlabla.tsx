import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PlaylistMenu from './PlaylistMenu';
import SelectPlaylistModal from './SelectPlaylistModal';

import IMusic from '../../../../shared/IMusic';
import MusicsData from '../../../store/common/MusicsData';
import MusicPlayer from '../../../store/common/MusicPlayer';

const styles = (theme: Theme) =>
  createStyles({
    menuIcon: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  music: IMusic;
}

@observer
class PlaylistBlabla extends React.Component<IProps, NoState> {
  @observable anchorEl: HTMLElement | null = null;
  @observable openPlaylistsModal: boolean = false;

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
    const id = this.props.music.__id;

    fetch('/removeBookmark', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        musicId: id,
      }),
    });
  };

  addMusicToPlaylist = event => {
    event.stopPropagation();
    this.openPlaylistsModal = true;
  };

  handleCloseModal = () => {
    this.openPlaylistsModal = false;
  };

  render() {
    const { classes, music } = this.props;

    return (
      <React.Fragment>
        <SelectPlaylistModal open={this.openPlaylistsModal} handleClose={this.handleCloseModal} musicId={music.__id} />
        <IconButton aria-label='options' onClick={this.handleMenu}>
          <MoreVertIcon className={classes.menuIcon} />
          <PlaylistMenu
            anchorEl={this.anchorEl}
            addMusicToPlaylist={this.addMusicToPlaylist}
            editInformation={this.editInformation}
            removeBookmark={this.removeBookmark}
            handleClose={this.handleClose}
          />
        </IconButton>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PlaylistBlabla);
