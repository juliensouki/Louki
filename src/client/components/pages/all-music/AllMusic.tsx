import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class AllMusic extends React.Component<NoProps, NoState>
{
  render()
  {
    return (
        <div>All music</div>
    );
  }
}