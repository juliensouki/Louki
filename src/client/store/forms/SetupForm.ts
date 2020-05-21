import { observable, action, computed } from 'mobx';
import { SetupLouki } from '../../requests/Users';

class SetupForm {
  @observable pseudo: string = '';
  @observable image: File | null = null;
  @observable acceptLocalStorage: boolean = false;
  @observable form: HTMLFormElement | null = null;

  @computed get username(): string {
    return this.pseudo;
  }

  @computed get checkbox(): boolean {
    return this.acceptLocalStorage;
  }

  @action changeCheckbox = () => {
    this.acceptLocalStorage = !this.acceptLocalStorage;
  };

  @action setUsername = (pseudo: string) => {
    this.pseudo = pseudo;
  };

  @action setPicture = (file: File) => {
    this.image = file;
  };

  @action setForm = (form: HTMLFormElement) => {
    this.form = form;
  };

  submit = (): Promise<Response> => {
    const data = new FormData(this.form != null ? this.form : undefined);
    data.append('username', this.pseudo);
    data.append('profile-picture', this.image);
    return SetupLouki(data);
  };

  @action init = (): void => {
    this.pseudo = '';
    this.image = null;
    this.acceptLocalStorage = false;
    this.form = null;
  };

  @computed get pictureName(): string {
    return this.image == null ? 'No picture seleted.' : this.image.name;
  }
}

export default new SetupForm();
