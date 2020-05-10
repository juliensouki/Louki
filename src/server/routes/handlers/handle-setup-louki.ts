import { Request, Response } from 'express';
import User from '../../db/schemas/User';

export const handleSetupLouki = (req: Request, res: Response): void => {
  let profilePicture = '';
  if ((req as any).file) {
    const extension = (req as any).file['mimetype'].split('image/')[1];
    profilePicture = '/assets/uploads/0.' + extension;
  }

  User.create({
    name: req.body.username,
    picture: profilePicture,
    selected: true,
    __id: 0,
    settings: {
      language: 'english',
      username: '',
      profilePicture: profilePicture,
      internetUsage: true,
    },
  }).then(user => {
    res.status(200).json(user);
  });
};
