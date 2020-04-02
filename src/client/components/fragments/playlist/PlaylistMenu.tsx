import React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles> {
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
class PlaylistMenu extends React.Component<IProps, NoState> {
  render() {
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
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.addMusicToPlaylist(event);
            }}
          >
            Ajouter à une playlist
          </MenuItem>
        ) : null}
        {this.props.editInformation ? (
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.editInformation(event);
            }}
          >
            Modifier
          </MenuItem>
        ) : null}
        {this.props.removeBookmark ? (
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.removeBookmark(event);
            }}
          >
            Enlever des favoris
          </MenuItem>
        ) : null}
        {this.props.removeFromPlaylist ? (
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.removeFromPlaylist(event);
            }}
          >
            Retirer de la playlist
          </MenuItem>
        ) : null}
        {this.props.updatePlaylist ? (
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              this.props.updatePlaylist(event);
            }}
          >
            Modifier playlist
          </MenuItem>
        ) : null}
        {this.props.deletePlaylist ? (
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              this.props.handleClose(event);
              this.props.deletePlaylist(event);
            }}
          >
            Supprimer playlist
          </MenuItem>
        ) : null}
      </Menu>
    );
  }
}

export default withStyles(styles)(PlaylistMenu);
