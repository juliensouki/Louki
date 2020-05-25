import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem } from '@material-ui/core';
import Modal from '../utils/Modal';
import Button from '../utils/Button';

import LoukiStore from '../../store/data/LoukiStore';
import { Playlist } from '../../../shared/LoukiTypes';
import { AddMusic, AddMusicResponse } from '../../requests/Playlists';
import Notifications, { NotificationType } from '../../store/features/Notifications';

import texts from '../../lang/modals/select-playlist-modal';
import notifsTexts from '../../lang/notifications';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.5rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  handleClose: (e: any) => void;
  open: boolean;
  musicId: string;
}

@observer
class SelectPlaylistModal extends React.Component<Props, NoState> {
  handleListItemClick = (playlist: Playlist) => {
    const T = notifsTexts.current;

    AddMusic(playlist.__id, this.props.musicId).then((response: AddMusicResponse) => {
      const musicName = LoukiStore.idToMusic(this.props.musicId).title;
      const playlistName = LoukiStore.idToPlaylist(playlist.__id).name;
      if (response.status == 200) {
        Notifications.addNotification(T.addedToPlaylistNotif(musicName, playlistName), NotificationType.SUCCESS);
      } else if (response.status == 403) {
        Notifications.addNotification(T.alreadyInPlaylistNotif(musicName, playlistName), NotificationType.ERROR);
      }
    });
  };

  get buttons(): Array<JSX.Element> {
    return [<Button key={0} type='cancel' text={texts.current.cancel} onClick={this.props.handleClose} />];
  }

  render() {
    const { classes, open, handleClose } = this.props;
    const T = texts.current;

    return (
      <Modal open={open} onClose={handleClose} maxWidth='xs' title={T.title} buttons={this.buttons}>
        <List>
          {LoukiStore.allPlaylists.map(playlist => {
            return (
              <ListItem
                key={playlist.__id}
                button
                onClick={event => {
                  event.stopPropagation();
                  this.handleListItemClick(playlist);
                  handleClose(event);
                }}
              >
                <Typography className={classes.text}>{playlist.name}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    );
  }
}

export default withStyles(styles)(SelectPlaylistModal);
