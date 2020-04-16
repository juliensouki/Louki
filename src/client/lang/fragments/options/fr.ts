export default {
  addPlaylist: 'Ajouter à une playlist...',
  edit: 'Modifier',
  removeBookmark: 'Supprimer des favoris',
  removeFromPlaylist: 'Supprimer de la playlist',
  editPlaylist: 'Modifier playlist',
  deletePlaylist: 'Supprimer playlist',
  removeBookmarkNotif(musicName: string): string {
    return musicName + ' a été enlevé des favoris';
  },
  playlistHasBeenDeletedNotif(playlistName: string): string {
    return 'La playlist ' + playlistName + ' a été supprimée';
  },
  removedFromPlaylistNotif(musicName: string, playlistName: string): string {
    return musicName + ' a été retiré de la playlist ' + playlistName;
  },
};
