import mongoose from 'mongoose';
import { Playlist } from '../../../shared/LoukiTypes';
interface PlaylistModel extends Playlist, mongoose.Document {
}
export declare const PlaylistSchema: mongoose.Model<PlaylistModel, {}>;
export {};
