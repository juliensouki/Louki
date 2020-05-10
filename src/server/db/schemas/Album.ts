import mongoose, { Schema, Model } from 'mongoose';
import IAlbum from '../../../shared/IAlbum';

interface IAlbumModel extends IAlbum, mongoose.Document {}

const albumSchema: Schema = new mongoose.Schema(
  {
    title: String,
    __id: { type: String, unique: true },
    musics: [String],
    author: String,
  },
  { emitIndexErrors: true },
);

const Album: Model<IAlbumModel> = mongoose.model<IAlbumModel>('Album', albumSchema);

export = Album;
