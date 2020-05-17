import * as React from 'react';

import ResponsiveAdapter from '../../utils/ResponsiveAdapter';
import MusicBarDesktop from './MusicBarDesktop';
import MusicBarMobile from './MusicBarMobile';

const MusicBar: React.FunctionComponent<NoProps> = () => {
  return <ResponsiveAdapter desktop={<MusicBarDesktop />} mobile={<MusicBarMobile />} breakpoint='sm' />;
};

export default MusicBar;
