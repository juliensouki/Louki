import texts from '../../lang/statistics';
import User from '../data/User';

export enum Stats {
  TIME_SPENT_LISTENING = 0,
  NUMBER_OF_ARTISTS = 1,
  NUMBER_OF_ALBUMS = 2,
}

const timeSpentListening = (): string => {
  if (User.settings.localStorageUsage) {
    const seconds: number = Number(localStorage.getItem('time_listening_music')) || 0;
    return seconds < 60 ? texts.current.noListen : texts.current.listened(secondsToDhms(seconds));
  }
  return texts.current.noLocalStorage;
};

const numberOfArtists = (nb: number): string => {
  return texts.current.nbArtists(nb);
};

const numberOfAlbums = (nb: number): string => {
  return texts.current.nbAlbums(nb);
};

const statistics: Array<(arg: any) => string> = [timeSpentListening, numberOfArtists, numberOfAlbums];

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
  if (User.settings.localStorageUsage) {
    const secondsBefore: number = Number(localStorage.getItem('time_listening_music')) || 0;
    localStorage.setItem('time_listening_music', String(Number(secondsBefore) + seconds));
  }
};
