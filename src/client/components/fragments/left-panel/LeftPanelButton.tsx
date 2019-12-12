import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        marginTop: 15,
        width: "calc(100% - 40px)",
        color: theme.palette.primary.main,
        transition: "color .5s ease-in-out",
        '&:hover': {
            cursor: "pointer",
            color: theme.palette.primary.light,
        },
    },
});

interface Props extends WithStyles<typeof styles>
{
    text: string,
    icon: JSX.Element,
};

@observer
class LeftPanelButton extends React.Component<Props, NoState>
{
  render()
  {
    const { classes } = this.props;

    return (
        <Grid 
            container 
            direction="row"
            className={classes.root}>
            <Grid item style={{marginRight: 5}}>
                {this.props.icon}
            </Grid>
            <Grid item>
                <Typography>{this.props.text}</Typography>
            </Grid>
        </Grid>
    );
  }
};

export default withStyles(styles)(LeftPanelButton);