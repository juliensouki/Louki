import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 10,
      backgroundColor: '#F44336',
    },
  });

interface IProps extends WithStyles<typeof styles> {
  message: string;
}

@observer
class Error extends React.Component<IProps, NoState> {
  render() {
    const { classes, message } = this.props;

    return (
      <Grid container alignItems='center' justify='center' direction='row' className={classes.root}>
        <ErrorOutlineIcon style={{ marginRight: 15 }} />
        <Typography>{message}</Typography>
      </Grid>
    );
  }
}

export default withStyles(styles)(Error);
