import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Layout from './components/Layout';

const styles = (theme: Theme) => createStyles({
  welcome: {
    fontSize: 15,
  },
});

export interface Props extends WithStyles<typeof styles>
{
}

@observer
class App extends React.Component<Props, NoState>
{
  render()
  {
    const { classes } = this.props;

    return (
      <Layout/>
    );
  }
}

export default withStyles(styles)(App);