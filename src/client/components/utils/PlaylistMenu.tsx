import React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import texts from '../../lang/fragments/options';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  anchorEl: HTMLElement | null;
  handleClose: (event) => void;
  addMusicToPlaylist: (event) => void | null;
  removeBookmark: (event) => void | null;
  editInformation: (event) => void | null;
  removeFromPlaylist: (event) => void | null;
  updatePlaylist: (event) => void | null;
  deletePlaylist: (event) => void | null;
}

@observer
class PlaylistMenu extends React.Component<Props, NoState> {
  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <Menu
        id='simple-menu'
        anchorEl={this.props.anchorEl}
        keepMounted
        open={Boolean(this.props.anchorEl)}
        onClose={event => {
          this.props.handleClose(event);
        }}
      >
        {this.props.addMusicToPlaylist ? (
          <MenuItem
            className={classes.text}
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.addMusicToPlaylist(event);
            }}
          >
            {T.addPlaylist}
          </MenuItem>
        ) : null}
        {this.props.editInformation ? (
          <MenuItem
            className={classes.text}
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.editInformation(event);
            }}
          >
            {T.edit}
          </MenuItem>
        ) : null}
        {this.props.removeBookmark ? (
          <MenuItem
            className={classes.text}
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.removeBookmark(event);
            }}
          >
            {T.removeBookmark}
          </MenuItem>
        ) : null}
        {this.props.removeFromPlaylist ? (
          <MenuItem
            className={classes.text}
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.removeFromPlaylist(event);
            }}
          >
            {T.removeFromPlaylist}
          </MenuItem>
        ) : null}
        {this.props.updatePlaylist ? (
          <MenuItem
            className={classes.text}
            onClick={event => {
              event.stopPropagation();
              this.props.updatePlaylist(event);
            }}
          >
            {T.editPlaylist}
          </MenuItem>
        ) : null}
        {this.props.deletePlaylist ? (
          <MenuItem
            className={classes.text}
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.deletePlaylist(event);
            }}
          >
            {T.deletePlaylist}
          </MenuItem>
        ) : null}
      </Menu>
    );
  }
}

export default withStyles(styles)(PlaylistMenu);
