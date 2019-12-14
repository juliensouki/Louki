import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class SpecificArtistOrAlbum extends React.Component<NoProps, NoState>
{
  render()
  {
    return (
        <div>Specific album or artist</div>
    );
  }
}