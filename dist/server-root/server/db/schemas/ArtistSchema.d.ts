import mongoose from 'mongoose';
import { Artist } from '../../../shared/LoukiTypes';
interface ArtistModel extends Artist, mongoose.Document {
}
export declare const ArtistSchema: mongoose.Model<ArtistModel, {}>;
export {};
