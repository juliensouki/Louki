import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, InputBase, IconButton } from '@material-ui/core';
import Modal from '../utils/Modal';
import SettingsForm from '../../store/forms/SettingsForm';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import User from '../../store/data/User';
import texts from '../../lang/modals/manage-folders-modal';
import notifsTexts from '../../lang/notifications';
import SearchField from '../utils/SearchField';

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
      width: '100%',
      maxHeight: 300,
      overflowY: 'auto',
      overflowX: 'hidden',
      borderRadius: 3,
      border: '0.5px solid #BABABA',
      marginTop: '2em',
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
      top: '0.2em',
      fontSize: '1.5rem',
      marginRight: '0.5em',
    },
    delete: {
      position: 'relative',
      color: theme.palette.primary.main,
      top: '-0.5em',
      float: 'right',
    },
    text: {
      display: 'inline',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  folders: Array<string>;
}

@observer
class AddPlaylistModal extends React.Component<Props & WithSnackbarProps, NoState> {
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
      const snackbarOptions = { variant: 'success' as any };
      this.props.enqueueSnackbar(T.folderRemoved(folder), snackbarOptions);
      User.setUser(response.data);
    });
  };

  @action addNewFolder = () => {
    const T = notifsTexts.current;

    if (this.folderToAdd.length > 0) {
      AddFolder(this.folderToAdd[this.folderToAdd.length - 1] == '/' ? this.folderToAdd : this.folderToAdd + '/').then(
        (response: AddFolderResponse) => {
          if (response.status == 200) {
            User.setUser(response.data);
            const snackbarOptions = { variant: 'success' as any };
            this.props.enqueueSnackbar(T.folderAdded(this.folderToAdd), snackbarOptions);
          } else {
            const snackbarOptions = { variant: 'error' as any };
            this.props.enqueueSnackbar(T.errors.folderNotAdded(this.folderToAdd), snackbarOptions);
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
            <Typography className={classes.folder} key={index}>
              <FolderIcon className={classes.inlineIcon} />
              {folder}
              <IconButton
                className={classes.delete}
                onClick={() => {
                  this.deleteFolder(folder);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Typography>
          ))}
        </Paper>
      </Modal>
    );
  }
}

export default withSnackbar(withStyles(styles)(AddPlaylistModal));
