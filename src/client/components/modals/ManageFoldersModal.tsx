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
import User from '../../store/data/User';
import texts from '../../lang/pages/settings';

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
    folderIcon: {
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
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  folders: Array<string>;
}

@observer
class AddPlaylistModal extends React.Component<Props & WithSnackbarProps, NoState> {
  @observable folderToAdd: string = '';

  @action handleChange = (folderToAdd: string) => {
    this.folderToAdd = folderToAdd;
  };

  @action onClose = () => {
    SettingsForm.setOpenManage(false);
  };

  @action deleteFolder = (folder: string) => {
    RemoveFolder(folder).then((response: RemoveFolderResponse) => {
      const snackbarOptions = { variant: 'success' as any };
      this.props.enqueueSnackbar(texts.current.folderRemoved(folder), snackbarOptions);
      User.setUser(response);
    });
  };

  @action addNewFolder = () => {
    if (this.folderToAdd.length > 0) {
      AddFolder(this.folderToAdd).then((response: AddFolderResponse) => {
        User.setUser(response);
        const snackbarOptions = { variant: 'success' as any };
        this.props.enqueueSnackbar(texts.current.folderAdded(this.folderToAdd), snackbarOptions);
        this.folderToAdd = '';
      });
    }
  };

  render() {
    const { classes, open, folders } = this.props;
    const T = texts.current;

    return (
      <Modal open={open} title={T.manageFolders.title} buttons={[]} onClose={this.onClose}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            value={this.folderToAdd}
            onChange={e => {
              this.handleChange(e.target.value);
            }}
            placeholder={T.manageFolders.placeholder}
            inputProps={{ 'aria-label': T.manageFolders.placeholder }}
          />
          <Button className={classes.confirmButton} onClick={this.addNewFolder}>
            {T.manageFolders.button}
          </Button>
        </Paper>
        <Paper className={classes.folderContainer}>
          {folders.map((folder, index) => (
            <Typography className={classes.folder} key={index}>
              <FolderIcon className={classes.folderIcon} />
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
