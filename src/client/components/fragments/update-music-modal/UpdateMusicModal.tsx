import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextField, DialogTitle, Dialog, Button } from '@material-ui/core';
import IPlaylist from '../../../../shared/IPlaylist';
import PlaylistData from '../../../store/common/PlaylistData';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 15,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  handleClose: () => void;
  open: boolean;
}

@observer
class SelectPlaylistModal extends React.Component<IProps, NoState> {
  @observable name: string | null = null;
  @observable description: string = '';

  componentDidUpdate() {
    if (PlaylistData.currentPlaylist != null && this.name == null) {
      this.name = PlaylistData.currentPlaylist.name;
      this.description = PlaylistData.currentPlaylist.description;
    }
  }

  handleClose = event => {
    event.stopPropagation();
    this.props.handleClose();
  };

  handleChange = event => {
    this[event.target.name] = event.target.value;
  };

  updatePlaylist = () => {
    if (PlaylistData.currentPlaylist != null) {
      fetch('/updatePlaylist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // eslint-disable-line
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playlistId: PlaylistData.currentPlaylist.__id,
          playlistName: this.name,
          playlistDescription: this.description,
        }),
      });
    }
  };

  render() {
    const { classes, open, handleClose } = this.props;

    return (
      <Dialog
        className={classes.root}
        maxWidth='sm'
        onClose={this.handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>Update playlist information</DialogTitle>
        <TextField
          label='Playlist name'
          value={this.name != null ? this.name : ''}
          name='name'
          onChange={this.handleChange}
        />
        <TextField
          label='Playlist description'
          value={this.description}
          name='description'
          onChange={this.handleChange}
        />
        <Button variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={this.updatePlaylist} variant='outlined'>
          Save
        </Button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SelectPlaylistModal);
