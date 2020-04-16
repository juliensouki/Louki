import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/LanguagesManager';

export interface Definition { // eslint-disable-line
  title: string;
  chooseName: string;
  choosePicture: string;
  chooseFrom: string;
  yourComputer: string;
  orFrom: string;
  internet: string;
  noPicture: string;
  currentPicture: string;
  save: string;
  nameInput: {
    placeholder: string;
    helper: string;
  };
  descriptionInput: {
    placeholder: string;
    helper: string;
  };
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
