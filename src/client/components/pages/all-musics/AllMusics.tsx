import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';
import SelectPlaylistModal from '../../modals/SelectPlaylistModal';

import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';

import texts from '../../../lang/pages/all-musics';
import optionsTexts from '../../../lang/options';
import notifsTexts from '../../../lang/notifications';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  });

@observer
class AllMusics extends React.Component<WithStyles & WithSnackbarProps, NoState> {
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
    this.props.enqueueSnackbar(notifsTexts.current.notDeveloped, snackbarOptions);
  };

  desktopPlaylistOptions = (id: string): Array<JSX.Element> => {
    const T = optionsTexts.current;
    return [
      <PlaylistOptionsItem
        key={0}
        title={T.addToPlaylist}
        handleClick={() => {
          this.handleAddMusicToPlaylist(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title={T.edit} handleClick={this.handleEditMusic} />,
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
            ...T.emptyTexts,
            redirectRoute: '/settings',
          }}
          addBookmarksEnabled
          desktopPlaylistOptions={this.desktopPlaylistOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(AllMusics));
