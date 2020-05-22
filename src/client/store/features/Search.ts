import { observable, action, computed } from 'mobx';
import { Search as SearchRequest, MusicSearchResponse } from '../../requests/Playlists';

class Search {
  @observable private searchText: string = '';
  @observable private change: boolean = false;
  @observable private results: Array<string> = [];

  @computed get search(): string {
    return this.searchText;
  }

  @computed get searchResults(): Array<string> {
    return this.results;
  }

  @computed get hasChanged(): boolean {
    return this.change;
  }

  @action setSearch = (searchText: string) => {
    this.change = true;
    this.searchText = searchText;
  };

  @action startSearch = (musics: Array<string>) => {
    this.change = false;
    SearchRequest(musics, this.searchText).then((response: MusicSearchResponse) => {
      this.results = response.data;
    });
  };
}

export default new Search();
