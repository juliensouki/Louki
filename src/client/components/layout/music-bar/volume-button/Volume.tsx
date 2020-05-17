import * as React from 'react';
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

const Volume: React.FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) => {
  const { classes, handleClose, anchorEl } = props;
  const open = anchorEl != null;

  const handleChange = (event: any, newValue: number | number[]) => {
    MusicPlayer.setAudioLevel(newValue as number);
    event.stopPropagation();
  };

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
      onClose={handleClose}
      disableRestoreFocus
    >
      <Slider value={MusicPlayer.volume} onChange={handleChange} orientation='vertical' />
    </Popover>
  );
};

export default withStyles(styles)(Volume);
