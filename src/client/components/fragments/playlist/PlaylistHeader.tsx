import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Fab, Typography } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = (theme: Theme) => createStyles({
    "@global": {
        ".MuiFab-extended.MuiFab-sizeMedium": {
            [theme.breakpoints.down("xs")]: {
                height: 30,
            },
        },
    },
    root: {
        width: "calc(100% - 40px)",
        marginTop: 20,
        marginLeft: 20,
        height: 200,
        [theme.breakpoints.down('xs')]: {
            height: 150,
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    playlistPictureContainer: {
        height: 180,
        width: 180,
        marginRight: 20,
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },    
    },
    playlistPicture: {
        backgroundColor: theme.palette.secondary.main,
        height: "100%",
        width: "100%",
    },
    playlistInfoContainer: {
        width: "calc(100% - 200px)",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: 140,
        },
    },
    playlistCategory: {
        textTransform: "uppercase",
        fontSize: 18,
        color: theme.palette.primary.main,  
        [theme.breakpoints.down('xs')]: {
            fontSize: 15,
        },
    },
    playlistName: {
        color: theme.palette.primary.light,
        fontSize: 35,
        fontWeight: "bolder",
        textTransform: "uppercase",
        [theme.breakpoints.down('xs')]: {
            fontSize: 25,
        },
    },
    playlistDescription: {
        color: theme.palette.primary.main,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "100%",
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
            fontSize: 15,
        },
    },
    playlistButton: {
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.secondary.main,
        marginLeft: 15,
        [theme.breakpoints.down('xs')]: {
            height: "25 !important",
            fontSize: 15,
        },
    },
    extendedIcon: {
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(1),
        },
    },
    headerLine: {
        backgroundColor: theme.palette.background.default,
        height: 1,
        width: "100%",
    },
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class PlaylistHeader extends React.Component<Props, NoState>
{
  render()
  {
    const { classes } = this.props;

    return (
        
        <Grid container direction="column" className={classes.root} justify="space-between">
            <Grid container item direction="row">
                <Grid item className={classes.playlistPictureContainer}>
                    <div className={classes.playlistPicture}></div>
                </Grid>
                <Grid 
                    item 
                    container 
                    direction="column" 
                    className={classes.playlistInfoContainer} 
                    alignItems="flex-start" 
                    justify="space-between">
                    <Grid item>
                        <Typography className={classes.playlistCategory}>All songs</Typography>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item>
                                <Typography className={classes.playlistName}>Your Music</Typography>
                            </Grid>
                            <Grid item>
                                <Fab variant="extended" size="medium" className={classes.playlistButton} aria-label="play">
                                    <PlayArrowIcon className={classes.extendedIcon}/>
                                    Play
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{width: "100%"}}>
                        <Typography className={classes.playlistDescription}>You have 32 songs</Typography>
                        <Typography className={classes.playlistDescription}>You spent 5 days 12 hours 6 minutes listening to your music.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <div className={classes.headerLine}></div>
            </Grid>
        </Grid>
    );
  }
};

export default withStyles(styles)(PlaylistHeader);