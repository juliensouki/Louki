import { computed, observable } from 'mobx';
import { Language } from '../../shared/Languages';
import UserForm from './common/UserData';

export default class LanguagesManager<T> {
  @observable translations: Map<Language, T>;
  @observable language: Language = Language.French;

  constructor(translations: Map<Language, T>) {
    this.translations = translations;
  }

  @computed get current(): T {
    return this.translations.get(UserForm.settings.language);
  }
}
