import * as React from 'react';
import { observer } from 'mobx-react';
import { Container } from '@material-ui/core';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

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
      <Container className={classes.welcome}>
        Bienvenue sur Louki !
      </Container>
    );
  }
}

export default withStyles(styles)(App);