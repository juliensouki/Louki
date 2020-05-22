export default {
  notDeveloped: 'This feature has not been developed yet',
  settingsUpdated: 'Your settings have been saved',
  addedBookmark: (musicName: string): string => `${musicName} was added to bookmarks`,
  removedBookmark: (name: string): string => `${name} was removed from bookmarks`,
  removedFromPlaylist: (musicName: string, playlistName: string): string =>
    `${musicName} was removed from playlist ${playlistName}`,
  playlistDeleted: (name: string): string => `Playlist ${name} was deleted`,
  folderAdded: (folder: string) => `Folder ${folder} has been added`,
  folderRemoved: (folder: string) => `Folder ${folder} has been removed`,
  addedToPlaylistNotif: (musicName: string, playlistName: string): string =>
    `${musicName} has been added to playlist ${playlistName}`,
  alreadyInPlaylistNotif: (musicName: string, playlistName: string): string =>
    `${musicName} is already in playlist ${playlistName}`,
  playlistUpdated: (playlist: string) => `Playlist ${playlist} has been updated`,
  playlistCreated: (playlist: string) => `Playlist ${playlist} has been created`,
  errors: {
    folderNotAdded: (folder: string): string => `${folder} could not be added`,
  },
};
