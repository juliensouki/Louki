import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/languages/LanguagesManager';

export interface Definition {
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
  confirmModal: {
    title: string;
    message: string;
  };
  valid: string;
  invalid: string;
  language: string;
  folders: (nb: number) => string;
  manageFolders: {
    title: string;
    placeholder: string;
    button: string;
  };
  settingsUpdated: string;
  folderAdded: (folder: string) => string;
  folderRemoved: (folder: string) => string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
