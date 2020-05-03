import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import CreatePlaylistForm from '../../../store/pages/create-playlist/CreatePlaylistForm';
import MusicsData from '../../../store/common/MusicsData';
import UserData from '../../../store/common/UserData';
import SimpleHeader from '../../fragments/playlist/SimpleHeader';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Grid, IconButton, Button, Typography, TextField } from '@material-ui/core/';
import AddPictureModal from '../../fragments/add-picture-modal/AddPlaylistModal';
import PublicIcon from '@material-ui/icons/Public';
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/Folder';
import texts from '../../../lang/pages/new-playlist';

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

interface Props extends WithStyles<typeof styles> // eslint-disable-line
{ 

}; // eslint-disable-line

@observer
class NewPlaylist extends React.Component<Props & RouteComponentProps & WithSnackbarProps, NoState> {
  @observable nameHelper: string = '';
  @observable descriptionHelper: string = '';
  @observable open: boolean = false;

  componentDidMount() {
    this.nameHelper = '';
    this.descriptionHelper = '';
    this.open = false;
    CreatePlaylistForm.setName('');
    CreatePlaylistForm.setDescription('');
    CreatePlaylistForm.setPicture(null);
    CreatePlaylistForm.setPictureUrl('');
  }

  openFileExplorer = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  formValidation = (): boolean => {
    return CreatePlaylistForm.name.length > 0 && CreatePlaylistForm.description.length > 0;
  };

  handleRedirect = event => {
    event.stopPropagation();
    const T = texts.current;
    const form = document.getElementById('new-playlist-form');
    if (form != null && this.formValidation()) {
      const data = new FormData(form as HTMLFormElement);

      if (CreatePlaylistForm.pictureUrl) {
        data.append('pictureUrl', CreatePlaylistForm.pictureUrl);
      }

      fetch('/createPlaylist', {
        method: 'POST',
        body: data,
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          MusicsData.setPlaylists(data);
          const snackbarOptions = { variant: 'success' as any };
          this.props.enqueueSnackbar(texts.current.playlistCreated(CreatePlaylistForm.name), snackbarOptions);
          this.props.history.push('/all-music');
        });
    } else {
      if (CreatePlaylistForm.name.length == 0) {
        this.nameHelper = T.nameInput.helper;
      }
      if (CreatePlaylistForm.description.length == 0) {
        this.descriptionHelper = T.descriptionInput.helper;
      }
    }
  };

  @action handleFileChange = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput != null) {
      CreatePlaylistForm.setPicture((fileInput as HTMLInputElement).files[0]);
    }
  };

  @computed get pictureSelectedText(): string {
    const T = texts.current;

    if (!CreatePlaylistForm.pictureFile && CreatePlaylistForm.pictureUrl == '') {
      return T.noPicture;
    } else if (CreatePlaylistForm.pictureUrl != '') {
      return T.currentPicture + CreatePlaylistForm.pictureUrl;
    }
    return T.currentPicture + CreatePlaylistForm.pictureFile.name;
  }

  @action cancelImage = () => {
    CreatePlaylistForm.setPicture(null);
    CreatePlaylistForm.setPictureUrl('');
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
                value={CreatePlaylistForm.name}
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
                  CreatePlaylistForm.setName(e.target.value);
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
                disabled={!UserData.settings.internetUsage}
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
                {CreatePlaylistForm.pictureFile || CreatePlaylistForm.pictureUrl != '' ? (
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
                  value={CreatePlaylistForm.description}
                  InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                  InputProps={{
                    classes: {
                      input: classes.resizeText,
                    },
                  }}
                  className={classes.descriptionInput}
                  onChange={e => {
                    this.descriptionHelper = '';
                    CreatePlaylistForm.setDescription(e.target.value);
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
