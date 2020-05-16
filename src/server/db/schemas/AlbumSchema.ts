import mongoose, { Schema, Model } from 'mongoose';
import { Album } from '../../../shared/LoukiTypes';

interface AlbumModel extends Album, mongoose.Document {}

const albumSchema: Schema = new mongoose.Schema(
  {
    title: String,
    __id: { type: String, unique: true },
    musics: [String],
    author: String,
  },
  { emitIndexErrors: true },
);

const AlbumSchema: Model<AlbumModel> = mongoose.model<AlbumModel>('Album', albumSchema);

export = AlbumSchema;
