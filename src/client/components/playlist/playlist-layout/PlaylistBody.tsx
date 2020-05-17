import * as React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

import SearchForm from '../../../store/features/Search';
import { Music } from '../../../../shared/LoukiTypes';
import { EmptyPlaylistTexts } from '../../utils/ClientTypes';

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
  emptySettings: EmptyPlaylistTexts;
  addBookmarksEnabled?: boolean;
  desktopPlaylistOptions: (id: string) => Array<JSX.Element>;
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

  render() {
    const { classes, playlist, emptySettings, addBookmarksEnabled, desktopPlaylistOptions } = this.props;

    return (
      <div className={classes.root}>
        <ResponsiveAdapter
          mobile={<PlaylistBodyMobile playlist={playlist} />}
          desktop={
            <PlaylistBodyDesktop
              playlist={playlist}
              addBookmarksEnabled={addBookmarksEnabled}
              emptySettings={emptySettings}
              getPlaylistOptionsItems={desktopPlaylistOptions}
              searchResults={SearchForm.search == '' ? null : SearchForm.searchResults}
            />
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBody);
