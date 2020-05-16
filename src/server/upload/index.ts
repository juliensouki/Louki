import { Request } from 'express';
import databaseHandler from '../db';
import UserSchema from '../db/schemas/UserSchema';

interface MulterStorage {
  destination: (req: Request, file, cb: (e: Error | null, dest: string) => void) => void;
  filename: (req: Request, file, cb: (e: Error | null, dest: string) => void) => void;
}

export const playlistPictureStorage: MulterStorage = {
  destination: (req: Request, file, cb: (e: Error | null, dest: string) => void) => {
    cb(null, 'assets/uploads/');
  },
  filename: async (req: Request, file, cb: (e: Error | null, dest: string) => void) => {
    const user = await databaseHandler.findOneInDocument(UserSchema, 'selected', true);
    let name = '0';
    if (user && user[0]) {
      name = user[0].__id;
    }
    const extension = file['mimetype'].split('image/')[1];
    cb(null, name + '.' + extension);
  },
};

export const profilePictureStorage: MulterStorage = {
  destination: (req: Request, file, cb: (e: Error | null, dest: string) => void): void => {
    cb(null, 'assets/uploads/');
  },
  filename: (req: Request, file, cb: (e: Error | null, dest: string) => void): void => {
    const name = req.body['playlist-name'];
    const extension = file['mimetype'].split('image/')[1];
    cb(null, name + '.' + extension);
  },
};
