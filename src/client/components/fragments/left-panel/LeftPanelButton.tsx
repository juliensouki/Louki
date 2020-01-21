import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import CurrentPlaylist from '../../../store/fragments/playlist/CurrentPlaylist';
import CurrentArtistOrAlbum from '../../../store/pages/artistsOrAlbums/CurrentArtistOrAlbum';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      'a': { //eslint-disable-line
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
    },
    root: {
      marginTop: 15,
      width: 'calc(100% - 40px)',
      color: 'inherit',
      fontWeight: 'inherit',
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  text: string;
  icon: JSX.Element;
  routePath: string;
  playlist?: boolean;
  showArtist?: boolean;
  aboutprops?: any;
}

@observer
class LeftPanelButton extends React.Component<IProps, NoState> {
  handleClick = () => {
    if (this.props.playlist) {
      CurrentPlaylist.setPlaylist(this.props.text);
    } else if (this.props.showArtist) {
      CurrentArtistOrAlbum.setArtist(true);
    } else {
      CurrentArtistOrAlbum.setArtist(false);
    }
  };

  render() {
    const { classes, routePath, playlist, text, aboutprops } = this.props;
    const url = playlist ? routePath + '/' + text : routePath;

    return (
      <NavLink
        to={url}
        onClick={this.handleClick}
        activeStyle={{ textDecoration: 'none', fontWeight: 'bolder', color: '#FFF' }}
        aboutprops={aboutprops}
      >
        <Grid container direction='row' className={classes.root}>
          <Grid item style={{ marginRight: 5 }}>
            {this.props.icon}
          </Grid>
          <Grid item>
            <Typography>{this.props.text}</Typography>
          </Grid>
        </Grid>
      </NavLink>
    );
  }
}

export default withStyles(styles)(LeftPanelButton);
