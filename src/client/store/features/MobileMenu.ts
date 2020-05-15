import { observable, computed, action } from 'mobx';

class MobileMenu {
  @observable private open: boolean = false;
  @action setOpen = (value: boolean): void => {
    this.open = value;
  };

  @computed get isOpen(): boolean {
    return this.open;
  }
}

export default new MobileMenu();
