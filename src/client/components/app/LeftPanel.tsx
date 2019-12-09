import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        top: 70,
        left: 0,
        height: "calc(100% - 70px - 90px)",
        width: 350,
        backgroundColor: "#373636",
        paddingLeft: 20,
        paddingRight: 20,
        color: "#FFF",
        borderTop: "1px solid #403F3F",
        borderBottom: "1px solid #403F3F",
    },

});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class LeftPanel extends React.Component<Props, NoState>
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

export default withStyles(styles)(LeftPanel);