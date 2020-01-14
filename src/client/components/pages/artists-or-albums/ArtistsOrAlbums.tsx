import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import CurrentArtistOrAlbum from '../../../store/pages/artistsOrAlbums/CurrentArtistOrAlbum';
import PlaylistBody from '../../fragments/playlist-artists-or-albums/PlaylistBody';

const styles = (theme: Theme) =>
  createStyles({
      root: {
      width: '100%',
    },
});

interface Props extends WithStyles<typeof styles> { 
};

@observer
class ArtistsOrAlbums extends React.Component<Props, NoState> {
  get title(): string {
    return CurrentArtistOrAlbum.showArtist ? 'Artists' : 'Albums';
  }

  get subTitle(): string {
    return CurrentArtistOrAlbum.showArtist ? 'Your artists' : 'Your albums';
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PlaylistHeader subTitle={this.subTitle} title={this.title} />
        <SearchContainer />
        <PlaylistBody />
      </div>
    );
  }
}

export default withStyles(styles)(ArtistsOrAlbums);
