import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';

import BookmarksData from '../../../store/common/BookmarksData';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

interface IProps extends WithStyles<typeof styles> {}; // eslint-disable-line

@observer
class Favorites extends React.Component<IProps, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PlaylistHeader subTitle='Your favorite songs' title='Favorites' playlist={BookmarksData.bookmarks} />
        <SearchContainer />
        <PlaylistBody playlist={BookmarksData.bookmarks} favorites />
      </div>
    );
  }
}

export default withStyles(styles)(Favorites);
