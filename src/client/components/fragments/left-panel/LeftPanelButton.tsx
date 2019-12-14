import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    '@global': {
        'a':  { 
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
    },
    root: {
        marginTop: 15,
        width: "calc(100% - 40px)",
        color: "inherit",
        fontWeight: "inherit",
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
    routePath: string,
};

@observer
class LeftPanelButton extends React.Component<Props, NoState>
{
  render()
  {
    const { classes, routePath } = this.props;

    return (
        <NavLink 
            to={routePath} 
            activeStyle={{ textDecoration: 'none', fontWeight: "bolder", color: "#FFF" }}>
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
        </NavLink>
    );
  }
};

export default withStyles(styles)(LeftPanelButton);