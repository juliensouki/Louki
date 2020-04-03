import UserData from '../store/common/UserData';
import LoadingForm from '../store/loading/LoadingForm';

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
