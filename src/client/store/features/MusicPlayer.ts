import { observable, action, computed, observe } from 'mobx';
import Navigation from '../navigation/Navigation';
import { addSecondsOfPlaying } from '../statistics/Stats';
import LoukiStore from '../data/LoukiStore';
import { Music } from '../../../shared/LoukiTypes';
import texts from '../../lang/layout/music-bar';

export enum MusicLoop {
  NO_REPEAT = 0,
  REPEAT_ALL = 1,
  REPEAT_ONE = 2,
}

class MusicPlayer {
  @observable public isPlaying: boolean = false;
  @observable private musicPlayingIndex: number = 0;
  @observable private currentPlaylist: Array<Music> = [];
  @observable private repeatMode: MusicLoop = MusicLoop.NO_REPEAT;
  @observable private musicPlaying: Music | null = null;
  @observable private isOrderRandom: boolean = false;
  @observable public audio: HTMLAudioElement | null = null;
  @observable private timePlayedInSec: number = 0;
  @observable private audioLevel: number = 100;
  @observable private isMute: boolean = false;
  @observable private route: string = '';
  @observable private image: string | null = null;
  @observable private timeStart: Date | null;

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

  @action setCurrentPlaylist = (playlist: Array<Music>): void => {
    this.currentPlaylist = playlist;
  };

  @action checkIfPlayingMusicStillExists = () => {
    if (this.musicPlaying == null) return;
    if (!LoukiStore.allMusics.includes(this.musicPlaying)) {
      this.musicPlaying = null;
      if (!this.audio.paused) {
        this.audio.pause();
        this.image = null;
        this.currentPlaylist = [];
        this.isPlaying = false;
      }
    }
  };

  @action setMusicReady = (): void => {
    if (this.currentPlaylist.length <= 0) return;

    this.musicPlaying = this.currentPlaylist[this.musicPlayingIndex];
    this.audio = new Audio(`/api/v1/music/${this.musicPlaying.__id}`);

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
          this.isPlaying = false;
          this.calculateTimePlaying();
          this.timeStart = null;
          return;
        } else if (this.repeatMode == MusicLoop.REPEAT_ALL) this.musicPlayingIndex = 0;
        this.playMusic(this.musicPlayingIndex);
      } else this.nextSong();
    };
  };

  @action playMusic = (index: number): void => {
    this.calculateTimePlaying();
    this.timeStart = new Date();
    this.route = Navigation.currentRoute;
    if (this.audio != null) this.audio.pause();
    this.musicPlayingIndex = index;
    this.setMusicReady();
  };

  @action public pauseOrPlay = (): void => {
    if (this.audio == null) return;
    if (this.isPlaying == true) {
      this.calculateTimePlaying();
      this.timeStart = null;
      this.audio.pause();
    } else {
      this.timeStart = new Date();
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  };

  @action calculateTimePlaying = () => {
    if (this.timeStart != null) {
      const endDate = new Date();
      const duration = (+endDate - +this.timeStart) / 1000;
      addSecondsOfPlaying(duration);
    }
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

  @action setPreviewImage = (image: string | null) => {
    this.image = image;
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
    if (this.currentPlaylist.length == 0 || this.audio == null) return texts.current.noSong;
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

  @computed get canPlayPlaylist(): boolean {
    return true;
  }

  @computed get previewImage(): string {
    return this.image || '/assets/images/all-musics.png';
  }
}

export default new MusicPlayer();
