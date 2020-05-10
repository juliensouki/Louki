import { observable, computed, action } from 'mobx';
import IUser, { AccountSettings } from '../../../shared/IUser';

class UserData {
  @observable private user: IUser | null = null;

  @action setUser = (user: IUser) => {
    this.user = user;
  };

  @computed get name(): string {
    if (this.user == null) return '';
    return this.user.name;
  }

  @computed get picture(): string {
    return this.user.picture;
  }

  @computed get id(): string | null {
    if (this.user == null) return null;
    return this.user.__id;
  }

  @computed get settings(): AccountSettings {
    return this.user.settings;
  }

  @computed get folders(): Array<string> {
    return this.user.musicPaths;
  }
}

export default new UserData();
