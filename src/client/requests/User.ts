import UserData from '../store/common/UserData';
import LoadingForm from '../store/loading/LoadingForm';
import { AccountSettings } from '../../shared/IUser';

export const LoadUser = async () => {
  fetch('/currentUser')
    .then(res => {
      return res.json();
    })
    .then(data => {
      UserData.setUser(data);
      LoadingForm.userHasLoaded();
    });
};

export const UpdateUserSettings = async (
  form: HTMLFormElement,
  settings: AccountSettings,
  id: string,
): Promise<any> => {
  const data = new FormData(form as HTMLFormElement);

  data.append('settings', JSON.stringify(settings));
  data.append('id', id);

  return fetch('/updateUserSettings', {
    method: 'POST',
    body: data,
  });
};
