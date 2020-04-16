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

export const UpdateUserSettings = async (settings: AccountSettings): Promise<any> => {
  return fetch('/updateUserSettings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: UserData.id,
      settings: settings,
    }),
  });
};
