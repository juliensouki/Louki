import { observable, action, computed } from 'mobx';
import IMusic from '../../../shared/IMusic';
import MusicsData from './MusicsData';

class BookmarksData {
  @observable bkmarks: Array<IMusic> = [];

  @action setBookmarks = (bkmarks: Array<IMusic>): void => {
    this.bkmarks = bkmarks;
  };

  @action addBookmark = (musicId: string): void => {
    fetch('/addBookmark', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        musicId: musicId,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.bkmarks = MusicsData.idsToMusics(data);
      });
  };

  @action deleteBookmark = (musicId: string): void => {
    fetch('/removeBookmark', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        musicId: musicId,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.bkmarks = MusicsData.idsToMusics(data);
        console.log(this.bkmarks);
      });
  };

  isInBookmarks = (id: string): boolean => {
    for (let i = 0; i < this.bkmarks.length; i++) {
      if (this.bkmarks[i].__id == id) return true;
    }
    return false;
  };

  @computed get bookmarks(): Array<IMusic> {
    return this.bkmarks;
  }
}

export default new BookmarksData();
