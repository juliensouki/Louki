import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import SearchForm from '../../../store/features/Search';
import texts from '../../../lang/playlist/search-container';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 'calc(100% - 40px)',
      padding: 5,
      marginLeft: 20,
    },
    searchIcon: {
      position: 'relative',
      color: theme.palette.primary.main,
      top: '0.2em',
      fontSize: '2.1rem',
      display: 'inline-block',
    },
    input: {
      color: theme.palette.primary.main,
      verticalAlign: 'top',
      marginLeft: '0.8em',
      marginTop: '0.2em',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.7rem',
      fontFamily: 'Roboto',
      display: 'inline-block',
      '&:focus': {
        outline: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: '0.35em',
        fontSize: '1.4rem',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  alignRight?: boolean;
}

@observer
class TransparentInput extends React.Component<Props, NoState> {
  render() {
    const { classes, alignRight, value, onChange, placeholder } = this.props;
    const T = texts.current;
    const style = alignRight ? { textAlign: 'right' as any } : {};

    return (
      <input
        style={style}
        placeholder={placeholder}
        className={classes.input}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
      />
    );
  }
}

export default withStyles(styles)(TransparentInput);
