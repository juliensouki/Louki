import mongoose, { Model } from 'mongoose';
import { Music } from '../../../shared/LoukiTypes';
interface MusicModel extends Music, mongoose.Document {
}
export declare const MusicSchema: Model<MusicModel>;
export {};
