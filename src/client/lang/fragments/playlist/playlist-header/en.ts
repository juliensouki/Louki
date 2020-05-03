export default {
  play: 'Play',
  continue: 'Continue',
  pause: 'Pause',
  nbMusics(nb: number): string {
    const s = nb < 2 ? '' : 's';
    return `You have ${nb} music${s} in this playlist`;
  },
  hardcodedStat: 'You spent 5 days 12 hours and 6 minutes listening to your music',
};
