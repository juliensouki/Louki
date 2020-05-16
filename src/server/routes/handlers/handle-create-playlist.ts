import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import Playlist from '../../db/schemas/Playlist';
import uuid from 'uuid';
import { CreatePlaylistResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleCreatePlaylist = (req: Request, res: Response): void => {
  const name = req.body['playlist-name'];
  const description = req.body['playlist-description'];
  const file = (req as any).file;
  const creationDate = new Date().getTime();
  const id = uuid.v4();

  databaseHandler.findOneInDocument(User, 'selected', true).then(() => {
    let filePath;
    if (file) {
      const extension = file['mimetype'].split('image/')[1];
      filePath = '/assets/uploads/' + name + '.' + extension;
    } else {
      filePath = req.body.pictureUrl;
    }
    Playlist.create(
      {
        name: name,
        picture: filePath,
        description: description,
        musics: [],
        createdAt: creationDate,
        __id: id,
      },
      () => {
        databaseHandler.getCollectionContent(Playlist).then((response: CreatePlaylistResponse) => {
          res.status(200).send(response);
        },
        error => {
          logError(error);
          res.status(500).send(error.message);      
        });
      },
    );
  },
  error => {
    logError(error);
    res.status(500).send(error.message);    
  });
};
