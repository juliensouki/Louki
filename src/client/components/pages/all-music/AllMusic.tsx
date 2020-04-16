import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';
import MusicsData from '../../../store/common/MusicsData';

import texts from '../../../lang/pages/all-songs';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

interface IProps extends WithStyles<typeof styles> {} // eslint-disable-line

@observer
class AllMusic extends React.Component<IProps, NoState> {
  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <div className={classes.root}>
        <PlaylistHeader {...T.playlistHeader} playlist={MusicsData.allMusics} image='/assets/images/all-musics.png' />
        <SearchContainer />
        <PlaylistBody canAddToFavorites playlist={MusicsData.allMusics} allSongs />
      </div>
    );
  }
}

export default withStyles(styles)(AllMusic);
