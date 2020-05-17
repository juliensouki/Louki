import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import { Props as ItemProps } from './PlaylistOptionsItem';

const styles = (theme: Theme) =>
  createStyles({
    menuIcon: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  });

@observer
class PlaylistOptions extends React.Component<React.PropsWithChildren<WithStyles>, NoState> {
  @observable anchorEl: HTMLElement | null = null;

  handleMenu = event => {
    event.stopPropagation();
    this.anchorEl = event.currentTarget;
  };

  handleClose = event => {
    event.stopPropagation();
    this.anchorEl = null;
  };

  render() {
    const { classes } = this.props;

    return (
      <IconButton aria-label='options' onClick={this.handleMenu}>
        <MoreVertIcon className={classes.menuIcon} />
        <Menu
          id='simple-menu'
          anchorEl={this.anchorEl}
          keepMounted
          open={Boolean(this.anchorEl)}
          onClose={event => {
            this.handleClose(event);
          }}
        >
          {React.Children.map(this.props.children, (child: React.ReactElement<ItemProps>) => {
            return React.cloneElement(child, { handleClose: this.handleClose });
          })}
        </Menu>
      </IconButton>
    );
  }
}

export default withStyles(styles)(PlaylistOptions);
