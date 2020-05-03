import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import FolderIcon from '@material-ui/icons/Folder';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import { Grid, Button, Typography, Switch } from '@material-ui/core/';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SimpleHeader from '../../fragments/playlist/SimpleHeader';
import ConfirmModal from '../../utils/ConfirmModal';
import ManageFoldersModal from '../../fragments/settings/ManageFoldersModal';

import NavigationForm from '../../../store/common/NavigationForm';
import SettingsForm from '../../../store/pages/settings/SettingsForm';
import LoadingForm from '../../../store/loading/LoadingForm';
import UserData from '../../../store/common/UserData';

import { Language } from '../../../../shared/Languages';
import texts from '../../../lang/pages/settings/';

import { UpdateUserSettings } from '../../../requests/User';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
      color: theme.palette.primary.main,
    },
    usernameInput: {
      color: theme.palette.primary.main,
      verticalAlign: 'top',
      marginLeft: '0.8em',
      marginTop: '0.2em',
      textAlign: 'right',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
      display: 'inline-block',
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      fontSize: '1.5rem',
      textTransform: 'none',
    },
    gridContainer: {
      marginBottom: '3em',
    },
    warning: {
      maxWidth: 300,
      marginTop: '1.5em',
      fontSize: '1.5rem',
    },
    text: {
      fontSize: '1.5rem',
    },
    statusIcon: {
      position: 'relative',
      top: '0.25em',
      left: '-0.3em',
      fontSize: '2rem',
    },
  });

interface Props extends WithStyles<typeof styles> // eslint-disable-line
{ 

}; // eslint-disable-line

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

@observer
class Settings extends React.Component<Props & RouteComponentProps, NoState> {
  @observable isPixabayAPIKeyValid: boolean = false;
  @observable pixabayTestLoading: boolean = true;

  componentDidMount() {
    fetch('/pixabay')
      .then(res => {
        return res.json();
      })
      .then(test => {
        this.isPixabayAPIKeyValid = (test as any).result as boolean;
        this.pixabayTestLoading = false;
      });
  }

  handleCancel = () => {
    this.props.history.push(NavigationForm.previousRoute);
  };

  handleSave = () => {
    const form = document.getElementById('settings-form') as HTMLFormElement;
    if (form != null) {
      UpdateUserSettings(form, SettingsForm.settings, SettingsForm.id)
        .then(res => {
          return res.json();
        })
        .then(data => {
          UserData.setUser(data);
          this.props.history.push(NavigationForm.previousRoute);
        });
    }
  };

  @action handleFileChange = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput != null) {
      SettingsForm.setProfilePicture((fileInput as HTMLInputElement).files[0]);
    }
  };

  @action openFileExplorer = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  @action closeConfirmModal = () => {
    SettingsForm.setOpen(false);
  };

  resetLouki = () => {
    SettingsForm.setOpen(false);
    fetch('/resetLouki', { method: 'POST' }).then(() => {
      LoadingForm.reloadApp();
    });
  };

  render() {
    const { classes } = this.props;
    const T = texts.current;
    const status = this.isPixabayAPIKeyValid ? 'Valid' : 'Invalid or not found';
    const statusIcon = this.isPixabayAPIKeyValid ? (
      <CheckIcon className={classes.statusIcon} style={{ color: 'green' }} />
    ) : (
      <CloseIcon className={classes.statusIcon} style={{ color: 'red' }} />
    );

    return (
      <React.Fragment>
        <ConfirmModal
          open={SettingsForm.open}
          title='Are you sure ?'
          message='This action cannot be undone. Every data stored will be lost.'
          onCancel={this.closeConfirmModal}
          onConfirm={this.resetLouki}
        />
        <ManageFoldersModal open={SettingsForm.openManage} folders={UserData.folders} />
        <SimpleHeader title={T.title} />
        <Grid container className={classes.root} direction='column'>
          <form
            id='settings-form'
            encType='multipart/form-data'
            onSubmit={e => {
              e.preventDefault();
              return false;
            }}
          >
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>{T.username}</Typography>
              <input
                className={classes.usernameInput}
                value={SettingsForm.username}
                onChange={e => {
                  SettingsForm.setUsername(e.target.value);
                }}
              />
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>
                {T.profilePic} : {SettingsForm.path}
              </Typography>
              <Button className={classes.button} onClick={this.openFileExplorer}>
                <input
                  id='hidden-file-input'
                  type='file'
                  name='profile-picture'
                  style={{ display: 'none' }}
                  onChange={this.handleFileChange}
                />
                <FolderIcon style={{ marginRight: '0.7em' }} /> {T.browse}
              </Button>
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>
                {T.directories} : {UserData.folders.length} {UserData.folders.length > 1 ? 'folders' : 'folder'}
              </Typography>
              <Button
                className={classes.button}
                onClick={() => {
                  SettingsForm.setOpenManage(true);
                }}
              >
                <FolderIcon style={{ marginRight: '0.7em' }} /> {T.browse}
              </Button>
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>{T.internet}</Typography>
              <Switch
                checked={SettingsForm.useInternet}
                onChange={SettingsForm.toggleInternetUsage}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>Language : </Typography>
              <Select
                id='demo-customized-select-native'
                value={SettingsForm.language}
                onChange={event => {
                  SettingsForm.setLanguage(event.target.value as Language);
                }}
                input={<BootstrapInput />}
              >
                <MenuItem className={classes.text} value={Language.French}>
                  Français
                </MenuItem>
                <MenuItem className={classes.text} value={Language.English}>
                  English
                </MenuItem>
              </Select>
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>Pixabay API : </Typography>
              <Typography className={classes.text}>
                {!this.pixabayTestLoading && statusIcon}
                {this.pixabayTestLoading ? 'Test in progress...' : status}
              </Typography>
            </Grid>
            <Grid className={classes.gridContainer} item container direction='column'>
              <Button
                className={classes.button}
                style={{ maxWidth: '10em' }}
                onClick={() => {
                  SettingsForm.setOpen(true);
                }}
              >
                <RotateLeftIcon style={{ marginRight: '0.7em' }} /> {T.reset}
              </Button>
              <Typography className={classes.warning}>{T.resetWarning}</Typography>
            </Grid>
            <Grid item container direction='row' justify='flex-end'>
              <Button className={classes.button} style={{ marginRight: '1.5em' }} onClick={this.handleCancel}>
                <CloseIcon style={{ marginRight: '0.7em' }} /> {T.cancel}
              </Button>
              <Button className={classes.button} onClick={this.handleSave}>
                <SaveIcon style={{ marginRight: '0.7em' }} /> {T.save}
              </Button>
            </Grid>
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Settings));
