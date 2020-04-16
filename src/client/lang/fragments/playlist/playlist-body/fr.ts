export default {
  song: 'Titre',
  artist: 'Artiste',
  album: 'Album',
  duration: 'Durée',
  favorites: {
    emptyText: "Vous n'avez aucune musique dans vos favoris",
    emptyButton: 'Toutes vos musiques',
  },
  allMusics: {
    emptyText:
      "Vous n'avez aucune musique pour le moment. Pensez à vérifier dans les options que vous avez bien ajouté au \
      moins un dossier de musiques.",
    emptyButton: 'Options',
  },
  custom: {
    emptyText: 'Cette playlist est vide pour le moment',
    emptyButton: 'Toutes vos musiques',
  },
  addBookmarkNotif: (musicName: string): string => {
    return musicName + ' a été ajouté aux favoris';
  },
  removeBookmarkNotif: (musicName: string): string => {
    return musicName + ' a été enlevé des favoris';
  },
};
