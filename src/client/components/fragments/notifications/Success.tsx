import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      backgroundColor: '#4CAF50',
      borderRadius: 10,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  message: string;
}

@observer
class Success extends React.Component<IProps, NoState> {
  render() {
    const { classes, message } = this.props;

    return (
      <Grid container alignItems='center' justify='center' direction='row' className={classes.root}>
        <CheckIcon style={{ marginRight: 15 }} />
        <Typography>{message}</Typography>
      </Grid>
    );
  }
}

export default withStyles(styles)(Success);
