import { Request, Response } from 'express';
import fs from 'fs';
import r from 'request';
import databaseHandler from '../../db';
import { PlaylistSchema } from '../../db/schemas';
import uuid from 'uuid';
import { CreatePlaylist as CreatePlaylistResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

const download = function(uri, filename, callback) {
  r.head(uri, () => {
    r(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
};
export const handleCreatePlaylist = (req: Request, res: Response): void => {
  const name = req.body['playlist-name'];
  const description = req.body['playlist-description'];
  const file = (req as any).file;
  const creationDate = new Date().getTime();
  const id = uuid.v4();

  try {
    let filePath;
    if (file) {
      const extension = file['mimetype'].split('image/')[1];
      filePath = `/assets/uploads/${name}.${extension}`;
    } else if (req.body.pictureUrl) {
      filePath = `/assets/uploads/${name}`;
      download(req.body.pictureUrl, `.${filePath}`, () => {});
    }
    PlaylistSchema.create(
      {
        name: name,
        picture: filePath,
        description: description,
        musics: [],
        createdAt: creationDate,
        __id: id,
      },
      () => {
        databaseHandler.getCollectionContent(PlaylistSchema).then(
          (response: CreatePlaylistResponse) => {
            res.status(200).send(response);
          },
          error => {
            logError(error);
            res.status(500).send(error.message);
          },
        );
      },
    );
  } catch (e) {
    logError(e);
    res.status(500).send('Unable to create playlist');
  }
};
