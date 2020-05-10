import mongoose from 'mongoose';
import IUser from '../../../shared/IUser';

interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  picture: String,
  musicPaths: [String],
  history: [String],
  favorites: [String],
  __id: { type: String, unique: true },
  settings: {
    language: String,
    internetUsage: Boolean,
  },
});

const User = mongoose.model<IUserModel>('User', userSchema);

export = User;
