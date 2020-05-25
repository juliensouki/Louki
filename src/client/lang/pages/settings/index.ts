import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/languages/LanguagesManager';

export interface Definition {
  usernamePlaceholder: string;
  title: string;
  username: string;
  profilePic: string;
  directories: string;
  internet: string;
  browse: string;
  reset: string;
  resetWarning: string;
  cancel: string;
  save: string;
  localStorage: string;
  confirmModal: {
    title: string;
    message: string;
  };
  valid: string;
  invalid: string;
  language: string;
  folders: (nb: number) => string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
