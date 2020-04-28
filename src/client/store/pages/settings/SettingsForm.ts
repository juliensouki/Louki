import { action, computed, observable } from 'mobx';
import { Language } from '../../../../shared/Languages';
import { UpdateUserSettings } from '../../../requests/User';
import { AccountSettings } from '../../../../shared/IUser';

class SettingsForm {
  @observable lang: Language = Language.English;
  @observable internet: boolean = true;
  @observable pseudo: string = '';
  @observable profilePic: string | null = null;
  @observable userId: string | null = '';

  @action setLanguage = (lang: Language) => {
    this.lang = lang;
  };

  @action setUsername = (pseudo: string) => {
    this.pseudo = pseudo;
  };

  @action setProfilePicture = (profilePic: string | null) => {
    this.profilePic = profilePic;
  };

  @action toggleInternetUsage = () => {
    this.internet = !this.internet;
  };

  @computed get language(): Language {
    return this.lang;
  }

  @computed get username(): string {
    return this.pseudo;
  }

  @computed get profilePicture(): string | null {
    return this.profilePic;
  }

  @computed get useInternet(): boolean {
    return this.internet;
  }

  setUserId = (id: string | null) => {
    this.userId = id;
  };

  updateSettings = (settings: AccountSettings) => {
    if (this.userId != null) {
      UpdateUserSettings(settings);
    }
  };

  @action setSettings = (settings: AccountSettings) => {
    if (this.userId != null) {
      this.lang = settings.language;
      this.pseudo = settings.username;
      this.profilePic = settings.profilePicture;
      this.internet = settings.internetUsage;
    }
  };
}

export default new SettingsForm();
