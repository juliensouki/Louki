import mongoose from 'mongoose';
import { User } from '../../../shared/LoukiTypes';
interface UserModel extends User, mongoose.Document {
}
export declare const UserSchema: mongoose.Model<UserModel, {}>;
export {};
