import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        top: 60,
        left: 350,
        height: "calc(100% - 60px - 80px)",
        width: "calc(100% - 350px)",
        backgroundColor: "black",
        color: "#FFF",
    },

});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class PlaylistPanel extends React.Component<Props, NoState>
{
  render()
  {
    // const T = texts.current.appBar;
    const { classes } = this.props;
    return (
        <Grid 
            container 
            justify="flex-start"
            alignItems="center"            
            direction="column"
            className={classes.root}>
        </Grid>
    );
  }
};

export default withStyles(styles)(PlaylistPanel);