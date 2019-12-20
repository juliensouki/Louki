import mongoose from 'mongoose';
import IArtist from '../../../shared/IArtist';

interface IArtistModel extends IArtist, mongoose.Document {}

const artistSchema = new mongoose.Schema({
  name: String,
  __id: String,
  albums: [String],
  musics: [String],
});

const artist = mongoose.model<IArtistModel>('Artist', artistSchema);

export = artist;
