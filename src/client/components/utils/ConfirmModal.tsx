import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '../utils/Button';
import Modal from './Modal';

const styles = (theme: Theme) =>
  createStyles({
    message: {
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
    <Button key={0} type='cancel' onClick={onCancel} text='No' />,
    <Button key={1} type='save' text='Yes' onClick={onConfirm}>
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
