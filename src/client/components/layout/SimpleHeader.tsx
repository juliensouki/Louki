import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core/';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: '2.5em',
    },
    title: {
      fontSize: '3rem',
      textTransform: 'uppercase',
      fontWeight: 'bolder',
      marginBottom: '0.2em',
      color: theme.palette.primary.light,
    },
    line: {
      backgroundColor: theme.palette.background.default,
      height: 1,
      width: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> {
  title: string;
}

const LeftPanelButton: React.FunctionComponent<Props> = (props: Props) => {
  const { classes, title } = props;

  return (
    <Grid container direction='column' justify='space-between' className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      <div className={classes.line}></div>
    </Grid>
  );
};

export default withStyles(styles)(LeftPanelButton);
