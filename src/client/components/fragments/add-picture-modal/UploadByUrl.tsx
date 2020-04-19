import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckIcon from '@material-ui/icons/Check';

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
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  url: string;
  isValid: boolean;
}

@observer
class UploadByUrl extends React.Component<IProps, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper component='form' className={classes.root}>
          <IconButton type='submit' className={classes.iconButton} aria-label='search'>
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            value={this.props.url}
            onChange={this.props.onChange}
            placeholder='Enter an image url'
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton className={classes.iconButton}>
            {this.props.isValid ? <CheckIcon /> : <ErrorOutlineIcon />}
          </IconButton>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UploadByUrl);
