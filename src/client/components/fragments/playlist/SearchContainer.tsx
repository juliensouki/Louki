import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

const styles = (theme: Theme) => createStyles({
    root: {
        width: "calc(100% - 40px)",
        padding: 5,
        marginLeft: 20,
    },
    searchIcon: {
        color: theme.palette.primary.main,
        display: "inline-block",
    },
    input: {
        color: theme.palette.primary.main,
        verticalAlign: "top",
        marginLeft: 10,
        marginTop: 2,
        backgroundColor: "transparent",
        border: "none",
        fontSize: 16,
        fontFamily: "Roboto",
        display: "inline-block",
    },
});

interface Props extends WithStyles<typeof styles>
{
};

@observer
class SearchContainer extends React.Component<Props, NoState>
{
  render()
  {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <SearchIcon className={classes.searchIcon}/>
            <input placeholder="Search" className={classes.input}/>
        </div>
    );
  }
};

export default withStyles(styles)(SearchContainer);