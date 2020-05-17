import { observable, computed, action } from 'mobx';
import { User as UserType, Settings } from '../../../shared/LoukiTypes';

class User {
  @observable private user: UserType | null = null;

  @action setUser = (user: UserType) => {
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

  @computed get settings(): Settings {
    return {
      ...this.user.settings,
      username: this.name,
      picture: this.picture,
    };
  }

  @computed get folders(): Array<string> {
    return this.user.musicPaths;
  }
}

export default new User();
