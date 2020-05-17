import React, { useState, useEffect } from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

import SearchForm from '../../../store/features/Search';
import { Music } from '../../../../shared/LoukiTypes';
import { EmptyPlaylistTexts } from '../../utils/ClientTypes';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 'calc(100% - 4em)',
      padding: '2em',
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 240px)',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  playlist: Array<Music>;
  emptySettings: EmptyPlaylistTexts;
  addBookmarksEnabled?: boolean;
  desktopPlaylistOptions: (id: string) => Array<JSX.Element>;
}

const PlaylistBody: React.FunctionComponent<Props> = (props: Props) => {
  const { classes, playlist, emptySettings, addBookmarksEnabled, desktopPlaylistOptions } = props;

  useEffect(() => {
    if (SearchForm.hasChanged) {
      const ids = [];
      playlist.forEach(music => {
        ids.push(music.__id);
      });
      SearchForm.startSearch(ids);
    }
  });

  return (
    <div className={classes.root}>
      <ResponsiveAdapter
        mobile={<PlaylistBodyMobile playlist={playlist} />}
        desktop={
          <PlaylistBodyDesktop
            playlist={playlist}
            addBookmarksEnabled={addBookmarksEnabled}
            emptySettings={emptySettings}
            getPlaylistOptionsItems={desktopPlaylistOptions}
            searchResults={SearchForm.search == '' ? null : SearchForm.searchResults}
          />
        }
      />
    </div>
  );
};

export default withStyles(styles)(PlaylistBody);
