export default function(musicId: string) {
  fetch('/addBookmark', {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musicId: musicId,
    }),
  });
}
