import { computed } from 'mobx';

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
  return seconds == 0
    ? "You didn't listen to any music yet."
    : `You spent ${secondsToDhms(seconds)} listening to your music`;
};

const recentlyAdded = (type: string): string => {
  return `Recently added ${type} :`;
};

const numberOfSongs = (nb: number) => {
  const s = nb < 2 ? '' : 's';
  return `There are ${nb} music${s} in this playlist.`;
};

const numberOfArtists = (nb: number) => {
  return `You have ${nb} artists`;
};

const numberOfAlbums = (nb: number) => {
  return `You have ${nb} albums`;
};

const statistics: Array<(arg: any) => string> = [
  timeSpentListening,
  nbTimesCustomPlaylist,
  recentlyAdded,
  numberOfSongs,
  numberOfArtists,
  numberOfAlbums,
];

const secondsToDhms = (seconds: number) => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

export const getStat = (stat: Stats, arg?: any): string => {
  return statistics[stat](arg);
};

export const addSecondsOfPlaying = (seconds: number) => {
  const secondsBefore: number = Number(localStorage.getItem('time_listening_music')) || 0;
  localStorage.setItem('time_listening_music', String(Number(secondsBefore) + seconds));
};
