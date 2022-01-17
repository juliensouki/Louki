import { Music } from '../../shared/LoukiTypes';
import { supportedAudioFormats } from '../config/config';
import { logError } from '../logger';
import * as mm from 'music-metadata';
import uuid from 'uuid';

export interface MusicMetadata {
  music: Music;
  artists: Array<string>;
  album: string;
}

class FilesReader {
  getFieldInMetadata = (metadata: mm.IAudioMetadata, fieldName: Array<string>): any => {
    let currentlevel = metadata;

    for (let i = 0; i < fieldName.length; i++) {
      if (!currentlevel[fieldName[i]]) return '';
      currentlevel = currentlevel[fieldName[i]];
    }
    return currentlevel;
  };

  getMetadataAndAddToDB = async (music: string, folder: string): Promise<MusicMetadata> => {
    try {
      const m: mm.IAudioMetadata = await mm.parseFile(music);
      const metadata: MusicMetadata = {
        music: {
          title: this.getFieldInMetadata(m, ['common', 'title']),
          artist: '',
          album: '',
          path: music,
          __id: uuid.v4(),
          duration: this.getFieldInMetadata(m, ['format', 'duration']),
        },
        artists: this.getFieldInMetadata(m, ['common', 'artists']),
        album: this.getFieldInMetadata(m, ['common', 'album']),
      };
      if (metadata.music.title == undefined || metadata.music.title == null || metadata.music.title == '') {
        metadata.music.title = music;
      }
      supportedAudioFormats.forEach(extension => {
        metadata.music.title = metadata.music.title.replace(folder, '').replace(`.${extension}`, '');
        //Making sure folder path does not contain \ instead of / because in this case they didn't get erased properly
        metadata.music.title = metadata.music.title.replace(folder.split('/').join('\\'), '');
      });
      return metadata;
    } catch (err) {
      logError({
        name: `File reader error`,
        message: err.message,
      });
      return null;
    }
  };
}

export default new FilesReader();
