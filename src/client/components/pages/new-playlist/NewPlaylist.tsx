import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import { Grid, Button, Typography, TextField } from '@material-ui/core/';
import SimpleHeader from '../../fragments/playlist/SimpleHeader';

import PublicIcon from '@material-ui/icons/Public';
import FolderIcon from '@material-ui/icons/Folder';
import CreatePlaylistForm from '../../../store/pages/create-playlist/CreatePlaylistForm';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiOutlinedInput-root': {
        width: '100%',
        maxWidth: 600,
      },
    },
    root: {
      padding: 30,
      paddingTop: 10,
      color: theme.palette.primary.main,
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      marginLeft: 10,
      marginRight: 10,
    },
    title: {
      color: theme.palette.primary.light,
      marginBottom: 20,
      marginTop: 15,
    },
    icon: {
      verticalAlign: 'middle',
    },
    descriptionInput: {
      display: 'inline-block',
      color: theme.palette.primary.main,
      width: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> // eslint-disable-line
{ 

}; // eslint-disable-line

@observer
class NewPlaylist extends React.Component<Props, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <SimpleHeader title='New playlist' />
        <Grid container className={classes.root} direction='column'>
          <Grid item>
            <Typography className={classes.title}>Give your new playlist a name :</Typography>
          </Grid>
          <Grid item style={{ marginBottom: 20 }}>
            <TextField
              id='standard-basic'
              value={CreatePlaylistForm.name}
              onChange={e => {
                CreatePlaylistForm.setName(e.target.value);
              }}
              style={{ display: 'inline-block' }}
              label='Playlist name'
            />
          </Grid>
          <Grid item>
            <Typography className={classes.title}>Choose a picture (optionnal) and add a description :</Typography>
            <Typography style={{ display: 'inline-block' }}>You can either choose a picture from </Typography>
            <Button className={classes.button} style={{ display: 'inline-block' }}>
              <FolderIcon className={classes.icon} /> your computer
            </Button>
            <Typography style={{ display: 'inline-block' }}> or from </Typography>
            <Button className={classes.button} style={{ display: 'inline-block' }}>
              <PublicIcon className={classes.icon} /> Internet
            </Button>
            <br />
            <Grid item style={{ marginTop: 40, width: '100%' }}>
              <TextField
                id='filled-multiline-static'
                label='Add a description'
                multiline
                rows='4'
                value={CreatePlaylistForm.description}
                className={classes.descriptionInput}
                onChange={e => {
                  CreatePlaylistForm.setDescription(e.target.value);
                }}
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Grid item container direction='column' alignItems='flex-end'>
            <Button onClick={CreatePlaylistForm.send} className={classes.button}>
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NewPlaylist);
