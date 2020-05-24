import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';

import Bookmarks from '../../../store/data/Bookmarks';
import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';
import Notifications, { NotificationType } from '../../../store/features/Notifications';

import texts from '../../../lang/pages/favorites';
import optionsTexts from '../../../lang/options';
import notifsTexts from '../../../lang/notifications';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

@observer
class Favorites extends React.Component<WithStyles, NoState> {
  handleRemoveBookmark = (id: string) => {
    const musicName = LoukiStore.idToMusic(id).title;
    const T = notifsTexts.current;

    Bookmarks.deleteBookmark(id);
    Notifications.addNotification(T.removedBookmark(musicName), NotificationType.SUCCESS);
  };

  handleEditMusic = () => {
    Notifications.addNotification(notifsTexts.current.notDeveloped, NotificationType.INFO);
  };

  options = (id: string): Array<JSX.Element> => {
    const T = optionsTexts.current;
    return [
      <PlaylistOptionsItem
        key={0}
        title={T.removeBookmark}
        handleClick={() => {
          this.handleRemoveBookmark(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title={T.edit} handleClick={this.handleEditMusic} />,
    ];
  };

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
        <PlaylistBody
          playlist={Bookmarks.bookmarks}
          emptySettings={{
            ...T.emptyTexts,
            redirectRoute: '/all-musics',
          }}
          options={this.options}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Favorites);
