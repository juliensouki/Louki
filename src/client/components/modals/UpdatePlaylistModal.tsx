import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Modal from '../utils/Modal';

import texts from '../../lang/modals/update-playlist-modal';
import notifsTexts from '../../lang/notifications';
import LoukiStore from '../../store/data/LoukiStore';
import { UpdatePlaylist, UpdatePlaylistResponse } from '../../requests/Playlists';
import Notifications, { NotificationType } from '../../store/features/Notifications';

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

interface Props extends WithStyles<typeof styles> {
  handleClose: () => void;
  open: boolean;
}

@observer
class SelectPlaylistModal extends React.Component<Props, NoState> {
  @observable name: string | null = null;
  @observable description: string = '';

  componentDidUpdate() {
    if (LoukiStore.currentPlaylist != null && this.name == null) {
      this.name = LoukiStore.currentPlaylist.name;
      this.description = LoukiStore.currentPlaylist.description;
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
    const T = notifsTexts.current;

    if (LoukiStore.currentPlaylist != null) {
      UpdatePlaylist(LoukiStore.currentPlaylist.__id, this.name, this.description).then(
        (response: UpdatePlaylistResponse) => {
          this.props.handleClose();
          LoukiStore.setCurrentPlaylist(response.data.currentPlaylist);
          LoukiStore.setPlaylists(response.data.playlists);
          Notifications.addNotification(T.playlistUpdated(this.name), NotificationType.SUCCESS);
        },
      );
    }
  };

  get buttons(): Array<JSX.Element> {
    const classes = this.props.classes;
    const T = texts.current;
    return [
      <Button key={0} className={classes.cancel} onClick={this.handleClose}>
        {T.cancel}
      </Button>,
      <Button key={1} className={classes.save} onClick={this.updatePlaylist}>
        {T.save}
      </Button>,
    ];
  }

  render() {
    const { classes, open, handleClose } = this.props;
    const T = texts.current;

    return (
      <Modal onClose={handleClose} title={T.title} maxWidth='sm' buttons={this.buttons} open={open}>
        <TextField
          className={classes.textfield}
          label={T.namePlaceholder}
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
          label={T.description}
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
