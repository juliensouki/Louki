import * as React from 'react';
import { observer } from 'mobx-react';

import TopBar from './app/TopBar';
import LeftPanel from './app/LeftPanel';
import MusicBar from './app/MusicBar';
import PlaylistPanel from './app/PlaylistPanel';

@observer
export default class Layout extends React.Component<NoProps, NoState>
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