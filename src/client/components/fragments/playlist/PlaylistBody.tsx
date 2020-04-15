import * as React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

import IMusic from '../../../../shared/IMusic';

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

interface IProps extends WithStyles<typeof styles> {
  playlist: Array<IMusic>;
  canAddToFavorites?: boolean;
  favorites?: boolean;
  customPlaylist?: boolean;
  allSongs?: boolean;
}

@observer
class PlaylistBody extends React.Component<IProps, NoState> {
  @computed get emptyPlaylistText(): string {
    if (this.props.allSongs) {
      return 'You don\'t have any song yet. Please check in your settings that you added at least one music folder';
    } else if (this.props.favorites) {
      return 'You don\'t have any favorite song yet';
    }
    return 'This playist is currently empty';
  }

  @computed get emptyPlaylistButtonText(): string {
    if (this.props.allSongs) {
      return 'Settings';
    } else if (this.props.favorites) {
      return 'All songs';
    }
    return 'All songs';
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
        {playlist ? (
          <ResponsiveAdapter
            mobile={<PlaylistBodyMobile playlist={playlist} />}
            desktop={
              <PlaylistBodyDesktop
                allSongs={allSongs}
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
        ) : (
          <Typography>Cette playlist est encore vide pour le moment</Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBody);
