import mongoose from 'mongoose';
import { Playlist } from '../../../shared/LoukiTypes';

interface PlaylistModel extends Playlist, mongoose.Document {}

const playlistSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  musics: [String],
  createdAt: Date,
  createdBy: Number,
  __id: { type: String, unique: true },
});

const PlaylistSchema = mongoose.model<PlaylistModel>('playlist', playlistSchema);

export = PlaylistSchema;
