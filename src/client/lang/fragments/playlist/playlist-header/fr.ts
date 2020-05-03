export default {
  play: 'Démarrer',
  continue: 'Reprendre',
  pause: 'Pause',
  nbMusics(nb: number): string {
    const s = nb < 2 ? '' : 's';
    return `Vous avez ${nb} musique${s} dans cette playlist`;
  },
  hardcodedStat: 'Vous avez passé 5 jours 12 heures et 6 minutes à écouter votre musique',
};
