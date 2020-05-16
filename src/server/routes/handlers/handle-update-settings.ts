import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { Settings, AccountSettings } from '../../../shared/IUser';
import { UpdateSettingsResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

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
      if (users && users.length > 0) {
        const response: UpdateSettingsResponse = users[0];
        res.status(200).json(response);
      } else {
        const response: CustomError = {
          name: `Update user settings error`,
          message: `Unable to get current user`,
        };
        logError(response);
        res.status(422).send(response);
      }
    },
    error => {
      logError(error);
      res.status(422).send(error);
    });
  },
  error => {
    logError(error);
    res.status(422).send(error);
  });
};
