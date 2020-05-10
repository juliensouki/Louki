import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { Settings, AccountSettings } from '../../../shared/IUser';
import { UpdateSettingsResponse } from '../../../shared/RoutesResponses';

export const handleUpdateSettings = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const settings: Settings = JSON.parse(req.body.settings) as Settings;
  const file = (req as any).file;
  const user = await databaseHandler.findOneInDocument(User, 'selected', true);

  const newAccountSettings: AccountSettings = {
    language: settings.language,
    internetUsage: settings.internetUsage,
  };

  const jsonUpdate = {
    name: settings.username,
    picture: file ? `/assets/uploads/${id}.${file['mimetype'].split('image/')[1]}` : user[0].picture,
    settings: newAccountSettings,
  };

  databaseHandler.updateDocument(User, id, jsonUpdate).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      const response: UpdateSettingsResponse = users[0];
      res.json(response);
    });
  });
};
