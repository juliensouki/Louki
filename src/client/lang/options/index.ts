import fr from './fr';
import en from './en';
import { Language } from '../../../shared/Languages';
import LanguagesManager from '../../store/languages/LanguagesManager';

export interface Definition {
  addToPlaylist: string;
  edit: string;
  delete: string;
  removeBookmark: string;
  updatePlaylist: string;
  removeFromPlaylist: string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
