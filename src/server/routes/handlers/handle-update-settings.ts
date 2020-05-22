import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { Settings, AccountSettings } from '../../../shared/LoukiTypes';
import { UpdateSettings as UpdateSettingsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleUpdateSettings = async (req: Request, res: Response) => {
  const settings: Settings = JSON.parse(req.body.settings) as Settings;
  const file = (req as any).file;
  const user = (await databaseHandler.findOneInDocument(UserSchema, 'selected', true))[0];

  const newAccountSettings: AccountSettings = {
    language: settings.language,
    internetUsage: settings.internetUsage,
    localStorageUsage: settings.localStorageUsage,
  };

  const jsonUpdate = {
    name: settings.username,
    picture: file ? `/assets/uploads/${user.__id}.${file['mimetype'].split('image/')[1]}` : user.picture,
    settings: newAccountSettings,
  };

  databaseHandler.updateDocument(UserSchema, user.__id, jsonUpdate).then(
    user => {
      const response: UpdateSettingsResponse = user;
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
