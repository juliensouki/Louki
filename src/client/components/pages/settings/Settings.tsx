import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Settings extends React.Component<NoProps, NoState>
{
  render()
  {
    return (
        <div>Settings</div>
    );
  }
}