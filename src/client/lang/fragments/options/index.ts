import fr from './fr';
import en from './en';
import { Language } from '../../../../shared/Languages';
import LanguagesManager from '../../../store/LanguagesManager';

export interface Definition { // eslint-disable-line
  addPlaylist: string;
  edit: string;
  removeBookmark: string;
  removeFromPlaylist: string;
  editPlaylist: string;
  deletePlaylist: string;
  removeBookmarkNotif(musicName: string): string;
  playlistHasBeenDeletedNotif(playlistName: string): string;
  removedFromPlaylistNotif(musicName: string, playlistName: string): string;
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
