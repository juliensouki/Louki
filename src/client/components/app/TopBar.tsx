import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 70,
        width: "100%",
        backgroundColor: "#373636",
        paddingLeft: 20,
        paddingRight: 20,
        color: "#FFF",
    },
    logo: {
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "lighter",
    },
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class TopBar extends React.Component<Props, NoState>
{
  render()
  {
    // const T = texts.current.appBar;
    const { classes } = this.props;
    return (
        <Grid 
            container 
            justify="space-between"
            alignItems="center"            
            direction="row"
            className={classes.root}>
            <Grid item>
                <Typography className={classes.logo}>louki</Typography>
            </Grid>
        </Grid>
    );
  }
};

export default withStyles(styles)(TopBar);