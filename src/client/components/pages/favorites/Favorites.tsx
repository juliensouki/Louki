import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';

import IMusic from '../../../../shared/IMusic';
import MusicsData from '../../../store/common/MusicsData';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

interface IProps extends WithStyles<typeof styles> {}; // eslint-disable-line

@observer
class Favorites extends React.Component<IProps, NoState> {
  @observable bookmarks: Array<IMusic> = [];

  async componentDidMount() {
    fetch('/bookmarks')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.bookmarks = MusicsData.idsToMusics(data);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PlaylistHeader subTitle='Your favorite songs' title='Favorites' />
        <SearchContainer />
        <PlaylistBody playlist={this.bookmarks} />
      </div>
    );
  }
}

export default withStyles(styles)(Favorites);
