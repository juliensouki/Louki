import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/languages/LanguagesManager';

export interface Definition { // eslint-disable-line
  title: string;
  cancel: string;
  helper: string;
  upload: string;
  search: string;
  uploadText: string;
  searchText: string;
  confirmation: string;
  back: string;
  tryAgain: string;
  next: string;
  yes: string;
  uploadPlaceholder: string;
  error: string;
  searchPlaceholder: string;
  credits: string;
  searchButton: string;
  confirmationMessage: string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
