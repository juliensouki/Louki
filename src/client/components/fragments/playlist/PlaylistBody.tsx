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
  get playlist(): Array<any> 
  {
    return [
      {
        title: 'A Rush Of Blood to the Head',
        artist: 'Coldplay',
        album: 'A Rush Of Blood to the Head',
        duration: '3:14',
      },
      {
        title: 'Nice dream',
        artist: 'Radiohead',
        album: 'Rainbow',
        duration: '2:55',
      },
      {
        title: 'Time',
        artist: 'Hans Zimmer',
        album: 'Inception',
        duration: '4:13',
      },
      {
        title: 'Nils Frahm',
        artist: 'Says',
        album: 'Spaces',
        duration: '8:03',
      },
    ];
  }

  render()
  {
      const { classes } = this.props;
  
      return (
          <div className={classes.root}>
              <ResponsiveAdapter mobile={
                  <PlaylistBodyMobile playlist={this.playlist}/>
              }
              desktop={
                  <PlaylistBodyDesktop playlist={this.playlist}/>
              }/>
          </div>
      );
  }
}

export default withStyles(styles)(PlaylistBody);