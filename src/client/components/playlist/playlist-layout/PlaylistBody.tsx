import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/responsive/ResponsiveAdapter';

import SearchForm from '../../../store/features/Search';
import { Music } from '../../../../shared/LoukiTypes';
import { EmptyPlaylistTexts } from '../../utils/interfaces/ClientTypes';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  options: (id: string) => Array<JSX.Element>;
  image?: string | null;
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
    const { classes, playlist, emptySettings, addBookmarksEnabled, options, image } = this.props;

    return (
      <div className={classes.root}>
        <ResponsiveAdapter
          mobile={
            <PlaylistBodyMobile
              playlist={playlist}
              addBookmarksEnabled={addBookmarksEnabled}
              emptySettings={emptySettings}
              getPlaylistOptionsItems={options}
              searchResults={SearchForm.search == '' ? null : SearchForm.searchResults}
              image={image || null}
            />
          }
          desktop={
            <PlaylistBodyDesktop
              playlist={playlist}
              addBookmarksEnabled={addBookmarksEnabled}
              emptySettings={emptySettings}
              getPlaylistOptionsItems={options}
              searchResults={SearchForm.search == '' ? null : SearchForm.searchResults}
              image={image || null}
            />
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBody);
