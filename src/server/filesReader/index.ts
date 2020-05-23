import { Music } from '../../shared/LoukiTypes';
import { supportedAudioFormats } from '../config/config';
import { logError } from '../logger';
import * as mm from 'music-metadata';
import uuid from 'uuid';

class FilesReader {
  getFieldInMetadata = (metadata: any, fieldName: Array<string>): any => {
    let currentlevel = metadata;

    for (let i = 0; i < fieldName.length; i++) {
      if (!currentlevel[fieldName[i]]) return '';
      currentlevel = currentlevel[fieldName[i]];
    }
    return currentlevel;
  };

  getMetadataAndAddToDB = (
    music: string,
    folder: string,
    callback: (values: any, artists: Array<string>, album: string) => void,
  ): void => {
    mm.parseFile(music)
      .then(metadata => {
        const artists: Array<string> = this.getFieldInMetadata(metadata, ['common', 'artists']);
        const album: string = this.getFieldInMetadata(metadata, ['common', 'album']);
        const musicObject: Music = {
          title: this.getFieldInMetadata(metadata, ['common', 'title']),
          artist: '',
          album: '',
          path: music,
          __id: uuid.v4(),
          duration: this.getFieldInMetadata(metadata, ['format', 'duration']),
        };
        if (musicObject.title == undefined || musicObject.title == null || musicObject.title == '') {
          musicObject.title = music;
        }
        supportedAudioFormats.forEach(extension => {
          musicObject.title = musicObject.title.replace(folder, '').replace(`.${extension}`, '');
        });
        callback(musicObject, artists, album);
      })
      .catch(err => {
        logError({
          name: `File reader error`,
          message: err.message,
        });
      });
  };
}

export default new FilesReader();
