import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { Settings, AccountSettings } from '../../../shared/LoukiTypes';
import { UpdateSettingsResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleUpdateSettings = async (req: Request, res: Response) => {
  const settings: Settings = JSON.parse(req.body.settings) as Settings;
  const file = (req as any).file;
  const user = (await databaseHandler.findOneInDocument(UserSchema, 'selected', true))[0];

  const newAccountSettings: AccountSettings = {
    language: settings.language,
    internetUsage: settings.internetUsage,
  };

  const jsonUpdate = {
    name: settings.username,
    picture: file ? `/assets/uploads/${user.__id}.${file['mimetype'].split('image/')[1]}` : user.picture,
    settings: newAccountSettings,
  };

  databaseHandler.updateDocument(UserSchema, user.__id, jsonUpdate).then(
    () => {
      databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
        users => {
          if (users && users.length > 0) {
            const response: UpdateSettingsResponse = users[0];
            res.status(200).send(response);
          } else {
            const response: CustomError = {
              name: `Update user settings error`,
              message: `Unable to get current user`,
            };
            logError(response);
            res.status(500).send(response);
          }
        },
        error => {
          logError(error);
          res.status(500).send(error);
        },
      );
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
