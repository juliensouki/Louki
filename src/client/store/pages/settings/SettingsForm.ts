import { action, computed, observable } from 'mobx';
import { Language } from '../../../../shared/Languages';
import { UpdateUserSettings } from '../../../requests/User';
import { AccountSettings } from '../../../../shared/IUser';

class SettingsForm {
  @observable lang: Language = Language.English;
  @observable userId: string | null = '';

  @action setLanguage = (lang: Language) => {
    this.lang = lang;
  };

  @computed get language(): Language {
    return this.lang;
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
    }
  };
}

export default new SettingsForm();
