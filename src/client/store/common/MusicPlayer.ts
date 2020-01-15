import { observable, reaction, action, computed } from 'mobx';
import IMusic from '../../../shared/IMusic';

class MusicPlayer {
  @observable public isPlaying: boolean = false;
  @observable private musicPlayingIndex: number = 0;
  @observable private currentPlaylist: Array<IMusic> = [];
  @observable private isOrderRandom: boolean = false;
  @observable public audio: HTMLAudioElement | null = null;
  @observable public timePlayed: number = 0;

  @action setCurrentPlaylist = (playlist: Array<IMusic>): void => {
    this.currentPlaylist = playlist;
  };

  @action setMusicReady = (): void => {
    if (this.currentPlaylist.length <= 0) return;

    const path = this.currentPlaylist[this.musicPlayingIndex].path.replace('/home/souki/projects/Louki/', '');
    this.audio = new Audio(path);

    this.audio.ontimeupdate = () => {
      this.timePlayed = this.audio.currentTime;
    };

    this.isPlaying = true;
    this.audio.play();
    this.audio.onended = () => {
      this.nextSong();
    };
  };

  @action playMusic = (index: number): void => {
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
    else if (this.isOrderRandom) this.playRandomMusic();
    else {
      this.musicPlayingIndex++;
      if (this.musicPlayingIndex == this.currentPlaylist.length) this.musicPlayingIndex = 0;
      this.playMusic(this.musicPlayingIndex);
    }
  };

  @action public prevSong = (): void => {
    if (this.audio == null) return;
    else if (this.audio.currentTime > 5) this.audio.currentTime = 0;
    else if (this.isOrderRandom) this.playRandomMusic();
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

  @action public changeRandom = () => {
    this.isOrderRandom = !this.isOrderRandom;
  };

  @computed get playing(): boolean {
    return this.isPlaying;
  }

  @computed get duration(): number {
    if (this.currentPlaylist.length == 0) return 0;
    return this.currentPlaylist[this.musicPlayingIndex].duration;
  }

  @computed get currentMusicName(): string {
    if (this.currentPlaylist.length == 0) return 'No song playing';
    return this.currentPlaylist[this.musicPlayingIndex].title;
  }

  @computed get currentArtist(): string {
    if (this.currentPlaylist.length == 0) return '';
    return this.currentPlaylist[this.musicPlayingIndex].artist;
  }

  @computed get random(): boolean {
    return this.isOrderRandom;
  }
}

export default new MusicPlayer();
