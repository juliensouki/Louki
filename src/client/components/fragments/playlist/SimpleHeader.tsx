import * as React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core/';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 130,
      width: '100%',
      padding: 30,
    },
    title: {
      fontSize: 35,
      textTransform: 'uppercase',
      fontWeight: 'bolder',
      color: theme.palette.primary.light,
    },
    line: {
      backgroundColor: theme.palette.background.default,
      height: 1,
      width: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> { // eslint-disable-line
  title: string;
}; // eslint-disable-line

@observer
class SimpleHeader extends React.Component<Props, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction='column' justify='space-between' className={classes.root}>
        <Typography className={classes.title}>{this.props.title}</Typography>
        <div className={classes.line}></div>
      </Grid>
    );
  }
}

export default withStyles(styles)(SimpleHeader);
