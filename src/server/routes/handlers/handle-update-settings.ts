import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import IUser, { AccountSettings } from '../../../shared/IUser';

export const handleUpdateSettings = async (req: Request, res: Response) => {
  const id = req.body.id;
  const settings = JSON.parse(req.body.settings) as AccountSettings;
  const file = (req as any).file;

  const jsonUpdate = {
    name: settings.username,
    settings: settings,
  };

  if (file) {
    const extension = file['mimetype'].split('image/')[1];
    settings.profilePicture = '/assets/uploads/' + id + '.' + extension;
  } else {
    const user = await databaseHandler.findOneInDocument(User, 'selected', true);
    settings.profilePicture = user[0].settings.profilePicture;
  }

  databaseHandler.updateDocument(User, id, jsonUpdate).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
      res.json(values[0] as IUser);
    });
  });
};
