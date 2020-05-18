export default {
  notDeveloped: "Cette fonctionnalité n'a pas encore été dévelopée",
  settingsUpdated: 'Vos préférences ont été sauvegardées',
  addedBookmark: (musicName: string): string => `${musicName} a été ajouté aux favoris`,
  removedBookmark: (name: string): string => `${name} a été supprimée des favoris`,
  removedFromPlaylist: (musicName: string, playlistName: string): string =>
    `${musicName} a été retirée de la playlist ${playlistName}`,
  playlistDeleted: (name: string): string => `La plyalist ${name} a été supprimée`,
  folderAdded: (folder: string) => `Le dossier ${folder} a été ajouté`,
  folderRemoved: (folder: string) => `Le dossier ${folder} a été supprimé`,
  addedToPlaylistNotif: (musicName: string, playlistName: string): string =>
    `${musicName} a été ajoutée à la playlist ${playlistName}`,
  alreadyInPlaylistNotif: (musicName: string, playlistName: string): string =>
    `${musicName} est déjà dans la playlist ${playlistName}`,
  playlistUpdated: (playlist: string) => `La playlist ${playlist} a été mise à jour`,
  playlistCreated: (playlist: string) => `La playlist ${playlist} a été créée`,
};
