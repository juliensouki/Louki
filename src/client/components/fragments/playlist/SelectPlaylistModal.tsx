import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import AddMusicToPlaylist from '../../../store/functions/playlists/AddMusicToPlaylist';
import MusicsData from '../../../store/common/MusicsData';
import IPlaylist from '../../../../shared/IPlaylist';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import texts from '../../../lang/fragments/select-playlist-modal';

const styles = (theme: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles> {
  handleClose: () => void;
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

  render() {
    const { open, handleClose } = this.props;

    return (
      <Dialog
        onClose={() => {
          handleClose();
        }}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>Choose a playlist</DialogTitle>
        <List>
          {MusicsData.allPlaylists.map(playlist => {
            return (
              <ListItem
                key={playlist.__id}
                button
                onClick={event => {
                  event.stopPropagation();
                  this.handleListItemClick(playlist);
                  handleClose();
                }}
              >
                <Typography>{playlist.name}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    );
  }
}

export default withSnackbar(withStyles(styles)(SelectPlaylistModal));
