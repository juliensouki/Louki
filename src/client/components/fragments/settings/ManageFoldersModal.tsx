import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, InputBase, IconButton } from '@material-ui/core';
import Modal from '../../utils/Modal';
import SettingsForm from '../../../store/pages/settings/SettingsForm';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import UserData from '../../../store/common/UserData';

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

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  folders: Array<string>;
}

@observer
class AddPlaylistModal extends React.Component<IProps, NoState> {
  @observable folderToAdd: string = '';

  @action handleChange = (folderToAdd: string) => {
    this.folderToAdd = folderToAdd;
  };

  @action onClose = () => {
    SettingsForm.setOpenManage(false);
  };

  @action deleteFolder = (folder: string) => {
    fetch('/removeFolder', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folder: folder,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(user => {
        UserData.setUser(user);
      });
  };

  @action addNewFolder = () => {
    if (this.folderToAdd.length > 0) {
      fetch('/addFolder', {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // eslint-disable-line
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder: this.folderToAdd,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(user => {
          UserData.setUser(user);
          this.folderToAdd = '';
        });
    }
  };

  render() {
    const { classes, open, folders } = this.props;

    return (
      <Modal open={open} title={'Manager folders'} buttons={[]} onClose={this.onClose}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            value={this.folderToAdd}
            onChange={e => {
              this.handleChange(e.target.value);
            }}
            placeholder='Add a folder (you must provide full path)'
            inputProps={{ 'aria-label': 'Add a folder' }}
          />
          <Button className={classes.confirmButton} onClick={this.addNewFolder}>
            Add folder
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

export default withStyles(styles)(AddPlaylistModal);
