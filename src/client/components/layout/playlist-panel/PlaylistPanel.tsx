import * as React from 'react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.loader-grid': {
        display: 'none',
      },
    },
    root: {
      backgroundColor: 'black',
      overflowY: 'auto',
      height: '100%',
      display: 'inline-block',
      width: '83%',
      color: '#FFF',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        left: 0,
      },
    },
  });

const LeftPanelButton: React.FunctionComponent<WithStyles> = (props: React.PropsWithChildren<WithStyles>) => {
  const { classes, children } = props;

  return <div className={classes.root}>{children}</div>;
};

export default withStyles(styles)(LeftPanelButton);
