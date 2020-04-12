import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import FolderIcon from '@material-ui/icons/Folder';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import { Grid, Button, Typography, Switch } from '@material-ui/core/';
import SimpleHeader from '../../fragments/playlist/SimpleHeader';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
      color: theme.palette.primary.main,
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
  });

interface Props extends WithStyles<typeof styles> // eslint-disable-line
{ 

}; // eslint-disable-line

@observer
class Settings extends React.Component<Props, NoState> {
  @observable internetChecked: boolean = true;

  @action handleChange = () => {
    this.internetChecked = !this.internetChecked;
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <SimpleHeader title='Settings' />
        <Grid container className={classes.root} direction='column'>
          <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
            <Typography className={classes.text}>Username</Typography>
            <Typography className={classes.text}>Souki</Typography>
          </Grid>
          <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
            <Typography className={classes.text}>Profile picture : /mnt/c/users/Souki/Pictures/pic.jpg</Typography>
            <Button className={classes.button}>
              <FolderIcon style={{ marginRight: '0.7em' }} /> Browse
            </Button>
          </Grid>
          <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
            <Typography className={classes.text}>Music directories : /mnt/c/users/Souki/Music/</Typography>
            <Button className={classes.button}>
              <FolderIcon style={{ marginRight: '0.7em' }} /> Browse
            </Button>
          </Grid>
          <Grid className={classes.gridContainer} item container direction='row' justify='space-between'>
            <Typography className={classes.text}>Use data from Internet</Typography>
            <Switch
              checked={this.internetChecked}
              onChange={this.handleChange}
              value={true}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid className={classes.gridContainer} item container direction='column'>
            <Button className={classes.button} style={{ width: 100 }}>
              <RotateLeftIcon style={{ marginRight: '0.7em' }} /> Reset
            </Button>
            <Typography className={classes.warning}>
              Warning ! Reseting Louki will delete all your playlists and all the data collected about the artists,
              albums and songs you listen to. It can NOT be undone.
            </Typography>
          </Grid>
          <Grid item container direction='row' justify='flex-end'>
            <Button className={classes.button} style={{ marginRight: '1.5em' }}>
              <CloseIcon style={{ marginRight: '0.7em' }} /> Cancel
            </Button>
            <Button className={classes.button}>
              <SaveIcon style={{ marginRight: '0.7em' }} /> Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Settings);
