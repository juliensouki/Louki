export default {
  title: 'Settings',
  username: 'Username',
  profilePic: 'Profile picture',
  directories: 'Music directories',
  internet: 'Use data from the Internet',
  browse: 'Browse',
  reset: 'Reset',
  resetWarning:
    'Warning ! Reseting Louki will delete all your playlists and all the data collected about the \
    artists, albums and songs you listen to. It can NOT be undone.',
  cancel: 'Cancel',
  save: 'Save',
  confirmModal: {
    title: 'Are you sure ?',
    message: 'This action cannot be undone. Every data stored will be lost.',
  },
  valid: 'Valid',
  invalid: 'Invalid or not found',
  language: 'Language',
  folders: (nb: number) => (nb < 2 ? 'folder' : 'folders'),
  manageFolders: {
    title: 'Manage folders',
    placeholder: 'Add a folder (full path)',
    button: 'Add folder',
  },
  settingsUpdated: 'Your settings have been saved',
  folderAdded: (folder: string) => `Folder ${folder} has been added`,
  folderRemoved: (folder: string) => `Folder ${folder} has been removed`,
};
