import mongoose from 'mongoose';
import { User } from '../../../shared/LoukiTypes';

interface UserModel extends User, mongoose.Document {}

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
    localStorageUsage: Boolean,
  },
});

const UserSchema = mongoose.model<UserModel>('User', userSchema);

export = UserSchema;
