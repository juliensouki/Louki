import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistBodyDesktop from './PlaylistBodyDesktop';
import PlaylistBodyMobile from './PlaylistBodyMobile';
import ResponsiveAdapter from '../../utils/ResponsiveAdapter';

const styles = (theme: Theme) => createStyles({
    '@global': {
        '.MuiTableCell-root': {
            padding: 8,
        },
    },
    root: {
        marginLeft: 20,
        width: "calc(100% - 40px)",
        height: "calc(100% - 280px)",
        marginTop: 20,
        [theme.breakpoints.down("xs")]: {
            height: "calc(100% - 240px)",
        }
    },
    table: {
    },
    rowTitles: {
        fontWeight: "bolder",
        textTransform: "uppercase",
        fontSize: 16,
        color: theme.palette.primary.main,
    },
    tableRow: {
        color: theme.palette.primary.main,        
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
            <div className={classes.root}>
                <ResponsiveAdapter mobile={
                    <PlaylistBodyMobile playlist={null}/>
                }
                desktop={
                    <PlaylistBodyDesktop playlist={null}/>
                }/>
            </div>
        );
    }
};

export default withStyles(styles)(PlaylistBody);