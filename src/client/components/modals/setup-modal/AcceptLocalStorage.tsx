import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, FormControl, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import SetupForm from '../../../store/forms/SetupForm';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiFormControlLabel-label': {
        fontSize: '1.5rem',
      },
    },
    text: {
      fontSize: '1.5rem',
      '&:not(:first-child)': {
        marginTop: '1.5em',
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {} //eslint-disable-line

@observer
class AcceptLocalStorage extends React.Component<IProps, NoState> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.text}>One last thing !</Typography>
        <Typography className={classes.text}>
          Louki uses local storage, in order to collect data about your usage of Louki. These data are only collected to
          provide yourself statistics about the way you use it.
        </Typography>
        <Typography className={classes.text}>
          So please, before starting using Louki, accept the use of local storage :
        </Typography>
        <FormControl style={{ marginTop: '2em' }}>
          <FormControlLabel
            value='end'
            className='checkbox-label'
            control={<Checkbox value={SetupForm.checkbox} onChange={SetupForm.changeCheckbox} color='primary' />}
            label='I authorize Louki to use local storage.'
            labelPlacement='end'
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AcceptLocalStorage);
