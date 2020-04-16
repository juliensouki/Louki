import fr from './fr';
import en from './en';
import { Language } from '../../../../../shared/Languages';
import LanguagesManager from '../../../../store/LanguagesManager';

export interface Definition { // eslint-disable-line
  duration: string;
  nbSongs: string;
  artist: string;

  artists: {
    emptyText: string;
    emptyButton: string;
  };
  albums: {
    title: string;
    emptyText: string;
    emptyButton: string;
  };
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
