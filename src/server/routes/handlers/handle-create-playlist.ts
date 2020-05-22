import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import PlaylistSchema from '../../db/schemas/PlaylistSchema';
import uuid from 'uuid';
import { CreatePlaylist as CreatePlaylistResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleCreatePlaylist = (req: Request, res: Response): void => {
  const name = req.body['playlist-name'];
  const description = req.body['playlist-description'];
  const file = (req as any).file;
  const creationDate = new Date().getTime();
  const id = uuid.v4();

  databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
    () => {
      let filePath;
      if (file) {
        const extension = file['mimetype'].split('image/')[1];
        filePath = '/assets/uploads/' + name + '.' + extension;
      } else {
        filePath = req.body.pictureUrl;
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
    },
    error => {
      logError(error);
      res.status(500).send(error.message);
    },
  );
};
