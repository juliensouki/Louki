import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import emptyTexts from '../../../lang/fragments/playlist/playlist-body';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';
import SelectPlaylistModal from '../../modals/SelectPlaylistModal';

import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';

import texts from '../../../lang/pages/all-songs';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

@observer
class AllMusic extends React.Component<WithStyles & WithSnackbarProps, NoState> {
  @observable openSelectPlaylistModal: boolean = false;
  @observable musicToAddToPlaylist: string = '';

  @action handleAddMusicToPlaylist = (id: string) => {
    this.openSelectPlaylistModal = true;
    this.musicToAddToPlaylist = id;
  };

  @action handleCloseModal = event => {
    event.stopPropagation();
    this.openSelectPlaylistModal = false;
  };

  handleEditMusic = () => {
    const snackbarOptions = { variant: 'info' as any };
    this.props.enqueueSnackbar('This feature has not been developed yet.', snackbarOptions);
  };

  desktopPlaylistOptions = (id: string): Array<JSX.Element> => {
    return [
      <PlaylistOptionsItem
        key={0}
        title='Add to playlist'
        handleClick={() => {
          this.handleAddMusicToPlaylist(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title='Edit music' handleClick={this.handleEditMusic} />,
    ];
  };

  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <div className={classes.root}>
        <SelectPlaylistModal
          open={this.openSelectPlaylistModal}
          handleClose={this.handleCloseModal}
          musicId={this.musicToAddToPlaylist}
        />
        <PlaylistHeader
          {...T.playlistHeader}
          playlist={LoukiStore.allMusics}
          image='/assets/images/all-musics.png'
          stat={Stats.TIME_SPENT_LISTENING}
        />
        <SearchContainer />
        <PlaylistBody
          playlist={LoukiStore.allMusics}
          emptySettings={{
            ...emptyTexts.current.custom,
            redirectRoute: '/all-musics',
          }}
          addBookmarksEnabled
          desktopPlaylistOptions={this.desktopPlaylistOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(AllMusic));
