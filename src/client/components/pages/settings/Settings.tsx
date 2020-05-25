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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../../utils/Select';

import SimpleHeader from '../../layout/SimpleHeader';
import ConfirmModal from '../../utils/ConfirmModal';
import ManageFoldersModal from '../../modals/ManageFoldersModal';
import TransparentInput from '../../utils/TransparentInput';

import Navigation from '../../../store/navigation/Navigation';
import SettingsForm from '../../../store/forms/SettingsForm';
import Loading from '../../../store/loading/Loading';
import User from '../../../store/data/User';
import Notifications, { NotificationType } from '../../../store/features/Notifications';

import { Language } from '../../../../shared/Languages';
import texts from '../../../lang/pages/settings/';
import notifsTexts from '../../../lang/notifications';

import { UpdateUserSettings, ResetLouki, UpdateSettingsResponse } from '../../../requests/Users';
import { TestPixabayResponse, TestPixabay } from '../../../requests/Pixabay';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
      color: theme.palette.primary.main,
      [theme.breakpoints.down('sm')]: {
        padding: 20,
      },
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
    mobileContainer: {
      [theme.breakpoints.down('sm')]: {
        maxWidth: 120,
      },
    },
  });

@observer
class Settings extends React.Component<WithStyles & RouteComponentProps, NoState> {
  @observable isPixabayAPIKeyValid: boolean = false;
  @observable pixabayTestLoading: boolean = true;

  componentDidMount() {
    TestPixabay().then((result: TestPixabayResponse) => {
      this.isPixabayAPIKeyValid = result.data;
      this.pixabayTestLoading = false;
    });
  }

  handleCancel = () => {
    this.props.history.push(Navigation.previousRoute);
  };

  handleSave = () => {
    const form = document.getElementById('settings-form') as HTMLFormElement;

    if (form != null) {
      UpdateUserSettings(form, SettingsForm.settings).then((response: UpdateSettingsResponse) => {
        if (response.error == null) {
          User.setUser(response.data);
          this.props.history.push(Navigation.previousRoute);
          Notifications.addNotification(notifsTexts.current.settingsUpdated, NotificationType.SUCCESS);
        }
      });
    }
  };

  @action handleFileChange = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput != null) {
      SettingsForm.setPicture((fileInput as HTMLInputElement).files[0]);
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
    ResetLouki().then((responseStatus: number) => {
      if (responseStatus == 204) {
        SettingsForm.setOpen(false);
        localStorage.clear();
        Loading.reloadApp();
      }
    });
  };

  render() {
    const { classes } = this.props;
    const T = texts.current;
    const status = this.isPixabayAPIKeyValid ? T.valid : T.invalid;
    const statusIcon = this.isPixabayAPIKeyValid ? (
      <CheckIcon className={classes.statusIcon} style={{ color: 'green' }} />
    ) : (
      <CloseIcon className={classes.statusIcon} style={{ color: 'red' }} />
    );

    return (
      <React.Fragment>
        <ConfirmModal
          open={SettingsForm.open}
          {...T.confirmModal}
          onCancel={this.closeConfirmModal}
          onConfirm={this.resetLouki}
        />
        <ManageFoldersModal open={SettingsForm.openManage} folders={User.folders} />
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
              <TransparentInput
                alignRight
                value={SettingsForm.username}
                onChange={SettingsForm.setUsername}
                placeholder={T.usernamePlaceholder}
              />
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Grid item className={classes.mobileContainer}>
                <Typography className={classes.text}>
                  {T.profilePic} : {SettingsForm.path}
                </Typography>
              </Grid>
              <Grid item>
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
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Grid item className={classes.mobileContainer}>
                <Typography className={classes.text}>
                  {T.directories} : {User.folders.length} {T.folders(User.folders.length)}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  onClick={() => {
                    SettingsForm.setOpenManage(true);
                  }}
                >
                  <FolderIcon style={{ marginRight: '0.7em' }} /> {T.browse}
                </Button>
              </Grid>
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
              <Typography className={classes.text}>{T.localStorage}</Typography>
              <Switch
                checked={SettingsForm.useLocalStorage}
                onChange={SettingsForm.toggleLocalStorageUsage}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
            <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
              <Typography className={classes.text}>{T.language} : </Typography>
              <Select
                value={SettingsForm.language}
                onChange={event => {
                  SettingsForm.setLanguage(event.target.value as Language);
                }}
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
