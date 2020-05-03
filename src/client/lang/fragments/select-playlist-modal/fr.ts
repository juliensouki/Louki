export default {
  addedToPlaylistNotif(musicName: string, playlistName: string): string {
    return musicName + ' a été ajoutée à la playlist ' + playlistName;
  },
  alreadyInPlaylistNotif(musicName: string, playlistName: string): string {
    return musicName + ' est déjà dans la playlist ' + playlistName;
  },
  title: 'Choisissez une playlist',
  cancel: 'Annuler',
};
