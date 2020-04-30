import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import PlaylistData from '../../../store/common/PlaylistData';
import Modal from '../../utils/Modal';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 15,
    },
    cancel: {
      backgroundColor: '#9D9D9D',
      color: '#464646',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    save: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    resizeText: {
      fontSize: '1.5rem',
    },
    textfield: {
      display: 'block',
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

  get buttons(): Array<JSX.Element> {
    const classes = this.props.classes;
    return [
      <Button key={0} className={classes.cancel} onClick={this.handleClose}>
        Cancel
      </Button>,
      <Button key={1} className={classes.save} onClick={this.updatePlaylist}>
        Save
      </Button>,
    ];
  }

  render() {
    const { classes, open, handleClose } = this.props;

    return (
      <Modal onClose={handleClose} title='Update playlist information' maxWidth='sm' buttons={this.buttons} open={open}>
        <TextField
          className={classes.textfield}
          label='Playlist name'
          value={this.name != null ? this.name : ''}
          name='name'
          onChange={this.handleChange}
          InputLabelProps={{ style: { fontSize: '1.3rem' } }}
          InputProps={{
            classes: {
              input: classes.resizeText,
            },
          }}
        />
        <TextField
          className={classes.textfield}
          label='Playlist description'
          value={this.description}
          name='description'
          onChange={this.handleChange}
          InputLabelProps={{ style: { fontSize: '1.3rem' } }}
          InputProps={{
            classes: {
              input: classes.resizeText,
            },
          }}
        />
      </Modal>
    );
  }
}

export default withStyles(styles)(SelectPlaylistModal);
