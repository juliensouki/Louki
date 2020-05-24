import * as React from 'react';
import { observe } from 'mobx';
import { observer } from 'mobx-react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import Notifications, { Notification } from '../../store/features/Notifications';

@observer
class NotificationsHandler extends React.Component<WithSnackbarProps, NoState> {
  render() {
    observe(Notifications.notifications, () => {
      Notifications.notifications.forEach((notif: Notification) => {
        const snackbarOptions = { variant: notif.type as any };
        this.props.enqueueSnackbar(notif.message, snackbarOptions);
      });
      Notifications.emptyNotifications();
    });
    return <React.Fragment />;
  }
}

export default withSnackbar(NotificationsHandler);
