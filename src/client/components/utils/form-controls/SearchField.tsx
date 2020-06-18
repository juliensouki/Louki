import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#515151',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: '1.3rem',
    },
    iconButton: {
      padding: 10,
    },
    searchButton: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  buttonText: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchField: React.FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) => {
  const { buttonText, placeholder, value, onChange, onSearch, classes } = props;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == 'Enter') {
      onSearch();
    }
  };

  return (
    <Paper className={classes.root} onKeyPress={handleKeyPress}>
      <IconButton type='submit' className={classes.iconButton} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
      />
      <Button className={classes.searchButton} onClick={onSearch}>
        {buttonText}
      </Button>
    </Paper>
  );
};

export default withStyles(styles)(SearchField);
