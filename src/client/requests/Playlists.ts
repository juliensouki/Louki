import LoukiStore from '../store/data/LoukiStore';
import Loading from '../store/loading/Loading';
import {
  UpdatePlaylist as UpdatePlaylistType,
  GetPlaylist as GetPlaylistType,
  RemoveMusic,
  MusicSearch,
  CreatePlaylist as CreatePlaylistType,
  DeletePlaylist as DeletePlaylistType,
  APIResponse,
  buildResponse,
} from '../../shared/RoutesResponses';

export type UpdatePlaylistResponse = APIResponse<UpdatePlaylistType>;
export type GetPlaylistResponse = APIResponse<GetPlaylistType>;
export type RemoveMusicResponse = APIResponse<RemoveMusic>;
export type MusicSearchResponse = APIResponse<MusicSearch>;
export type CreatePlaylistResponse = APIResponse<CreatePlaylistType>;
export type DeletePlaylistResponse = APIResponse<DeletePlaylistType>;
export type AddMusicResponse = APIResponse<{}>;

export const LoadPlaylists = async (): Promise<void> => {
  fetch(`/api/v1/list-playlists`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      LoukiStore.setPlaylists(data);
      Loading.playlistsHaveLoaded();
    });
};

export const UpdatePlaylist = async (
  playlistId: string,
  playlistName: string,
  playlistDescription: string,
): Promise<UpdatePlaylistResponse> => {
  return fetch(`/api/v1/playlist/${playlistId}/update-playlist`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playlistName: playlistName,
      playlistDescription: playlistDescription,
    }),
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const RemoveMusicFromPlaylist = async (musicId: string, playlistId: string): Promise<RemoveMusicResponse> => {
  return fetch(`/api/v1/playlist/${playlistId}/remove-music`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musicId: musicId,
    }),
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const Search = async (musics: Array<string>, searchText: string): Promise<MusicSearchResponse> => {
  return fetch(`/api/v1/search-music`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musics: musics,
      searchText: searchText,
    }),
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const CreatePlaylist = async (form: FormData): Promise<CreatePlaylistResponse> => {
  return fetch(`/api/v1/create-playlist`, {
    method: 'POST',
    body: form,
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const AddMusic = (playlistId: string, musicId: string): Promise<AddMusicResponse> => {
  return fetch(`/api/v1/playlist/${playlistId}/add-music`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musicId: musicId,
    }),
  }).then(res => {
    return buildResponse(res.status, {});
  });
};

export const DeletePlaylist = (playlistId: string): Promise<DeletePlaylistResponse> => {
  return fetch(`/api/v1/playlist/${playlistId}/delete-playlist`, {
    method: 'POST',
  }).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};

export const GetPlaylist = async (playlistId: string): Promise<GetPlaylistResponse> => {
  return fetch(`/api/v1/playlist/${playlistId}`).then(async res => {
    return buildResponse(res.status, await res.json());
  });
};
