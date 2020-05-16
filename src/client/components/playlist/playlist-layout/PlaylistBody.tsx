import * as React from 'react';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

import SearchForm from '../../../store/features/Search';
import Music from '../../../../shared/Music';
import texts from '../../../lang/fragments/playlist/playlist-body';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 'calc(100% - 4em)',
      padding: '2em',
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 240px)',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  playlist: Array<Music>;
  canAddToFavorites?: boolean;
  favorites?: boolean;
  customPlaylist?: boolean;
  allSongs?: boolean;
}

@observer
class PlaylistBody extends React.Component<Props, NoState> {
  componentDidUpdate() {
    if (SearchForm.hasChanged) {
      const ids = [];
      this.props.playlist.forEach(music => {
        ids.push(music.__id);
      });
      SearchForm.startSearch(ids);
    }
  }

  @computed get emptyPlaylistText(): string {
    const T = texts.current;

    if (this.props.allSongs) {
      return T.allMusics.emptyText;
    } else if (this.props.favorites) {
      return T.favorites.emptyText;
    }
    return T.custom.emptyText;
  }

  @computed get emptyPlaylistButtonText(): string {
    const T = texts.current;

    if (this.props.allSongs) {
      return T.allMusics.emptyButton;
    } else if (this.props.favorites) {
      return T.favorites.emptyButton;
    }
    return T.custom.emptyButton;
  }

  @computed get emptyPlaylistRedirectRoute(): string {
    if (this.props.allSongs) {
      return '/settings';
    } else if (this.props.favorites) {
      return '/all-music';
    }
    return '/all-music';
  }

  render() {
    const { classes, playlist, favorites, customPlaylist, canAddToFavorites, allSongs } = this.props;

    return (
      <div className={classes.root}>
        <ResponsiveAdapter
          mobile={<PlaylistBodyMobile playlist={playlist} />}
          desktop={
            <PlaylistBodyDesktop
              allSongs={allSongs}
              searchResults={SearchForm.search == '' ? null : SearchForm.searchResults}
              favorites={favorites}
              playlist={playlist}
              customPlaylist={customPlaylist}
              canAddToFavorites={canAddToFavorites}
              emptyPlaylistText={this.emptyPlaylistText}
              emptyPlaylistButtonText={this.emptyPlaylistButtonText}
              emptyPlaylistRedirectRoute={this.emptyPlaylistRedirectRoute}
            />
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBody);
