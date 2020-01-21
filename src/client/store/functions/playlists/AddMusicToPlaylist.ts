export default function(playlistId: string, musicId: string) {
  fetch('/addMusicToPlaylist', {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playlistId: playlistId,
      musicId: musicId,
    }),
  });
};
