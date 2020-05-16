import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

import { Page } from '../../pages/artists-or-albums/ArtistsOrAlbums';
import MusicsData from '../../../store/data/LoukiStore';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 'calc(100% - 4em)',
      marginLeft: '2em',
      height: '100%',
      marginTop: 20,
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 240px)',
      },
    },
    rowTitles: {
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      fontSize: 16,
      color: theme.palette.primary.main,
    },
    tableRow: {
      color: theme.palette.primary.main,
    },
  });

interface Props extends WithStyles<typeof styles> {
  page: Page;
}

@observer
class PlaylistBody extends React.Component<Props, NoState> {
  render() {
    const { classes, page } = this.props;
    const playlist = page == Page.ALBUMS ? MusicsData.allAlbums : MusicsData.allArtists;

    return (
      <div className={classes.root}>
        <ResponsiveAdapter
          mobile={<PlaylistBodyMobile playlist={playlist} />}
          desktop={<PlaylistBodyDesktop playlist={playlist} page={page} />}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PlaylistBody);
