import mongoose from 'mongoose';
import IPlaylist from '../../../shared/IPlaylist';

interface IPlaylistModel extends IPlaylist, mongoose.Document {}

const playlistSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  musics: [String],
  createdAt: Date,
  createdBy: Number,
  __id: { type: String, unique: true },
});

const playlist = mongoose.model<IPlaylistModel>('playlist', playlistSchema);

export = playlist;
