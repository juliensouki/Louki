import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const textProperties = {
    maxWidth: "250px",
    overflow: "hidden",
    whiteSpace: "nowrap" as any,
    textOverflow: "ellipsis",
    lineHeight: "unset",
};

const styles = (theme: Theme) => createStyles({
    root: {
        height: 80,
        width: 350,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        transition: "background-color .5s ease-in-out",
        '&:hover': {
            cursor: "pointer",
            backgroundColor: "#494949",
        },
        [theme.breakpoints.down('md')]: {
            width: 80,
        },
    },
    musicImage: {
        height: "100%",
    },
    musicTitle: {
        color: theme.palette.primary.light,
    },
    musicInformationContainer: {
        width: "auto",
        marginLeft: 10,
        [theme.breakpoints.down('md')]: {
            display: "none",
        },
    },
    fromText: {
        ...textProperties,
        fontSize: 13,
    },
    artistAndTitleText: {
        ...textProperties,
    },
});

interface Props extends WithStyles<typeof styles>
{

};

@observer
class MusicPreview extends React.Component<Props, NoState>
{
  render()
  {
    const { classes } = this.props;

    return (
        <Grid 
            container 
            direction="row"
            className={classes.root}>
            <Grid item style={{height: "100%"}}>
                <img 
                    src="https://images.genius.com/cd64d6c15657a9d85823d3666969a00d.1000x1000x1.jpg"
                    className={classes.musicImage}></img>
            </Grid>
            <Grid 
                item 
                container 
                direction="column" 
                alignItems="flex-start" 
                justify="center"
                className={classes.musicInformationContainer}>
                <Grid item>
                    <Typography className={classes.artistAndTitleText}>Coldplay</Typography>
                </Grid>
                <Grid item className={classes.musicTitle}>
                    <Typography className={classes.artistAndTitleText}>A Rush of Blood to The Head</Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.fromText}>From : Workout</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
  }
};

export default withStyles(styles)(MusicPreview);