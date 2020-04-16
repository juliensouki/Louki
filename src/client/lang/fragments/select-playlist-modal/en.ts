export default {
  addedToPlaylistNotif(musicName: string, playlistName: string): string {
    return musicName + ' has been added to playlist ' + playlistName;
  },
  alreadyInPlaylistNotif(musicName: string, playlistName: string): string {
    return musicName + ' is already in playlist ' + playlistName;
  },
};
