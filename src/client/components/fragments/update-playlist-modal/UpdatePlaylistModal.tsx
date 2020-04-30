import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import PlaylistData from '../../../store/common/PlaylistData';
import Modal from '../../utils/Modal';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiOutlinedInput-multiline': {
        width: '100%',
      },
    },
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
      fontSize: '1.3rem',
    },
    textfield: {
      display: 'block',
    },
    descriptionInput: {
      display: 'inline-block',
      color: theme.palette.primary.main,
      width: '100%',
      marginTop: theme.spacing(2),
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
          label='Name'
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
          id='filled-multiline-static'
          label='Description'
          name='description'
          multiline
          rows='4'
          value={this.description}
          InputProps={{
            classes: {
              input: classes.resizeText,
            },
          }}
          className={classes.descriptionInput}
          onChange={e => {
            this.description = e.target.value;
          }}
          variant='outlined'
        />
      </Modal>
    );
  }
}

export default withStyles(styles)(SelectPlaylistModal);
