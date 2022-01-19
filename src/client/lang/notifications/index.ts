import fr from './fr';
import en from './en';
import { Language } from '../../../shared/Languages';
import LanguagesManager from '../../store/languages/LanguagesManager';

export interface Definition {
  notDeveloped: string;
  settingsUpdated: string;
  addedBookmark(musicName: string): string;
  removedBookmark: (name: string) => string;
  removedFromPlaylist: (musicName: string, playlistName: string) => string;
  playlistDeleted: (name: string) => string;
  folderAdded: (folder: string) => string;
  folderRemoved: (folder: string) => string;
  addedToPlaylistNotif(musicName: string, playlistName: string): string;
  alreadyInPlaylistNotif(musicName: string, playlistName: string): string;
  playlistUpdated: (playlist: string) => string;
  playlistCreated: (playlist: string) => string;
  failedCreatingPlaylist: (playlist: string) => string;
  errors: {
    folderNotAdded: (folder: string) => string;
  };
}

export default new LanguagesManager<Definition>(
  new Map<Language, Definition>([
    [Language.French, fr],
    [Language.English, en],
  ]),
);
