import React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles> {
  anchorEl: HTMLElement | null;
  handleClose: (event) => void;
  addMusicToPlaylist: (event) => void;
  removeBookmark: (event) => void;
  editInformation: (event) => void;
  removeFromPlaylist: (event) => void;
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
        <MenuItem
          onClick={event => {
            this.props.handleClose(event);
            this.props.addMusicToPlaylist(event);
          }}
        >
          Ajouter à une playlist
        </MenuItem>
        <MenuItem
          onClick={event => {
            this.props.handleClose(event);
            this.props.editInformation(event);
          }}
        >
          Modifier
        </MenuItem>
        <MenuItem
          onClick={event => {
            this.props.handleClose(event);
            this.props.removeBookmark(event);
          }}
        >
          Enlever des favoris
        </MenuItem>
        <MenuItem
          onClick={event => {
            this.props.handleClose(event);
            this.props.removeFromPlaylist(event);
          }}
        >
          Retirer de la playlist
        </MenuItem>
      </Menu>
    );
  }
}

export default withStyles(styles)(PlaylistMenu);
