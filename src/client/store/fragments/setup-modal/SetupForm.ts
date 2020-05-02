import { observable, action, computed } from 'mobx';

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

  submit = (): Promise<any> => {
    const data = new FormData(this.form != null ? this.form : undefined);
    data.append('username', this.pseudo);
    data.append('profile-picture', this.image);

    console.log('Sending');

    return fetch('/setupLouki', {
      method: 'POST',
      body: data,
    });
  };

  @computed get pictureName(): string {
    return this.image == null ? 'No picture seleted.' : this.image.name;
  }
}

export default new SetupForm();
