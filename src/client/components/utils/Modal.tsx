import * as React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid, Typography } from '@material-ui/core';
import ResponsiveAdapter from './ResponsiveAdapter';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      fontSize: '1.8rem',
      textTransform: 'uppercase',
      color: '#fff',
      display: 'inline-block',
    },
    buttonsContainer: {
      paddingBottom: '16px !important',
    },
    subTitle: {
      color: '#646464',
    },
    closeIcon: {
      position: 'relative',
      top: '-0.3em',
    },
    steps: {
      fontSize: '1.8rem',
      textTransform: 'uppercase',
      color: '#fff',
      opacity: 0.3,
      display: 'inline-block',
      marginRight: '0.3em',
    },
  });

interface Props extends WithStyles<typeof styles> {
  onClose?: (optional: any) => void;
  open: boolean;
  title: string;
  maxWidth?: Breakpoint;
  buttons: Array<JSX.Element>;
  preventClosing?: boolean;
  steps?: string;
}

@observer
class Modal extends React.Component<React.PropsWithChildren<Props>, NoState> {
  render() {
    const { classes, children, onClose, open, title, buttons, maxWidth, preventClosing, steps } = this.props;

    return (
      <ResponsiveAdapter
        breakpoint='xs'
        desktop={<Dialog maxWidth={maxWidth ? maxWidth : 'sm'} open={open} onClose={onClose} fullWidth />}
        mobile={<Dialog fullScreen open={open} onClose={onClose} />}
      >
        <Grid container direction='row' justify='space-between' alignItems='center'>
          <DialogTitle>
            <Typography className={classes.steps}>{steps}</Typography>
            <Typography className={classes.title}>{title}</Typography>
          </DialogTitle>
          {!preventClosing && (
            <IconButton className={classes.closeIcon} onClick={onClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          )}
        </Grid>
        <DialogContent>{children}</DialogContent>
        <DialogActions className={classes.buttonsContainer}>{buttons}</DialogActions>
      </ResponsiveAdapter>
    );
  }
}

export default withStyles(styles)(Modal);
