import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';

const styles = (theme: Theme) =>
  createStyles({
      root: {
      width: '100%',
    },
});

interface Props extends WithStyles<typeof styles> { 
};

@observer
class Favorites extends React.Component<Props, NoState> {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PlaylistHeader subTitle='Your favorite songs' title='Favorites' />
        <SearchContainer />
        <PlaylistBody />
      </div>
    );
  }
}

export default withStyles(styles)(Favorites);
