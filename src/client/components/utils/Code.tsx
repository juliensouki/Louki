import * as React from 'react';

import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    code: {
      backgroundColor: '#383838',
      border: '0.5px solid #555555',
      borderRadius: 5,
      padding: '1em',
      paddingTop: '0.5em',
      paddingBottom: '0.5em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  inline?: boolean;
}

const Pixabay: React.FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) => {
  const { classes, children, inline } = props;

  const codeStyle = inline
    ? { display: 'inline-block', marginLeft: '0.3em', marginRight: '0.3em' }
    : { width: 'calc(100% - 24px)', display: 'block' };

  return (
    <Typography className={classes.code} style={codeStyle}>
      {children}
    </Typography>
  );
};

export default withStyles(styles)(Pixabay);
