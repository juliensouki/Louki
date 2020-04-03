import MusicsData from '../../common/MusicsData';

export default function(playlistId: string) {
  fetch('/deletePlaylist', {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playlistId: playlistId,
    }),
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      MusicsData.setPlaylists(data);
    });
}
