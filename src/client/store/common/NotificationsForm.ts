import { observable, action, computed } from 'mobx';

export enum NotificationType {
  SUCCESS = 0,
  ERROR = 1,
}

export interface INotificationItem {
  type: NotificationType;
  message: string;
  showUpDuration: number;
}

class NotificationsForm {
  @observable notif: INotificationItem | null = null;

  @action showNotification = (item: INotificationItem) => {
    this.notif = item;
  };

  @action closeNotification = () => {
    this.notif = null;
  };

  @computed public get notification(): INotificationItem | null {
    return this.notif;
  }
}

export default new NotificationsForm();
