import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Button } from '@material-ui/core';
import Modal from '../utils/Modal';

import LoukiStore from '../../store/data/LoukiStore';
import { Playlist } from '../../../shared/LoukiTypes';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { AddMusic } from '../../requests/Playlists';

import texts from '../../lang/modals/select-playlist-modal';
import notifsTexts from '../../lang/notifications';

const styles = (theme: Theme) =>
  createStyles({
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
class SelectPlaylistModal extends React.Component<Props & WithSnackbarProps, NoState> {
  handleListItemClick = (playlist: Playlist) => {
    const T = notifsTexts.current;

    AddMusic(playlist.__id, this.props.musicId).then((response: Response) => {
      const musicName = LoukiStore.idToMusic(this.props.musicId).title;
      const playlistName = LoukiStore.idToPlaylist(playlist.__id).name;

      if (response.status == 200) {
        const snackbarOptions = { variant: 'success' as any };
        this.props.enqueueSnackbar(T.addedToPlaylistNotif(musicName, playlistName), snackbarOptions);
      } else if (response.status == 403) {
        const snackbarOptions = { variant: 'error' as any };
        this.props.enqueueSnackbar(T.alreadyInPlaylistNotif(musicName, playlistName), snackbarOptions);
      }
    });
  };

  get buttons(): Array<JSX.Element> {
    const classes = this.props.classes;
    return [
      <Button key={0} className={classes.cancel} onClick={this.props.handleClose}>
        {texts.current.cancel}
      </Button>,
    ];
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

export default withSnackbar(withStyles(styles)(SelectPlaylistModal));
