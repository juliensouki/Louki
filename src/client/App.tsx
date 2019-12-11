import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Layout from './components/Layout';


export default
class App extends React.Component<NoProps, NoState>
{
  render()
  {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout/>
      </MuiThemeProvider>
    );
  }
};