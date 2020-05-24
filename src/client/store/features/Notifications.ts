import { observable, action, computed } from 'mobx';

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

export type Notification = {
  message: string;
  type: NotificationType;
};

class Notifications {
  @observable private notifs: Array<Notification> = [];

  @action addNotification = (message: string, type: NotificationType): void => {
    this.notifs.push({
      message: message,
      type: type,
    });
  };

  @action emptyNotifications = () => {
    this.notifs = [];
  };

  @computed get notifications(): Array<Notification> {
    return this.notifs;
  }
}

export default new Notifications();
