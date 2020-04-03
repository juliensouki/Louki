import { observable, action, computed } from 'mobx';
import NavigationForm from '../../store/common/NavigationForm';
import IMusic from '../../../shared/IMusic';

export enum MusicLoop {
  NO_REPEAT = 0,
  REPEAT_ALL = 1,
  REPEAT_ONE = 2,
}

class MusicPlayer {
  @observable public isPlaying: boolean = false;
  @observable private musicPlayingIndex: number = 0;
  @observable private currentPlaylist: Array<IMusic> = [];
  @observable private repeatMode: MusicLoop = MusicLoop.NO_REPEAT;
  @observable private isOrderRandom: boolean = false;
  @observable public audio: HTMLAudioElement | null = null;
  @observable private timePlayedInSec: number = 0;
  @observable private audioLevel: number = 100;
  @observable private isMute: boolean = false;
  @observable private route: string = '';

  @action muteUnMute = () => {
    this.isMute = !this.isMute;
    if (this.isMute == true && this.audio != null) {
      this.audio.volume = 0;
    } else if (this.isMute == false && this.audio != null) {
      this.audio.volume = this.audioLevel / 100;
    }
  };

  @action setAudioLevel = (level: number) => {
    this.audioLevel = level;
    if (this.audio != null) {
      this.isMute = false;
      this.audio.volume = this.audioLevel / 100;
    }
  };

  @action setCurrentPlaylist = (playlist: Array<IMusic>): void => {
    this.currentPlaylist = playlist;
  };

  @action setMusicReady = (): void => {
    if (this.currentPlaylist.length <= 0) return;

    const path = this.currentPlaylist[this.musicPlayingIndex].path.replace('/home/souki/projects/Louki/', '/');
    this.audio = new Audio(path);

    this.audio.volume = this.isMute == false ? this.audioLevel / 100 : 0;
    this.audio.crossOrigin = 'anonymous';

    this.audio.ontimeupdate = () => {
      this.timePlayedInSec = this.audio.currentTime;
    };

    this.isPlaying = true;
    this.audio.play();
    this.audio.onended = () => {
      if (this.repeatMode == MusicLoop.REPEAT_ONE) this.playMusic(this.musicPlayingIndex);
      else if (this.isOrderRandom) this.playRandomMusic();
      else if (this.musicPlayingIndex == this.currentPlaylist.length - 1) {
        if (this.repeatMode == MusicLoop.NO_REPEAT) {
          this.audio = null;
          return;
        } else if (this.repeatMode == MusicLoop.REPEAT_ALL) this.musicPlayingIndex = 0;
        this.playMusic(this.musicPlayingIndex);
      } else this.nextSong();
    };
  };

  @action playMusic = (index: number): void => {
    this.route = NavigationForm.currentRoute;
    if (this.audio != null) this.audio.pause();
    this.musicPlayingIndex = index;
    this.setMusicReady();
  };

  @action public pauseOrPlay = (): void => {
    if (this.audio == null) return;
    if (this.isPlaying == true) this.audio.pause();
    else this.audio.play();
    this.isPlaying = !this.isPlaying;
  };

  @action public nextSong = (): void => {
    if (this.audio == null) return;
    else if (this.isOrderRandom) {
      this.playRandomMusic();
      return;
    }
    this.musicPlayingIndex++;
    if (this.musicPlayingIndex == this.currentPlaylist.length) this.musicPlayingIndex = 0;
    this.playMusic(this.musicPlayingIndex);
  };

  @action public prevSong = (): void => {
    if (this.audio == null) return;
    else if (this.isOrderRandom) {
      this.playRandomMusic();
      return;
    } else if (this.audio.currentTime > 5) this.audio.currentTime = 0;
    else {
      this.musicPlayingIndex--;
      if (this.musicPlayingIndex < 0) this.musicPlayingIndex = this.currentPlaylist.length - 1;
      this.playMusic(this.musicPlayingIndex);
    }
  };

  @action playRandomMusic = () => {
    let newIndex;
    const max = this.currentPlaylist.length - 1;
    const min = 0;
    while ((newIndex = Math.floor(Math.random() * (max - min + 1)) + min) == this.musicPlayingIndex);
    this.musicPlayingIndex = newIndex;
    this.playMusic(this.musicPlayingIndex);
  };

  @action public changeTime = (timeInPercentage: number) => {
    if (this.audio == null) return;
    const newTimeInSec = (this.duration / 100) * timeInPercentage;
    this.audio.currentTime = newTimeInSec;
  };

  @action public changeRepeatMode = () => {
    switch (this.repeatMode) {
      case MusicLoop.NO_REPEAT:
        this.repeatMode = MusicLoop.REPEAT_ALL;
        break;
      case MusicLoop.REPEAT_ALL:
        this.repeatMode = MusicLoop.REPEAT_ONE;
        break;
      case MusicLoop.REPEAT_ONE:
        this.repeatMode = MusicLoop.NO_REPEAT;
        break;
      default:
        this.repeatMode = MusicLoop.NO_REPEAT;
    }
  };

  @action public changeRandom = () => {
    this.isOrderRandom = !this.isOrderRandom;
  };

  @computed get volume(): number {
    return this.audioLevel;
  }

  @computed get playing(): boolean {
    return this.isPlaying;
  }

  @computed get duration(): number {
    if (this.currentPlaylist.length == 0 || this.audio == null) return 0;
    return this.currentPlaylist[this.musicPlayingIndex].duration;
  }

  @computed get currentMusicName(): string {
    if (this.currentPlaylist.length == 0 || this.audio == null) return 'No song playing';
    return this.currentPlaylist[this.musicPlayingIndex].title;
  }

  @computed get currentArtist(): string {
    if (this.currentPlaylist.length == 0 || this.audio == null) return '';
    return this.currentPlaylist[this.musicPlayingIndex].artist;
  }

  @computed get random(): boolean {
    return this.isOrderRandom;
  }

  @computed get repeat(): MusicLoop {
    return this.repeatMode;
  }

  @computed get timePlayed(): number {
    if (this.currentPlaylist.length == 0 || this.audio == null) return 0;
    return this.timePlayedInSec;
  }

  @computed get mute(): boolean {
    return this.isMute;
  }

  @computed get playingMusicId(): string {
    if (this.currentPlaylist.length == 0) return '';
    return this.currentPlaylist[this.musicPlayingIndex].__id;
  }

  @computed get playlistRoute(): string {
    return this.route;
  }
}

export default new MusicPlayer();
