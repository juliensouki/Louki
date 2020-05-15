import Bookmarks from '../store/data/Bookmarks';
import LoukiStore from '../store/data/LoukiStore';
import Loading from '../store/loading/Loading';
import * as Responses from '../../shared/RoutesResponses';

export type AddBookmarkResponse = Responses.AddBookmarkResponse;
export type RemoveBookmarkResponse = Responses.RemoveBookmarkResponse;

export const LoadBookmarks = async () => {
  fetch(`/api/v1/list-bookmarks`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      Bookmarks.setBookmarks(LoukiStore.idsToMusics(data));
      Loading.bookmarksHaveLoaded();
    });
};

export const RemoveBookmark = (musicId: string): Promise<RemoveBookmarkResponse> => {
  return fetch(`/api/v1/remove-bookmark`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musicId: musicId,
    }),
  }).then(res => {
    return res.json();
  });
};

export const AddBookmark = (musicId: string): Promise<AddBookmarkResponse> => {
  return fetch(`/api/v1/add-bookmark/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musicId: musicId,
    }),
  }).then(res => {
    return res.json();
  });
};
