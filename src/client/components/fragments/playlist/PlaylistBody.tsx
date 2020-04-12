import * as React from 'react';
import { observer } from 'mobx-react';

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
