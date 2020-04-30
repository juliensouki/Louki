import { observable, action, computed } from 'mobx';

class SearchForm {
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
    fetch('/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        musics: musics,
        searchText: this.searchText,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.results = data;
        console.log(data);
      });
  };
}

export default new SearchForm();
