import mongoose, { Schema, Model } from 'mongoose';
import { Music } from '../../../shared/LoukiTypes';

interface MusicModel extends Music, mongoose.Document {}

const musicSchema: Schema = new mongoose.Schema({
  title: String,
  artist: [String],
  feat: [String],
  album: String,
  duration: Number,
  path: String,
  __id: { type: String, unique: true },
});

export const MusicSchema: Model<MusicModel> = mongoose.model<MusicModel>('Music', musicSchema);
