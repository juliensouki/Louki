import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import TransparentInput from '../utils/form-controls/TransparentInput';

import SearchIcon from '@material-ui/icons/Search';
import SearchForm from '../../store/features/Search';
import texts from '../../lang/playlist/search-container';

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

@observer
class SearchContainer extends React.Component<WithStyles, NoState> {
  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <div className={classes.root}>
        <SearchIcon className={classes.searchIcon} />
        <TransparentInput placeholder={T.searchPlaceholder} value={SearchForm.search} onChange={SearchForm.setSearch} />
      </div>
    );
  }
}

export default withStyles(styles)(SearchContainer);
