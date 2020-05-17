import fr from './fr';
import en from './en';
import { Language } from '../../../../../shared/Languages';
import LanguagesManager from '../../../../store/languages/LanguagesManager';

export interface Definition {
  song: string;
  artist: string;
  album: string;
  duration: string;
  favorites: {
    emptyText: string;
    emptyButtonText: string;
  };
  allMusics: {
    emptyText: string;
    emptyButtonText: string;
  };
  custom: {
    emptyText: string;
    emptyButtonText: string;
  };
  addBookmarkNotif(musicName: string): string;
  removeBookmarkNotif(musicName: string): string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
