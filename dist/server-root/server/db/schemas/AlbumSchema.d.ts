import mongoose, { Model } from 'mongoose';
import { Album } from '../../../shared/LoukiTypes';
interface AlbumModel extends Album, mongoose.Document {
}
export declare const AlbumSchema: Model<AlbumModel>;
export {};
