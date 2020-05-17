export default {
  song: 'Title',
  artist: 'Artist',
  album: 'Album',
  duration: 'Duration',
  favorites: {
    emptyText: "You don't have any favorite song yet",
    emptyButtonText: 'All your musics',
  },
  allMusics: {
    emptyText: "You don't have any song yet. Please check in your settings that you added at least one music folder",
    emptyButtonText: 'Settings',
  },
  custom: {
    emptyText: 'This playlist is currently empty',
    emptyButtonText: 'All your musics',
  },
  addBookmarkNotif: (musicName: string): string => {
    return musicName + ' has been added to favorites';
  },
  removeBookmarkNotif: (musicName: string): string => {
    return musicName + ' has been removed from favorites';
  },
};
