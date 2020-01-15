import { observable, computed, action } from 'mobx';
import IUser from '../../../shared/IUser';

class UserData {
  @observable private user: IUser | null = null;

  @action setUser = (user: IUser) => {
    this.user = user;
  };

  @computed get name(): string {
    if (this.user == null) return '';
    return this.user.name;
  }
}

export default new UserData();
