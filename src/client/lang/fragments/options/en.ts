export default {
  addPlaylist: 'Add to a playllist...',
  edit: 'Edit',
  removeBookmark: 'Remove from favorites',
  removeFromPlaylist: 'Remove from playlist',
  editPlaylist: 'Edit playlist',
  deletePlaylist: 'Delete playlist',
  removeBookmarkNotif(musicName: string): string {
    return musicName + ' was removed from favorites';
  },
  playlistHasBeenDeletedNotif(playlistName: string): string {
    return 'Playlist ' + playlistName + ' has been deleted';
  },
  removedFromPlaylistNotif(musicName: string, playlistName: string): string {
    return musicName + ' was removed from playlist ' + playlistName;
  },
};
