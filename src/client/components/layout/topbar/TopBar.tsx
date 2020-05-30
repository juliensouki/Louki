import * as React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import Loader from '../../utils/Loader';
import MobileMenu from '../../../store/features/MobileMenu';
import { NavLink } from 'react-router-dom';

import User from '../../../store/data/User';
import LoukiStore from '../../../store/data/LoukiStore';
import texts from '../../../lang/utils';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '6em',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      color: '#FFF',
    },
    mainContainer: {
      position: 'relative',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      paddingLeft: 20,
      paddingRight: 20,
    },
    logo: {
      textTransform: 'uppercase',
      fontWeight: 'lighter',
    },
    profilePicture: {
      borderRadius: '100%',
      height: '4rem',
      width: '4rem',
      backgroundColor: theme.palette.secondary.main,
      marginLeft: '1.5em',
    },
    pic: {
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
    },
    userName: {
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
    },
    settingsIcon: {
      fontSize: '2.5rem !important',
      color: theme.palette.primary.main,
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
    },
    settingsIconContainer: {
      position: 'absolute',
      right: '15%',
      [theme.breakpoints.down('md')]: {
        right: '25%',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    menuIcon: {
      fontSize: 25,
    },
  });

@observer
class TopBar extends React.Component<WithStyles, NoState> {
  openOrCloseMenu = () => {
    MobileMenu.setOpen(!MobileMenu.isOpen);
  };

  @computed get menuIcon(): JSX.Element {
    if (MobileMenu.isOpen) {
      return <CloseIcon onClick={this.openOrCloseMenu} className={this.props.classes.menuIcon} />;
    }
    return <MenuIcon onClick={this.openOrCloseMenu} className={this.props.classes.menuIcon} />;
  }

  render() {
    const { classes } = this.props;
    const T = texts.current;

    return (
      <div className={classes.root}>
        <Grid container justify='space-between' alignItems='center' direction='row' className={classes.mainContainer}>
          <Grid item>
            <ResponsiveAdapter
              breakpoint='sm'
              desktop={
                <Grid container direction='row' alignItems='center' justify='center'>
                  <Typography variant='h3' className={classes.logo}>
                    louki
                  </Typography>
                  {LoukiStore.isSynchronizing && (
                    <React.Fragment>
                      <Loader size={30} thickness={5} style={{ margin: 15 }} />
                      <Typography style={{ fontSize: '1.3rem' }}>{T.sync}</Typography>
                    </React.Fragment>
                  )}
                </Grid>
              }
              mobile={
                <Grid container direction='row' alignItems='center' justify='center'>
                  {this.menuIcon}
                  {LoukiStore.isSynchronizing && <Loader size={30} thickness={5} style={{ margin: 15 }} />}
                </Grid>
              }
            />
          </Grid>
          <Grid item>
            <Grid container item direction='row' justify='center' alignItems='center'>
              <Grid item>
                <Typography className={classes.userName}>{User.name}</Typography>
              </Grid>
              <Grid item>
                <div className={classes.profilePicture}>
                  {User.picture != '' && <img src={User.picture} className={classes.pic}></img>}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <NavLink
            to={'/settings'}
            className={classes.settingsIconContainer}
            activeStyle={{ textDecoration: 'none', fontWeight: 'bolder', color: '#FFF' }}
          >
            <SettingsIcon className={classes.settingsIcon} />
          </NavLink>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TopBar);
