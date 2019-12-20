import mongoose from 'mongoose';
import IUser from '../../../shared/IUser';

interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  name: String,
  selected: Boolean,
  picture: String,
  musicPaths: [String],
  history: [Number],
  favorites: [Number],
});

const User = mongoose.model<IUserModel>('User', userSchema);

export = User;
