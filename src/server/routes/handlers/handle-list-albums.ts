import { Request, Response } from 'express';
import databaseHandler from '../../db/';
import Album from '../../db/schemas/Album';
import { ListAlbumsResponse } from '../../../shared/RoutesResponses';

export const handleListAlbums = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Album).then((albums: ListAlbumsResponse) => {
    res.status(200).json(albums);
  });
};
