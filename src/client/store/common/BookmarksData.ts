import { observable, action, computed } from 'mobx';
import IMusic from '../../../shared/IMusic';
import MusicsData from './MusicsData';

class BookmarksData {
  @observable bkmarks: Array<IMusic> = [];

  @action setBookmarks = (bkmarks: Array<IMusic>) => {
    this.bkmarks = bkmarks;
  };

  @action addBookmark = (musicId: string) => {
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

  @action deleteBookmark = (musicId: string) => {
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

  @computed get bookmarks(): Array<IMusic> {
    return this.bkmarks;
  }
}

export default new BookmarksData();
