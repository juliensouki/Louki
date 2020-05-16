import * as React from 'react';
import { observer } from 'mobx-react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Popover, Slider } from '@material-ui/core';
import MusicPlayer from '../../../../store/features/MusicPlayer';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      overflow: 'hidden',
      marginLeft: -8,
      height: 80,
      marginBottom: 3,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
    },
  });

interface Props extends WithStyles<typeof styles> {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

@observer
class Volume extends React.Component<Props, NoState> {
  handleChange = (event: any, newValue: number | number[]) => {
    MusicPlayer.setAudioLevel(newValue as number);
    event.stopPropagation();
  };

  render() {
    const { classes, anchorEl } = this.props;
    const open = anchorEl != null;

    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.paper,
        }}
        onClose={this.props.handleClose}
        disableRestoreFocus
      >
        <Slider value={MusicPlayer.volume} onChange={this.handleChange} orientation='vertical' />
      </Popover>
    );
  }
}

export default withStyles(styles)(Volume);
