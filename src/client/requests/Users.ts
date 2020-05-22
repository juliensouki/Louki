import User from '../store/data/User';
import Loading from '../store/loading/Loading';
import { AccountSettings } from '../../shared/LoukiTypes';
import {
  AddFolder as AddFolderType,
  RemoveFolder as RemoveFolderType,
  TestSetup,
  UpdateSettings,
  buildResponse,
  APIResponse,
} from '../../shared/RoutesResponses';

export type AddFolderResponse = APIResponse<AddFolderType>;
export type RemoveFolderResponse = APIResponse<RemoveFolderType>;
export type TestSetupResponse = TestSetup;
export type UpdateSettingsResponse = UpdateSettings;

export const LoadUser = async () => {
  fetch(`/api/v1/current-user`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      User.setUser(data);
      Loading.userHasLoaded();
    });
};

export const UpdateUserSettings = async (
  form: HTMLFormElement,
  settings: AccountSettings,
  id: string,
): Promise<UpdateSettingsResponse> => {
  const data = new FormData(form as HTMLFormElement);
  data.append('settings', JSON.stringify(settings));

  return fetch(`/api/v1/update-user-settings`, {
    method: 'POST',
    body: data,
  }).then(res => {
    return res.json();
  });
};

export const IsLoukiSetup = (): Promise<TestSetupResponse> => {
  return fetch(`/api/v1/already-setup`).then(res => {
    return res.json();
  });
};

export const SetupLouki = (form: FormData): Promise<Response> => {
  return fetch(`/api/v1/setup-louki`, {
    method: 'POST',
    body: form,
  });
};

export const ResetLouki = (): Promise<number> => {
  return fetch(`/api/v1/reset-louki`, { method: 'POST' }).then(res => {
    return res.status;
  });
};

export const AddFolder = (folderToAdd: string): Promise<AddFolderResponse> => {
  return fetch(`/api/v1/add-folder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      folder: folderToAdd,
    }),
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const RemoveFolder = (folderToRemove: string): Promise<RemoveFolderResponse> => {
  return fetch(`/api/v1/remove-folder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      folder: folderToRemove,
    }),
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};
