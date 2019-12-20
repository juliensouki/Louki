import mongoose, { Schema, Model } from 'mongoose';
import IAlbum from '../../../shared/IAlbum';

interface IAlbumModel extends IAlbum, mongoose.Document {}

const albumSchema: Schema = new mongoose.Schema({
  title: String,
  __id: String,
  musics: [String],
  author: String,
});

const Album: Model<IAlbumModel> = mongoose.model<IAlbumModel>('Album', albumSchema);

export = Album;
