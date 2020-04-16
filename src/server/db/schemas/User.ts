import mongoose from 'mongoose';
import IUser, { AccountSettings } from '../../../shared/IUser';

interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  picture: String,
  musicPaths: [String],
  history: [String],
  favorites: [String],
  __id: String,
  settings: {
    language: String,
  },
});

const User = mongoose.model<IUserModel>('User', userSchema);

export = User;
