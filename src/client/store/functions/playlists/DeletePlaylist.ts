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
  });
};
