import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/languages/LanguagesManager';

export interface Definition { // eslint-disable-line
  noListen: string;
  listened: (time: string) => string;
  nbArtists: (nb: number) => string;
  nbAlbums: (nb: number) => string;
  days: (nb: number) => string;
  hours: (nb: number) => string;
  minutes: (nb: number) => string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
