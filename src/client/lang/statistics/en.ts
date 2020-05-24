export default {
  noListen: "You havn't listened to your music yet",
  listened: (time: string) => `You spent ${time} listening to your music`,
  nbArtists: (nb: number) => `You have ${nb} artist${nb < 2 ? '' : 's'}`,
  nbAlbums: (nb: number) => `You have ${nb} album${nb < 2 ? '' : 's'}`,
  days: (nb: number) => (nb < 2 ? ' day' : ' days'),
  hours: (nb: number) => (nb < 2 ? ' hour' : ' hours'),
  minutes: (nb: number) => (nb < 2 ? ' minute' : ' minutes'),
  noLocalStorage: 'Local storage usage is disabled',
};
