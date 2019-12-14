import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class ArtistOrAlbums extends React.Component<NoProps, NoState>
{
  render()
  {
    return (
        <div>List by album or Artists</div>
    );
  }
}