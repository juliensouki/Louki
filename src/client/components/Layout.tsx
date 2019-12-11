import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import TopBar from './fragments/topbar/TopBar';
import LeftPanel from './fragments/left-panel/LeftPanel';
import MusicBar from './fragments/music-bar/MusicBar';
import PlaylistPanel from './fragments/playlist-panel/PlaylistPanel';

const styles = (theme: Theme) => createStyles({
  "@global": {
    "body": {
      overflowY: "hidden",
    },
  },
});
@observer
class Layout extends React.Component<NoProps, NoState>
{
  render()
  {
    return (
      <React.Fragment>
        <TopBar/>
        <LeftPanel/>
        <MusicBar/>
        <PlaylistPanel/>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout);
