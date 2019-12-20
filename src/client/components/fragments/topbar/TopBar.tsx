import * as React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import MobileMenu from '../../../store/fragments/left-panel/MobileMenu';
import { NavLink } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 60,
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: "#FFF",
    },
    mainContainer: {
        position: "relative",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "lighter",
    },
    profilePicture: {
        borderRadius: "100%",
        height: 40,
        width: 40,
        backgroundColor: theme.palette.secondary.main,
        marginLeft: 15,
    },
    userName: {
        color: theme.palette.primary.main,
    },
    settingsIcon: {
        position: "absolute",
        fontSize: 30,
        top: 15,
        right: "15%",
        color: theme.palette.primary.main,
        transition: "color .5s ease-in-out",
        '&:hover': {
            cursor: "pointer",
            color: theme.palette.primary.light,
        },
        [theme.breakpoints.down('md')]: {
            right: "25%",
        },
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
    menuIcon: {
        fontSize: 25,
    },
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class TopBar extends React.Component<Props, NoState>
{
  openOrCloseMenu = () => {
      MobileMenu.setOpen(!MobileMenu.isOpen);
  }    

  @computed get menuIcon(): JSX.Element
  {
      if (MobileMenu.isOpen)
      {
          return <CloseIcon onClick={this.openOrCloseMenu} className={this.props.classes.menuIcon}/>
      }
      return <MenuIcon onClick={this.openOrCloseMenu} className={this.props.classes.menuIcon}/>;
  }

  render()
  {
    // const T = texts.current.appBar;
    const { classes } = this.props;
    return (
        <div className={classes.root}>
            <Grid 
                container 
                justify="space-between"
                alignItems="center"            
                direction="row"
                className={classes.mainContainer}>
                <Grid item>
                    <ResponsiveAdapter 
                        breakpoint="sm" 
                        desktop={
                            <Typography className={classes.logo}>louki</Typography>
                        } mobile={this.menuIcon}/>
                </Grid>
                <Grid item>
                    <Grid container item direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <Typography className={classes.userName}>Souki</Typography>
                        </Grid>
                        <Grid item>
                            <div className={classes.profilePicture}></div>
                        </Grid>
                    </Grid>
                </Grid>
                <NavLink 
                  className={classes.settingsIcon}
                  to={'/settings'} 
                  activeStyle={{ textDecoration: 'none', fontWeight: "bolder", color: "#FFF" }}>
                  <SettingsIcon />
                </NavLink>
            </Grid>
        </div>
    );
  }
};

export default withStyles(styles)(TopBar);