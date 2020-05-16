import { observable, action, computed } from 'mobx';
import { Music } from '../../../shared/LoukiTypes';
import LoukiStore from './LoukiStore';
import { RemoveBookmarkResponse, RemoveBookmark, AddBookmarkResponse, AddBookmark } from '../../requests/Bookmarks';

class Bookmarks {
  @observable bkmarks: Array<Music> = [];

  @action setBookmarks = (bkmarks: Array<Music>): void => {
    this.bkmarks = bkmarks;
  };

  @action addBookmark = (musicId: string): void => {
    AddBookmark(musicId).then((response: AddBookmarkResponse) => {
      this.bkmarks = LoukiStore.idsToMusics(response);
    });
  };

  @action deleteBookmark = (musicId: string): void => {
    RemoveBookmark(musicId).then((response: RemoveBookmarkResponse) => {
      this.bkmarks = LoukiStore.idsToMusics(response);
    });
  };

  isInBookmarks = (id: string): boolean => {
    for (let i = 0; i < this.bkmarks.length; i++) {
      if (this.bkmarks[i].__id == id) return true;
    }
    return false;
  };

  @computed get bookmarks(): Array<Music> {
    return this.bkmarks;
  }
}

export default new Bookmarks();
