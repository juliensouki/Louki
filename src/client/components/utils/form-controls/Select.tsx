import * as React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';
import MSelect from '@material-ui/core/Select';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
      color: theme.palette.primary.main,
    },
    usernameInput: {
      color: theme.palette.primary.main,
      verticalAlign: 'top',
      marginLeft: '0.8em',
      marginTop: '0.2em',
      textAlign: 'right',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
      display: 'inline-block',
      '&:focus': {
        outline: 'none',
      },
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      fontSize: '1.5rem',
      textTransform: 'none',
    },
    gridContainer: {
      marginBottom: '3em',
    },
    warning: {
      maxWidth: 300,
      marginTop: '1.5em',
      fontSize: '1.5rem',
    },
    text: {
      fontSize: '1.5rem',
    },
    statusIcon: {
      position: 'relative',
      top: '0.25em',
      left: '-0.3em',
      fontSize: '2rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

@observer
class Select extends React.Component<React.PropsWithChildren<Props>, NoState> {
  render() {
    const { children, value, onChange } = this.props;
    return (
      <MSelect id='demo-customized-select-native' value={value} onChange={onChange} input={<BootstrapInput />}>
        {children}
      </MSelect>
    );
  }
}

export default withStyles(styles)(Select);
