import { action, computed, observable } from 'mobx';
import { Language } from '../../../shared/Languages';
import { Settings } from '../../../shared/IUser';

class SettingsForm {
  @observable private lang: Language = Language.English;
  @observable private internet: boolean = true;
  @observable private pseudo: string = '';
  @observable private file: File | null = null;
  @observable private picturePath: string = '';
  @observable private userId: string | null = '';
  @observable private openConfirmModal: boolean = false;
  @observable private openManageFoldersModal: boolean = false;

  @action setLanguage = (lang: Language) => {
    this.lang = lang;
  };

  @action setOpen = (openConfirmModal: boolean) => {
    this.openConfirmModal = openConfirmModal;
  };

  @action setOpenManage = (openManageFoldersModal: boolean) => {
    this.openManageFoldersModal = openManageFoldersModal;
  };

  @action setUsername = (pseudo: string) => {
    this.pseudo = pseudo;
  };

  @action setPicture = (file: File | null) => {
    this.file = file;
  };

  @action toggleInternetUsage = () => {
    this.internet = !this.internet;
  };

  @computed get openManage(): boolean {
    return this.openManageFoldersModal;
  }

  @computed get open(): boolean {
    return this.openConfirmModal;
  }

  @computed get id(): string {
    return this.userId == null ? '' : this.userId;
  }

  @computed get language(): Language {
    return this.lang;
  }

  @computed get username(): string {
    return this.pseudo;
  }

  @computed get picture(): File | null {
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

  @computed get settings(): Settings {
    return {
      username: this.username,
      language: this.language,
      picture: '',
      internetUsage: this.internet,
    };
  }

  @action setSettings = (settings: Settings) => {
    if (this.userId != null) {
      this.lang = settings.language;
      this.picturePath = settings.picture;
      this.internet = settings.internetUsage;
    }
  };
}

export default new SettingsForm();
