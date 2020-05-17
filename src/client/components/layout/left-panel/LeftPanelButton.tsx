import * as React from 'react';
import { NavLink } from 'react-router-dom';
import MobileMenu from '../../../store/features/MobileMenu';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      a: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
    },
    root: {
      marginTop: '0.8em',
      color: 'inherit',
      fontWeight: 'inherit',
      transition: 'color .5s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
      },
    },
    text: {
      fontSize: '1.7rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    textGridContainer: {
      width: 'calc(100% - 2rem - 5px)',
    },
    icon: {
      fontSize: '2rem',
      position: 'relative',
      top: '0.1em',
    },
  });

interface Props extends WithStyles<typeof styles> {
  text: string;
  routePath: string;
  playlist?: boolean;
  showArtist?: boolean;
  aboutprops?: any;
  playlistId?: string;
  icon: any; //Find type
}

const LeftPanelButton: React.FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) => {
  const { classes, icon, routePath, playlist, aboutprops, playlistId, text } = props;
  const url = playlist ? routePath + '/' + playlistId : routePath;
  const Icon = icon;

  return (
    <NavLink
      to={url}
      onClick={() => {
        MobileMenu.setOpen(false);
      }}
      activeStyle={{ textDecoration: 'none', fontWeight: 'bolder', color: '#FFF' }}
      aboutprops={aboutprops}
    >
      <Grid container direction='row' className={classes.root}>
        <Grid item className={classes.text} style={{ marginRight: 5 }}>
          <Icon className={classes.icon} />
        </Grid>
        <Grid item className={classes.textGridContainer}>
          <Typography className={classes.text}>{text}</Typography>
        </Grid>
      </Grid>
    </NavLink>
  );
};

export default withStyles(styles)(LeftPanelButton);
