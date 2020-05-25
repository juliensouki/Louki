import React from 'react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    cancel: {
      backgroundColor: '#9D9D9D',
      color: '#464646',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    save: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  type?: 'cancel' | 'save';
  onClick: (...args: any[]) => any;
  text: string;
  key?: any;
  disabled?: boolean;
}

const Pixabay: React.FunctionComponent<Props> = (props: Props) => {
  const { classes, type, onClick, text, disabled } = props;

  return (
    <Button className={type == 'cancel' ? classes.cancel : classes.save} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

export default withStyles(styles)(Pixabay);
