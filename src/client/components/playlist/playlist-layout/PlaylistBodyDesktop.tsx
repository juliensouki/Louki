import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Typography } from '@material-ui/core';

import { Music } from '../../../../shared/LoukiTypes';

import PlaylistBodyDesktopRow from './PlaylistBodyDesktopRow';
import { FixedSizeList as List } from 'react-window';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { EmptyPlaylistTexts } from '../../utils/interfaces/ClientTypes';
import texts from '../../../lang/playlist/playlist-layout';

const styles = (theme: Theme) =>
  createStyles({
    rowTitles: {
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
      paddingBottom: '0.8em',
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  searchResults: Array<string> | null;
  playlist: Array<Music>;
  addBookmarksEnabled?: boolean;
  getPlaylistOptionsItems: (id: string) => Array<JSX.Element>;
  emptySettings: EmptyPlaylistTexts;
  image: string;
}

const ROW_SIZE = 50;

@observer
class PlaylistBodyDesktop extends React.Component<Props & RouteComponentProps, NoState> {
  @observable openSelectPlaylistModal: boolean = false;
  @observable musicToAddToPlaylist: string = '';
  @observable ref: React.RefObject<HTMLTableSectionElement> = React.createRef();

  redirectHome = () => {
    const emptySettings: EmptyPlaylistTexts = this.props.emptySettings;
    this.props.history.push(emptySettings.redirectRoute);
  };

  getMusicRows = ({ index, data }: { index: number; data: Omit<Props, 'emptySettings'> }): JSX.Element => {
    const { playlist, searchResults, addBookmarksEnabled, getPlaylistOptionsItems, image } = data;
    const music = playlist[index];
    return (
      <>
        <PlaylistBodyDesktopRow
          key={music.__id}
          index={index}
          music={music}
          searchResults={searchResults}
          getPlaylistOptionsItems={getPlaylistOptionsItems}
          playlist={playlist}
          image={image}
          addBookmarksEnabled={addBookmarksEnabled}
        />
        {((searchResults === null && index + 1 < playlist.length) ||
          (searchResults != null && index + 1 < searchResults.length)) && <Divider />}
      </>
    );
  };

  render() {
    const {
      classes,
      emptySettings,
      playlist,
      searchResults,
      addBookmarksEnabled,
      getPlaylistOptionsItems,
      image,
    } = this.props;
    const T = texts.current;

    if (playlist == null || playlist.length == 0) {
      return (
        <React.Fragment>
          <Typography style={{ fontSize: '1.3rem', display: 'inline-block' }}>{emptySettings.emptyText}</Typography>
          <Button className={classes.button} onClick={this.redirectHome}>
            {emptySettings.emptyButtonText}
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <Grid container direction='column'>
          <Grid container item direction='row'>
            <Grid container item xs={6}>
              <Typography className={classes.rowTitles}>{T.song}</Typography>
            </Grid>
            <Grid container item xs={2}>
              <Typography className={classes.rowTitles}>{T.artist}</Typography>
            </Grid>
            <Grid container item xs={2}>
              <Typography className={classes.rowTitles}>{T.album}</Typography>
            </Grid>
            <Grid container item xs={1}>
              <Typography className={classes.rowTitles}>{T.duration}</Typography>
            </Grid>
            <Grid container item xs={1} />
          </Grid>
          <Divider />
          <List
            height={ROW_SIZE * playlist.length}
            itemCount={playlist.length}
            itemSize={ROW_SIZE}
            ref={this.ref}
            itemData={{
              playlist,
              searchResults,
              addBookmarksEnabled,
              getPlaylistOptionsItems,
              image,
            }}
          >
            {this.getMusicRows}
          </List>
        </Grid>
      );
    }
  }
}

export default withStyles(styles)(withRouter(PlaylistBodyDesktop));
