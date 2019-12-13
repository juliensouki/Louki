import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    playlist: any,
};

@observer
class PlaylistBodyDesktop extends React.Component<Props, NoState>
{
    render()
    {
        const { classes, playlist } = this.props;

        return (
            <Table aria-label="simple table">
                <TableHead className={classes.rowTitles}>
                <TableRow>
                    <TableCell className={classes.rowTitles}>Song</TableCell>
                    <TableCell className={classes.rowTitles}>Artist</TableCell>
                    <TableCell className={classes.rowTitles}>Album</TableCell>
                    <TableCell className={classes.rowTitles}>Duration</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {playlist.map(row => (
                    <TableRow key={row.song}>
                        <TableCell style={{color: "#FFF"}} component="th" scope="row">
                            {row.song}
                        </TableCell>
                        <TableCell style={{color: "#FFF"}}>{row.artist}</TableCell>
                        <TableCell className={classes.tableRow}>{row.album}</TableCell>
                        <TableCell className={classes.tableRow}>{row.duration}</TableCell>
                        <TableCell className={classes.tableRow} align="right">
                            <IconButton aria-label="options">
                                 <MoreVertIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        );
    }
};

export default withStyles(styles)(PlaylistBodyDesktop);
