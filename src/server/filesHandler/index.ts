import IMusic from '../../shared/IMusic';

import * as fs from 'fs';
import * as mm from 'music-metadata';
import uuid from 'uuid';

class FilesHandler {
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
    callback: (values: any, artists: Array<string>, album: string) => void,
  ): void => {
    mm.parseFile(music)
      .then(metadata => {
        const artists = this.getFieldInMetadata(metadata, ['common', 'artists']);
        const album = this.getFieldInMetadata(metadata, ['common', 'album']);
        const musicObject: IMusic = {
          title: this.getFieldInMetadata(metadata, ['common', 'title']),
          artist: '',
          feat: [],
          album: '',
          path: music,
          __id: uuid.v4(),
          duration: this.getFieldInMetadata(metadata, ['format', 'duration']),
        };
        callback(musicObject, artists, album);
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  getArrayOfFiles = (musicPaths: Array<string>) => {
    const arrayOfPaths = [];
    musicPaths.forEach(pathElement => {
      const arrayOfFiles = [];
      fs.readdirSync(pathElement, { withFileTypes: true }).filter(item => {
        if (!item.isDirectory()) arrayOfFiles.push(pathElement + item.name);
      });
      arrayOfPaths.push(arrayOfFiles);
    });
    return arrayOfPaths;
  };
}

export default new FilesHandler();
