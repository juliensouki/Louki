import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 90,
        width: "100%",
        backgroundColor: "#373636",
        color: "#FFF",
    },

});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class MusicBar extends React.Component<Props, NoState>
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

export default withStyles(styles)(MusicBar);