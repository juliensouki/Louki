import { io } from '../config';
import db from '../db';
import { MusicSchema, ArtistSchema, AlbumSchema } from '../db/schemas/';
import filesReader from '../filesReader';
import { addMusicRoute } from '../routes';
import { addMusic } from './CreateMusic';
import { createArtist } from './CreateOrUpdateArtist';
import { createAlbum } from './CreateOrUpdateAlbum';

class MusicLoader {
  private musicsQueue: Array<[string, string]> = [];
  private artistsQueue: Array<[string, string]> = [];
  private albumsQueue: Array<[string, string, string]> = [];

  public pushInMusicsQueue = (musicId: string, folder: string) => {
    this.musicsQueue.push([musicId, folder]);
  };

  public processQueues = async () => {
    await this.processMusicsQueue();
    await this.processArtistsQueue();
    await this.processAlbumsQueue();

    this.artistsQueue = [];
    this.albumsQueue = [];
    this.musicsQueue = [];

    const musics = await db.getCollectionContent(MusicSchema);
    const artists = await db.getCollectionContent(ArtistSchema);
    const albums = await db.getCollectionContent(AlbumSchema);

    io.emit('sync_end');
    io.emit('refresh_all', {
      musics: musics,
      artists: artists,
      albums: albums,
    });
  };

  private processMusicsQueue = async () => {
    for (let i = 0; i < this.musicsQueue.length; i++) {
      const [path, folder] = this.musicsQueue[i];
      const results = await db.findOneInDocument(MusicSchema, 'path', path);

      const { music, artists, album } = await filesReader.getMetadataAndAddToDB(path, folder);

      if (results && results.length == 0) {
        this.artistsQueue.push([music.__id, artists[0]]);
        this.albumsQueue.push([music.__id, album, artists[0]]);
        await addMusic(music, artists[0], album);
      } else {
        addMusicRoute(results[0]);
      }
    }
  };

  private processArtistsQueue = async () => {
    for (let i = 0; i < this.artistsQueue.length; i++) {
      const [musicId, artistName] = this.artistsQueue[i];
      await createArtist(musicId, artistName);
    }
  };

  private processAlbumsQueue = async () => {
    for (let i = 0; i < this.albumsQueue.length; i++) {
      const [musicId, albumName, artistName] = this.albumsQueue[i];
      await createAlbum(musicId, albumName, artistName);
    }
  };
}

export default new MusicLoader();
