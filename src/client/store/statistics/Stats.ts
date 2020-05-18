import texts from '../../lang/statistics';

export enum Stats {
  TIME_SPENT_LISTENING = 0,
  NB_TIMES_CUSTOM_PLAYLIST = 1,
  RECENTLY_ADDED = 2,
  NUMBER_OF_SONGS = 3,
  NUMBER_OF_ARTISTS = 4,
  NUMBER_OF_ALBUMS = 5,
}

const nbTimesCustomPlaylist = (playlist: string): string => {
  return `Number times listening to ${playlist}`;
};

const timeSpentListening = (): string => {
  const seconds: number = Number(localStorage.getItem('time_listening_music')) || 0;
  return seconds < 60 ? texts.current.noListen : texts.current.listened(secondsToDhms(seconds));
};

const recentlyAdded = (type: string): string => {
  return `Recently added ${type} :`;
};

const numberOfSongs = (nb: number) => {
  const s = nb < 2 ? '' : 's';
  return `There are ${nb} music${s} in this playlist.`; // translate later
};

const numberOfArtists = (nb: number) => {
  return texts.current.nbArtists(nb); //You have ${nb} artists
};

const numberOfAlbums = (nb: number) => {
  return texts.current.nbAlbums(nb); //You have ${nb} albums
};

const statistics: Array<(arg: any) => string> = [
  timeSpentListening,
  nbTimesCustomPlaylist,
  recentlyAdded,
  numberOfSongs,
  numberOfArtists,
  numberOfAlbums,
];

const secondsToDhms = (seconds: number): string => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const dDisplay = d > 0 ? d + texts.current.days(d) : '';
  const hDisplay = h > 0 ? h + texts.current.hours(h) : '';
  const mDisplay = m > 0 ? m + texts.current.minutes(m) : '';
  return dDisplay + hDisplay + mDisplay;
};

export const getStat = (stat: Stats, arg?: any): string => {
  return statistics[stat](arg);
};

export const addSecondsOfPlaying = (seconds: number) => {
  const secondsBefore: number = Number(localStorage.getItem('time_listening_music')) || 0;
  localStorage.setItem('time_listening_music', String(Number(secondsBefore) + seconds));
};
