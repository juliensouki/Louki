import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';

import Bookmarks from '../../../store/data/Bookmarks';
import { Stats } from '../../../store/statistics/Stats';

import texts from '../../../lang/pages/favorites';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

@observer
class Favorites extends React.Component<WithStyles, NoState> {
  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <div className={classes.root}>
        <PlaylistHeader
          {...T.playlistHeader}
          playlist={Bookmarks.bookmarks}
          image='/assets/images/favorites.png'
          stat={Stats.TIME_SPENT_LISTENING}
        />
        <SearchContainer />
        <PlaylistBody playlist={Bookmarks.bookmarks} favorites />
      </div>
    );
  }
}

export default withStyles(styles)(Favorites);
