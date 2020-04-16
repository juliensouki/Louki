import fr from './fr';
import en from './en';
import { Language } from '../../../../../shared/Languages';
import LanguagesManager from '../../../../store/LanguagesManager';

export interface Definition { // eslint-disable-line
  song: string;
  artist: string;
  album: string;
  duration: string;
  favorites: {
    emptyText: string;
    emptyButton: string;
  };
  allMusics: {
    emptyText: string;
    emptyButton: string;
  };
  custom: {
    emptyText: string;
    emptyButton: string;
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
