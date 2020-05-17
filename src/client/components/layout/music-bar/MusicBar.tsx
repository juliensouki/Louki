import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import MusicBarDesktop from './MusicBarDesktop';
import MusicBarMobile from './MusicBarMobile';

const styles = (theme: Theme) => createStyles({});

@observer
class MusicBar extends React.Component<WithStyles, NoState> {
  render() {
    const { classes } = this.props;

    return <ResponsiveAdapter desktop={<MusicBarDesktop />} mobile={<MusicBarMobile />} breakpoint='sm' />;
  }
}

export default withStyles(styles)(MusicBar);