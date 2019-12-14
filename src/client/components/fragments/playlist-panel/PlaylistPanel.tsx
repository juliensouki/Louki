import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        position: "absolute",
        top: 60,
        left: 390,
        height: "calc(100% - 60px - 80px)",
        width: "calc(100% - 390px)",
        backgroundColor: "black",
        color: "#FFF",
        overflow: "auto",
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
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
};

export default withStyles(styles)(PlaylistPanel);