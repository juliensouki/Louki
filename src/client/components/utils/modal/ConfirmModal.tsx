import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '../form-controls/Button';
import Modal from './Modal';
import texts from '../../../lang/utils';

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
  const T = texts.current;

  const buttons: Array<JSX.Element> = [
    <Button key={1} type='save' text={T.yes} onClick={onConfirm} />,
    <Button key={0} type='cancel' onClick={onCancel} text={T.no} />,
  ];

  return (
    <Modal open={open} maxWidth='sm' title={title} onClose={onCancel} buttons={buttons}>
      <Typography className={classes.message}>{message}</Typography>
    </Modal>
  );
};

export default withStyles(styles)(ConfirmModal);
