import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Button } from '@material-ui/core';
import Modal from '../../utils/Modal';

import AddMusicToPlaylist from '../../../store/functions/playlists/AddMusicToPlaylist';
import MusicsData from '../../../store/common/MusicsData';
import IPlaylist from '../../../../shared/IPlaylist';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import texts from '../../../lang/fragments/select-playlist-modal';

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

interface IProps extends WithStyles<typeof styles> {
  handleClose: (e: any) => void;
  open: boolean;
  musicId: string;
}

@observer
class SelectPlaylistModal extends React.Component<IProps & WithSnackbarProps, NoState> {
  handleListItemClick = (playlist: IPlaylist) => {
    AddMusicToPlaylist(playlist.__id, this.props.musicId).then(response => {
      const musicName = MusicsData.idToMusic(this.props.musicId).title;
      const playlistName = MusicsData.idToPlaylist(playlist.__id).name;
      if (response.status == 200) {
        const snackbarOptions = { variant: 'success' as any };
        this.props.enqueueSnackbar(texts.current.addedToPlaylistNotif(musicName, playlistName), snackbarOptions);
      } else if (response.status == 403) {
        const snackbarOptions = { variant: 'error' as any };
        this.props.enqueueSnackbar(texts.current.alreadyInPlaylistNotif(musicName, playlistName), snackbarOptions);
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
          {MusicsData.allPlaylists.map(playlist => {
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
