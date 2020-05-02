import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.5rem',
      '&:not(:first-child)': {
        marginTop: '1.5em',
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {} //eslint-disable-line

@observer
class FirstUsage extends React.Component<IProps, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.text}>
          {"Hello there ! Looks like it's the first time you're using Louki."}
        </Typography>
        <Typography className={classes.text}>
          {
            'Louki is an open-source music player and manager. It has been created to enable developers to use it, and its basic features to create advanced projects.'
          }
        </Typography>
        <Typography className={classes.text}>
          <a
            href='https://github.com/juliensouki/Louki'
            target='_blank'
            rel='noopener noreferrer'
            style={{ marginRight: '0.5em' }}
          >
            {"Louki's GitHub"}
          </a>
          contains some documentation about the web-client, the server and the shared data used by both of them. You
          will also find information about the project and the technologies used.
        </Typography>
        <Typography className={classes.text}>
          Feel free to collaborate and submit pull requests. You can also contact me on my GitHub if you have any
          question.
        </Typography>
        <Typography className={classes.text}>
          Please follow the instructions to get the project ready for you. It will only take a couple minutes.
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FirstUsage);
