import React from 'react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button as MUIButton } from '@material-ui/core';

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

const Button: React.FunctionComponent<Props> = (props: Props) => {
  const { classes, type, onClick, text, disabled } = props;

  return (
    <MUIButton className={type == 'cancel' ? classes.cancel : classes.save} onClick={onClick} disabled={disabled}>
      {text}
    </MUIButton>
  );
};

export default withStyles(styles)(Button);
