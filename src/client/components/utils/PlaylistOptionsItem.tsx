import React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.3rem',
    },
  });

export interface Props extends WithStyles<typeof styles> {
  title: string;
  handleClick: (event: any) => void;
  handleClose?: (event: any) => void;
}

@observer
class PlaylistOptionsItems extends React.Component<Props, NoState> {
  render() {
    const { classes, title, handleClick, handleClose } = this.props;

    return (
      <MenuItem
        key={title}
        className={classes.text}
        onClick={event => {
          event.stopPropagation();
          handleClick(event);
          handleClose(event);
        }}
      >
        {title}
      </MenuItem>
    );
  }
}

export default withStyles(styles)(PlaylistOptionsItems);
