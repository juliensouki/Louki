import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';

import SetupForm from '../../../store/forms/SetupForm';

import FolderIcon from '@material-ui/icons/Folder';
import InfoIcon from '@material-ui/icons/Info';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.5rem',
      '&:not(:first-child)': {
        marginTop: '1.5em',
      },
    },
    textfield: {
      display: 'block',
      marginTop: '2em',
    },
    button: {
      display: 'inline-block',
      marginLeft: '1em',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      fontSize: '1.3rem',
    },
    icon: {
      verticalAlign: 'middle',
      position: 'relative',
      top: '-0.1em',
    },
    legend: {
      fontSize: '1.2rem',
    },
    infoLogo: {
      position: 'relative',
      top: '0.2em',
      fontSize: '2rem',
      marginRight: '0.5em',
    },
  });

@observer
class NewAccount extends React.Component<WithStyles, NoState> {
  openFileExplorer = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  @action handleFileChange = () => {
    const fileInput = document.getElementById('hidden-file-input');
    if (fileInput != null) {
      SetupForm.setPicture((fileInput as HTMLInputElement).files[0]);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.text}>{"Let's create a new Louki account for you."}</Typography>
        <form
          onSubmit={e => {
            e.stopPropagation();
          }}
        >
          <TextField
            label='Username'
            className={classes.textfield}
            value={SetupForm.username}
            onChange={e => {
              SetupForm.setUsername(e.target.value);
            }}
            InputProps={{
              classes: {
                input: classes.text,
              },
            }}
          />
          <Typography style={{ display: 'inline-block' }} className={classes.text}>
            {'Upload a profile picture : '}
          </Typography>
          <Button type='button' onClick={this.openFileExplorer} className={classes.button}>
            <input
              id='hidden-file-input'
              type='file'
              name='playlist-picture'
              style={{ display: 'none' }}
              onChange={this.handleFileChange}
            />
            <FolderIcon className={classes.icon} /> Select picture
          </Button>
          <Typography className={classes.legend}>{SetupForm.pictureName}</Typography>
          <Typography className={classes.text}>
            <InfoIcon className={classes.infoLogo} />
            {"Don't worry, your data is only stored locally, on your own computer. Only you and Louki can access it."}
          </Typography>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NewAccount);
