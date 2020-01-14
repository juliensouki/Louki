import { observable, reaction, action, computed } from 'mobx';
import IMusic from '../../../shared/IMusic';

class MusicPlayer {
  @observable public isPlaying: boolean = false;
  @observable private musicPlayingIndex: number = 0;
  @observable private currentPlaylist: Array<IMusic> = [];
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
      console.log('Song ended');
    };
  };

  @action playMusic = (index: number): void => {
    if (this.audio != null) this.audio.pause();
    this.musicPlayingIndex = index;
    this.setMusicReady();
  };

  @action pauseOrPlay = (): void => {
    if (this.audio == null) return;
    if (this.isPlaying == true) this.audio.pause();
    else this.audio.play();
    this.isPlaying = !this.isPlaying;
  };

  @action nextSong = (): void => {
    if (this.audio == null) return;
    this.musicPlayingIndex++;
    if (this.musicPlayingIndex == this.currentPlaylist.length) this.musicPlayingIndex = 0;
    this.playMusic(this.musicPlayingIndex);
  };

  @action prevSong = (): void => {
    if (this.audio == null) return;
    this.musicPlayingIndex--;
    if (this.musicPlayingIndex < 0) this.musicPlayingIndex = this.currentPlaylist.length - 1;
    this.playMusic(this.musicPlayingIndex);
  };

  @computed get playing(): boolean {
    return this.isPlaying;
  }

  @computed get duration(): number {
    if (this.currentPlaylist.length == 0) return 0;
    return this.currentPlaylist[this.musicPlayingIndex].duration;
  }
}

export default new MusicPlayer();
