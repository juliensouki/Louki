import React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';

import Success from './Success';
import Error from './Error';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  handleClose: (event: React.SyntheticEvent<any, Event>, reason: string) => void;
  type: NotificationType;
  message: string;
}

export enum NotificationType {
  SUCCESS = 0,
  ERROR = 1,
}

@observer
class Notification extends React.Component<IProps, NoState> {
  get messageComponent(): JSX.Element {
    const message = this.props.message;
    const type = this.props.type;

    if (type == NotificationType.SUCCESS) return <Success message={message} />;
    return <Error message={message} />;
  }

  render() {
    const { message, open, handleClose, type } = this.props;

    return (
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {this.messageComponent}
      </Snackbar>
    );
  }
}

export default withStyles(styles)(Notification);
