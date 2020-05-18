export default {
  noListen: "Vous n'avez pas encore écouté votre musique",
  listened: (time: string) => `Vous avez passé ${time} à écouter votre musique`,
  nbArtists: (nb: number) => `Vous avez ${nb} artiste${nb < 2 ? '' : 's'}`,
  nbAlbums: (nb: number) => `Vous avez ${nb} album${nb < 2 ? '' : 's'}`,
  days: (nb: number) => (nb < 2 ? ' jour' : ' jours'),
  hours: (nb: number) => (nb < 2 ? ' heure' : ' heures'),
  minutes: (nb: number) => (nb < 2 ? ' minute' : ' minutes'),
};
