import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/LanguagesManager';

export interface Definition { // eslint-disable-line
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
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
