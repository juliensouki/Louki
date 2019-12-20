import mongoose, { Schema, Model } from 'mongoose';
import IMusic from '../../../shared/IMusic';

interface IMusicModel extends IMusic, mongoose.Document {}

const musicSchema: Schema = new mongoose.Schema({
  title: String,
  artist: [String],
  feat: [String],
  album: String,
  duration: Number,
  path: String,
  __id: String,
});

const Music: Model<IMusicModel> = mongoose.model<IMusicModel>('Music', musicSchema);

export = Music;
