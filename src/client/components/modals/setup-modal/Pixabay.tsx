import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Code from '../../utils/code/Code';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.5rem',
      '&:not(:first-child)': {
        marginTop: '1.5em',
      },
    },
    code: {
      backgroundColor: '#383838',
      border: '0.5px solid #555555',
      borderRadius: 5,
      display: 'inline-block',
      padding: '0.6rem',
      fontSize: '1.3rem',
    },
    codeContainer: {
      marginTop: '1em',
      marginBottom: '1em',
    },
  });

@observer
class Pixabay extends React.Component<WithStyles, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.text}>
          Louki enables you to add images found on in the internet when you create new playlists.
        </Typography>
        <Typography className={classes.text}>
          This feature works thanks to pixabay api. In order to make it work on your computer, you must create an
          account on
          <a
            href='https://pixabay.com/fr/accounts/register/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ marginLeft: '0.4em', marginRight: '0.4em' }}
          >
            pixabay
          </a>
          and get an api key.
        </Typography>
        <span>
          <Typography style={{ display: 'inline-block' }} className={classes.text}>
            Once you have this api key, add this in your
          </Typography>
          <Code inline>.env</Code>
          <Typography style={{ display: 'inline-block' }}> :</Typography>
        </span>
        <div className={classes.codeContainer}>
          <Code>{'PIXABAY_API_KEY={YOUR_API_KEY}'}</Code>
        </div>
        <Typography className={classes.text}>The file is located at the root of the project.</Typography>
        <Typography className={classes.text}>
          {
            'Once this is done, Don\'t forget to restart the entire project. Then go to settings, and you will see a "Pixabay status", informing you if Louki was able to get your api key.'
          }
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Pixabay);
