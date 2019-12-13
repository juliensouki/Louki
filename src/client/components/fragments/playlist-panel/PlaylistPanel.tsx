import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import PlaylistHeader from '../playlist/PlaylistHeader';
import PlaylistBody from '../playlist/PlaylistBody';
import SearchContainer from '../playlist/SearchContainer';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        top: 60,
        left: 390,
        height: "calc(100% - 60px - 80px)",
        width: "calc(100% - 390px)",
        backgroundColor: "black",
        color: "#FFF",
        [theme.breakpoints.down('sm')]: {
          width: "100%",
          left: 0,
        },
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
            alignItems="flex-start"            
            direction="column"
            className={classes.root}>
            <PlaylistHeader/>
            <SearchContainer/>
            <PlaylistBody/>
        </Grid>
    );
  }
};

export default withStyles(styles)(PlaylistPanel);