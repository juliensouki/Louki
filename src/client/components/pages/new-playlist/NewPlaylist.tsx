import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import CreatePlaylistForm from '../../../store/pages/create-playlist/CreatePlaylistForm';
import MusicsData from '../../../store/common/MusicsData';
import SimpleHeader from '../../fragments/playlist/SimpleHeader';
import NavigationForm from '../../../store/common/NavigationForm';
import IPlaylist from '../../../../shared/IPlaylist';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Grid, Button, Typography, TextField } from '@material-ui/core/';
import PublicIcon from '@material-ui/icons/Public';
import FolderIcon from '@material-ui/icons/Folder';

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
  });

interface Props extends WithStyles<typeof styles> // eslint-disable-line
{ 

}; // eslint-disable-line

@observer
class NewPlaylist extends React.Component<Props & RouteComponentProps, NoState> {
  @observable open: boolean = false;
  @observable redirect: boolean = false;

  @action handleClose = (event: React.SyntheticEvent<any, Event>, reason: string) => {
    if (reason === 'clickaway') return;
    this.open = false;
  };

  openFileExplorer = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  handleRedirect = event => {
    event.stopPropagation();
    const form = document.getElementById('new-playlist-form');
    if (form != null) {
      const data = new FormData(form as HTMLFormElement);

      fetch('/createPlaylist', {
        method: 'POST',
        body: data,
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          MusicsData.setPlaylists(data);
          this.props.history.push('/all-music');
        });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <SimpleHeader title='New playlist' />
        <form
          method='POST'
          encType='multipart/form-data'
          action='/createPlaylist'
          id='new-playlist-form'
        >
          <Grid container className={classes.root} direction='column'>
            <Grid item>
              <Typography className={classes.title}>Give your new playlist a name :</Typography>
            </Grid>
            <Grid item style={{ marginBottom: '2em' }}>
              <TextField
                id='standard-basic'
                value={CreatePlaylistForm.name}
                name='playlist-name'
                InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                InputProps={{
                  classes: {
                    input: classes.resizeText,
                  },
                }}
                onChange={e => {
                  CreatePlaylistForm.setName(e.target.value);
                }}
                style={{ display: 'inline-block' }}
                label='Playlist name'
              />
            </Grid>
            <Grid item>
              <Typography className={classes.title}>Choose a picture (optionnal) and add a description :</Typography>
              <Typography style={{ display: 'inline-block', fontSize: '1.3rem' }}>
                You can either choose a picture from
              </Typography>
              <Button
                type='button'
                onClick={this.openFileExplorer}
                className={classes.button}
                style={{ display: 'inline-block' }}
              >
                <input id='hidden-file-input' type='file' name='playlist-picture' style={{ display: 'none' }} />
                <FolderIcon className={classes.icon} /> your computer
              </Button>
              <Typography style={{ display: 'inline-block', fontSize: '1.3rem' }}> or from </Typography>
              <Button type='button' className={classes.button} style={{ display: 'inline-block' }}>
                <PublicIcon className={classes.icon} /> Internet
              </Button>
              <br />
              <Grid item style={{ marginTop: '3.5em', width: '100%' }}>
                <TextField
                  id='filled-multiline-static'
                  label='Add a description'
                  name='playlist-description'
                  multiline
                  rows='4'
                  value={CreatePlaylistForm.description}
                  InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                  InputProps={{
                    classes: {
                      input: classes.resizeText,
                    },
                  }}
                  className={classes.descriptionInput}
                  onChange={e => {
                    CreatePlaylistForm.setDescription(e.target.value);
                  }}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid item container direction='column' alignItems='flex-end'>
              <Button className={classes.button} onClick={this.handleRedirect}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(NewPlaylist));
