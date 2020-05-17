import * as React from 'react';
import { observer } from 'mobx-react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';

import Bookmarks from '../../../store/data/Bookmarks';
import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';

import texts from '../../../lang/pages/favorites';
import emptyTexts from '../../../lang/fragments/playlist/playlist-body';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

@observer
class Favorites extends React.Component<WithStyles & WithSnackbarProps, NoState> {
  handleRemoveBookmark = (id: string) => {
    const snackbarOptions = { variant: 'success' as any };
    const musicName = LoukiStore.idToMusic(id).title;
    this.props.enqueueSnackbar(`Removed ${musicName} from favorites`, snackbarOptions);
    Bookmarks.deleteBookmark(id);
  };

  handleEditMusic = () => {
    const snackbarOptions = { variant: 'info' as any };
    this.props.enqueueSnackbar('This feature has not been developed yet.', snackbarOptions);
  };

  desktopPlaylistOptions = (id: string): Array<JSX.Element> => {
    return [
      <PlaylistOptionsItem
        key={0}
        title='Remove bookmark'
        handleClick={() => {
          this.handleRemoveBookmark(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title='Edit music' handleClick={this.handleEditMusic} />,
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
            ...emptyTexts.current.custom,
            redirectRoute: '/all-musics',
          }}
          desktopPlaylistOptions={this.desktopPlaylistOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(Favorites));
