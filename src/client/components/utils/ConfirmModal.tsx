import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Modal from './Modal';

const styles = (theme: Theme) =>
  createStyles({
    message: {
      fontSize: '1.3rem',
    },
    cancelButton: {
      backgroundColor: '#9D9D9D',
      color: '#464646',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    confirmButton: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) => {
  const { open, title, onCancel, onConfirm, message, classes } = props;

  const buttons: Array<JSX.Element> = [
    <Button key={0} className={classes.cancelButton} onClick={onCancel}>
      No
    </Button>,
    <Button key={1} className={classes.confirmButton} onClick={onConfirm}>
      Yes
    </Button>,
  ];

  return (
    <Modal open={open} maxWidth='sm' title={title} onClose={onCancel} buttons={buttons}>
      <Typography className={classes.message}>{message}</Typography>
    </Modal>
  );
};

export default withStyles(styles)(ConfirmModal);
