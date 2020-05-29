import mongoose from 'mongoose';
import { Artist } from '../../../shared/LoukiTypes';

interface ArtistModel extends Artist, mongoose.Document {}

const artistSchema = new mongoose.Schema(
  {
    name: String,
    __id: { type: String, unique: true },
    musics: [String],
  },
  { emitIndexErrors: true },
);

export const ArtistSchema = mongoose.model<ArtistModel>('Artist', artistSchema);
