export default {
  title: 'Options',
  username: 'Pseudo',
  profilePic: 'Photo de profil',
  directories: 'Dossiers de musiques',
  internet: "Utiliser des données d'Internet",
  browse: 'Parcourir',
  reset: 'Réintialiser',
  localStorage: 'Utilisation du local storage',
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
  usernamePlaceholder: 'Username...',
  folders: (nb: number) => (nb < 2 ? 'dossier' : 'dossiers'),
};
