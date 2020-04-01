import { observable, action, computed } from 'mobx';

class NavigationForm {
  @observable prevRoute: string = '';

  @computed get previousRoute(): string {
    return this.prevRoute != '' ? this.prevRoute : '/all-musics';
  }

  @action setPreviousRoute = (prevRoute: string) => {
    this.prevRoute = prevRoute;
  };
}

export default new NavigationForm();
