import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import NewPlaylistForm from '../../../store/forms/NewPlaylistForm';
import LoukiStore from '../../../store/data/LoukiStore';
import User from '../../../store/data/User';
import SimpleHeader from '../../layout/SimpleHeader';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Grid, IconButton, Button, Typography, TextField } from '@material-ui/core/';
import AddPictureModal from '../../modals/add-picture-modal/AddPlaylistModal';
import PublicIcon from '@material-ui/icons/Public';
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/Folder';
import texts from '../../../lang/pages/new-playlist';
import notifsTexts from '../../../lang/notifications';
import { CreatePlaylist, CreatePlaylistResponse } from '../../../requests/Playlists';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiOutlinedInput-root': {
        width: '100%',
        fontSize: '1.3rem !important',
        maxWidth: 600,
      },
      '.MuiInputBase-input': {
        fontSize: '1.3rem !important',
      },
      '.MuiFormHelperText-root': {
        color: 'red',
        fontSize: '1.3rem',
      },
    },
    root: {
      padding: '2.5em',
      paddingTop: '1em',
      color: theme.palette.primary.main,
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    title: {
      color: theme.palette.primary.light,
      marginBottom: '2em',
      marginTop: '1.5em',
      fontSize: '1.3rem',
    },
    icon: {
      verticalAlign: 'middle',
      position: 'relative',
      top: '-0.1em',
    },
    descriptionInput: {
      display: 'inline-block',
      color: theme.palette.primary.main,
      width: '100%',
    },
    resizeText: {
      fontSize: '1.3rem',
    },
    currentPictureText: {
      maxWidth: 400,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  });

@observer
class NewPlaylist extends React.Component<WithStyles & RouteComponentProps & WithSnackbarProps, NoState> {
  @observable nameHelper: string = '';
  @observable descriptionHelper: string = '';
  @observable open: boolean = false;

  componentDidMount() {
    this.nameHelper = '';
    this.descriptionHelper = '';
    this.open = false;
    NewPlaylistForm.setName('');
    NewPlaylistForm.setDescription('');
    NewPlaylistForm.setPicture(null);
    NewPlaylistForm.setPictureUrl('');
  }

  openFileExplorer = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  formValidation = (): boolean => {
    return NewPlaylistForm.name.length > 0 && NewPlaylistForm.description.length > 0;
  };

  handleRedirect = event => {
    event.stopPropagation();
    const T = texts.current;
    const nT = notifsTexts.current;
    const form = document.getElementById('new-playlist-form');

    if (form != null && this.formValidation()) {
      const data: FormData = new FormData(form as HTMLFormElement);

      if (NewPlaylistForm.pictureUrl) {
        data.append('pictureUrl', NewPlaylistForm.pictureUrl);
      }

      CreatePlaylist(data).then((result: CreatePlaylistResponse) => {
        LoukiStore.setPlaylists(result);
        const snackbarOptions = { variant: 'success' as any };
        this.props.enqueueSnackbar(nT.playlistCreated(NewPlaylistForm.name), snackbarOptions);
        this.props.history.push('/all-music');
      });
    } else {
      if (NewPlaylistForm.name.length == 0) {
        this.nameHelper = T.nameInput.helper;
      }
      if (NewPlaylistForm.description.length == 0) {
        this.descriptionHelper = T.descriptionInput.helper;
      }
    }
  };

  @action handleFileChange = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput != null) {
      NewPlaylistForm.setPicture((fileInput as HTMLInputElement).files[0]);
    }
  };

  @computed get pictureSelectedText(): string {
    const T = texts.current;

    if (!NewPlaylistForm.pictureFile && NewPlaylistForm.pictureUrl == '') {
      return T.noPicture;
    } else if (NewPlaylistForm.pictureUrl != '') {
      return T.currentPicture + NewPlaylistForm.pictureUrl;
    }
    return T.currentPicture + NewPlaylistForm.pictureFile.name;
  }

  @action cancelImage = () => {
    NewPlaylistForm.setPicture(null);
    NewPlaylistForm.setPictureUrl('');
  };

  @action handleOpenModal = () => {
    this.open = true;
  };

  @action handleCloseModal = () => {
    this.open = false;
  };

  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <React.Fragment>
        <AddPictureModal open={this.open} onClose={this.handleCloseModal} />
        <SimpleHeader title={T.title} />
        <form
          method='POST'
          encType='multipart/form-data'
          action='/createPlaylist'
          id='new-playlist-form'
          onSubmit={e => {
            e.preventDefault();
            return false;
          }}
        >
          <Grid container className={classes.root} direction='column'>
            <Grid item>
              <Typography className={classes.title}>{T.chooseName} :</Typography>
            </Grid>
            <Grid item style={{ marginBottom: '2em' }}>
              <TextField
                id='standard-basic'
                value={NewPlaylistForm.name}
                name='playlist-name'
                helperText={this.nameHelper}
                InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                InputProps={{
                  classes: {
                    input: classes.resizeText,
                  },
                }}
                onChange={e => {
                  this.nameHelper = '';
                  NewPlaylistForm.setName(e.target.value);
                }}
                style={{ display: 'inline-block' }}
                label={T.nameInput.placeholder}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.title}>{T.choosePicture} :</Typography>
              <Typography style={{ display: 'inline-block', fontSize: '1.3rem' }}>{T.chooseFrom}</Typography>
              <Button
                type='button'
                onClick={this.openFileExplorer}
                className={classes.button}
                style={{ display: 'inline-block' }}
              >
                <input
                  id='hidden-file-input'
                  type='file'
                  name='playlist-picture'
                  style={{ display: 'none' }}
                  onChange={this.handleFileChange}
                />
                <FolderIcon className={classes.icon} /> {T.yourComputer}
              </Button>
              <Typography style={{ display: 'inline-block', fontSize: '1.3rem' }}> {T.orFrom} </Typography>
              <Button
                type='button'
                className={classes.button}
                style={{ display: 'inline-block' }}
                disabled={!User.settings.internetUsage}
                onClick={this.handleOpenModal}
              >
                <PublicIcon className={classes.icon} /> {T.internet}
              </Button>
              <div>
                <Typography
                  className={classes.currentPictureText}
                  style={{ fontSize: '1.3rem', display: 'inline-block' }}
                >
                  {this.pictureSelectedText}
                </Typography>
                {NewPlaylistForm.pictureFile || NewPlaylistForm.pictureUrl != '' ? (
                  <IconButton
                    style={{ position: 'relative', top: '-0.3em', display: 'inline-block' }}
                    onClick={this.cancelImage}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : null}
              </div>
              <br />
              <Grid item style={{ marginTop: '3.5em', width: '100%' }}>
                <TextField
                  id='filled-multiline-static'
                  label={T.descriptionInput.placeholder}
                  name='playlist-description'
                  multiline
                  rows='4'
                  helperText={this.descriptionHelper}
                  value={NewPlaylistForm.description}
                  InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                  InputProps={{
                    classes: {
                      input: classes.resizeText,
                    },
                  }}
                  className={classes.descriptionInput}
                  onChange={e => {
                    this.descriptionHelper = '';
                    NewPlaylistForm.setDescription(e.target.value);
                  }}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid item container direction='column' alignItems='flex-end'>
              <Button className={classes.button} onClick={this.handleRedirect}>
                {T.save}
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withSnackbar(withRouter(withStyles(styles)(NewPlaylist)));
