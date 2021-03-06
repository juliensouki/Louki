import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, IconButton } from '@material-ui/core';
import Modal from '../utils/modal/Modal';
import SettingsForm from '../../store/forms/SettingsForm';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import User from '../../store/data/User';
import MusicPlayer from '../../store/features/MusicPlayer';
import texts from '../../lang/modals/manage-folders-modal';
import notifsTexts from '../../lang/notifications';
import SearchField from '../utils/form-controls/SearchField';
import Notifications, { NotificationType } from '../../store/features/Notifications';

import { AddFolder, AddFolderResponse, RemoveFolder, RemoveFolderResponse } from '../../requests/Users';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#515151',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      fontSize: '1.3rem',
      flex: 1,
    },
    confirmButton: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    folderContainer: {
      maxHeight: 300,
      overflowY: 'auto',
      overflowX: 'hidden',
      borderRadius: 3,
      border: '0.5px solid #BABABA',
      padding: '1em',
      marginTop: '2em',
      width: 'calc(100% - 2em)',
      [theme.breakpoints.down('sm')]: {
        maxHeight: 'unset',
        height: 'calc(100% - 140px)',
      },
    },
    folder: {
      width: 'calc(100% - 24px)',
      color: theme.palette.primary.main,
      padding: '1em',
      fontSize: '1.3rem',
      borderRadius: 'inherit',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#656565',
      },
    },
    inlineIcon: {
      position: 'relative',
      fontSize: '1.5rem',
      marginRight: '0.5em',
      top: '-0.15em',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        top: 0,
      },
    },
    delete: {
      position: 'relative',
      color: theme.palette.primary.main,
      float: 'right',
      [theme.breakpoints.down('sm')]: {
        top: '0.1em',
      },
    },
    text: {
      display: 'inline',
      fontSize: '1.3rem',
    },
    folderText: {
      display: 'inline-block',
      fontSize: '1.3rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100% - 2em)',
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        top: '0.2em',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  folders: Array<string>;
}

@observer
class AddPlaylistModal extends React.Component<Props, NoState> {
  @observable folderToAdd: string = '';

  @action handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.folderToAdd = e.target.value;
  };

  @action onClose = () => {
    SettingsForm.setOpenManage(false);
  };

  @action deleteFolder = (folder: string) => {
    const T = notifsTexts.current;

    RemoveFolder(folder).then((response: RemoveFolderResponse) => {
      Notifications.addNotification(T.folderRemoved(folder), NotificationType.SUCCESS);
      User.setUser(response.data);
    });
  };

  @action addNewFolder = () => {
    const T = notifsTexts.current;

    if (this.folderToAdd.length > 0) {
      AddFolder(this.folderToAdd[this.folderToAdd.length - 1] == '/' ? this.folderToAdd : this.folderToAdd + '/').then(
        (response: AddFolderResponse) => {
          if (response.status == 200) {
            Notifications.addNotification(T.folderAdded(this.folderToAdd), NotificationType.SUCCESS);
            User.setUser(response.data);
          } else {
            Notifications.addNotification(T.errors.folderNotAdded(this.folderToAdd), NotificationType.ERROR);
          }
          this.folderToAdd = '';
        },
      );
    }
  };

  render() {
    const { classes, open, folders } = this.props;
    const T = texts.current;

    return (
      <Modal open={open} title={T.title} buttons={[]} onClose={this.onClose}>
        <SearchField
          buttonText={T.button}
          placeholder={T.placeholder}
          value={this.folderToAdd}
          onChange={this.handleChange}
          onSearch={this.addNewFolder}
        />
        <div style={{ marginTop: '1em' }}>
          <InfoIcon className={classes.inlineIcon} />
          <Typography className={classes.text}>{T.info}</Typography>
          <Typography className={classes.text} style={{ display: 'block' }}>
            Ex : /home/user/musics.
          </Typography>
        </div>
        <Paper className={classes.folderContainer}>
          {folders.map((folder, index) => (
            <Grid key={index} container direction='row' justify='space-between' alignItems='center'>
              <Grid item style={{ maxWidth: 'calc(100% - 4em)', width: '100%', display: 'inline-block' }}>
                <FolderIcon className={classes.inlineIcon} />
                <Typography className={classes.folderText}>{folder}</Typography>
              </Grid>
              <IconButton
                className={classes.delete}
                onClick={() => {
                  this.deleteFolder(folder);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(AddPlaylistModal);
