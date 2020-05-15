import { observable, action, computed } from 'mobx';

class Navigation {
  @observable prevRoute: string = '';
  @observable route: string = '';

  @computed get previousRoute(): string {
    return this.prevRoute != '' ? this.prevRoute : '/all-musics';
  }

  @action setPreviousRoute = (prevRoute: string) => {
    this.prevRoute = prevRoute;
  };

  @computed get currentRoute(): string {
    return this.route;
  }

  @action setCurrentRoute = (route: string) => {
    this.route = route;
  };
}

export default new Navigation();
