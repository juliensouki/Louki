import { action, computed, observable } from 'mobx';
import { Language } from '../../../../shared/Languages';
import { AccountSettings } from '../../../../shared/IUser';

class SettingsForm {
  @observable private lang: Language = Language.English;
  @observable private internet: boolean = true;
  @observable private pseudo: string = '';
  @observable private file: File | null = null;
  @observable private picturePath: string = '';
  @observable private userId: string | null = '';

  @action setLanguage = (lang: Language) => {
    this.lang = lang;
  };

  @action setUsername = (pseudo: string) => {
    this.pseudo = pseudo;
  };

  @action setProfilePicture = (file: File | null) => {
    this.file = file;
  };

  @action toggleInternetUsage = () => {
    this.internet = !this.internet;
  };

  @computed get id(): string {
    return this.userId == null ? '' : this.userId;
  }

  @computed get language(): Language {
    return this.lang;
  }

  @computed get username(): string {
    return this.pseudo;
  }

  @computed get profilePicture(): File | null {
    return this.file;
  }

  @computed get useInternet(): boolean {
    return this.internet;
  }

  setUserId = (id: string | null) => {
    this.userId = id;
  };

  @computed get path(): string {
    return this.file != null ? this.file.name : this.picturePath;
  }

  @computed get settings(): AccountSettings {
    return {
      username: this.username,
      language: this.language,
      profilePicture: '',
      internetUsage: this.internet,
    };
  }

  @action setSettings = (settings: AccountSettings) => {
    if (this.userId != null) {
      this.lang = settings.language;
      this.picturePath = settings.profilePicture;
      this.internet = settings.internetUsage;
    }
  };
}

export default new SettingsForm();
