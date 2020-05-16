import * as React from 'react';
import { observer } from 'mobx-react';
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

@observer
class ConfirmModal extends React.Component<React.PropsWithChildren<Props>, NoState> {
  get buttons(): Array<JSX.Element> {
    const { classes, onCancel, onConfirm } = this.props;

    return [
      <Button key={0} className={classes.cancelButton} onClick={onCancel}>
        No
      </Button>,
      <Button key={1} className={classes.confirmButton} onClick={onConfirm}>
        Yes
      </Button>,
    ];
  }

  render() {
    const { open, title, onCancel, message, classes } = this.props;

    return (
      <Modal open={open} maxWidth='sm' title={title} onClose={onCancel} buttons={this.buttons}>
        <Typography className={classes.message}>{message}</Typography>
      </Modal>
    );
  }
}

export default withStyles(styles)(ConfirmModal);
