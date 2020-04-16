import fr from './fr';
import en from './en';
import { Language } from '../../../../../shared/Languages';
import LanguagesManager from '../../../../store/LanguagesManager';

export interface Definition { // eslint-disable-line
  play: string;
  continue: string;
  pause: string;
  nbMusics(nb: number): string;
  hardcodedStat: string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
