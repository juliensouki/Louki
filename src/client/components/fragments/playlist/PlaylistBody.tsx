import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        marginLeft: 20,
        width: "calc(100% - 40px)",
        height: "calc(100% - 280px)",
        marginTop: 20,
        backgroundColor: "blue",
        [theme.breakpoints.down("xs")]: {
            height: "calc(100% - 240px)",
        }
    },
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class PlaylistBody extends React.Component<Props, NoState>
{
  render()
  {
    const { classes } = this.props;

    return (
        <div className={classes.root}></div>
    );
  }
};

export default withStyles(styles)(PlaylistBody);