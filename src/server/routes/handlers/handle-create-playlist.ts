import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import Playlist from '../../db/schemas/Playlist';
import uuid from 'uuid';

export const handleCreatePlaylist = (req: Request, res: Response): void => {
  const name = req.body['playlist-name'];
  const description = req.body['playlist-description'];
  const file = (req as any).file;
  const creationDate = new Date().getTime();
  const id = uuid.v4();

  databaseHandler.findOneInDocument(User, 'selected', true).then(user => {
    let filePath;
    const userId = user[0].__id;
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
        createdBy: userId,
        __id: id,
      },
      error => {
        databaseHandler.getCollectionContent(Playlist).then(values => {
          res.send(values);
        });
      },
    );
  });
};
