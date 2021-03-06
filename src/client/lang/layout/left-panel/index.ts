import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/languages/LanguagesManager';

export interface Definition {
  music: {
    title: string;
    allSongs: string;
    artists: string;
    albums: string;
    favorites: string;
  };
  playlists: {
    title: string;
    newPlaylist: string;
  };
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
