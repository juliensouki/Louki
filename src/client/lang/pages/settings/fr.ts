export default {
  title: 'Options',
  username: 'Pseudo',
  profilePic: 'Photo de profil',
  directories: 'Dossiers de musiques',
  internet: "Utiliser des données d'Internet",
  browse: 'Parcourir',
  reset: 'Réintialiser',
  resetWarning:
    'Attention ! Réinitialiser Louki supprimera tous vos playlists, ainsi que toutes les données \
    collectées à propos des artistes, albums et musiques que vous écoutez. Cette action ne peut PAS être annulée.',
  cancel: 'Annuler',
  save: 'Sauvegarder',
  confirmModal: {
    title: 'Êtes-vous sûr ?',
    message: 'Cette action ne peut pas être annulée. Toutes vos données seront supprimées.',
  },
  valid: 'Valide',
  invalid: 'Invalide ou non trouvé',
  language: 'Langage',
  folders: (nb: number) => (nb < 2 ? 'dossier' : 'dossiers'),
  manageFolders: {
    title: 'Gérez dossiers',
    placeholder: 'Ajoutez un dossier (chemin entier)',
    button: 'Ajouter dossier',
  },
  settingsUpdated: 'Vos préférences ont été sauvegardées',
  folderAdded: (folder: string) => `Le dossier ${folder} a été ajouté`,
  folderRemoved: (folder: string) => `Le dossier ${folder} a été supprimé`,
};
