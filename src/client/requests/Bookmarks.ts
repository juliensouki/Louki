import BookmarksData from '../store/common/BookmarksData';
import MusicsData from '../store/common/MusicsData';
import LoadingForm from '../store/loading/LoadingForm';

export const LoadBookmarks = async () => {
  fetch('/bookmarks')
    .then(res => {
      return res.json();
    })
    .then(data => {
      BookmarksData.setBookmarks(MusicsData.idsToMusics(data));
      LoadingForm.bookmarksHaveLoaded();
    });
};
