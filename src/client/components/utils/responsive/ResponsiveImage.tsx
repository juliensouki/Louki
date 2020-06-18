import * as React from 'react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    imageContainer: {
      backgroundColor: '#252525',
    },
    image: {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> {
  src: string;
  placeholderColor?: string;
  height: number | string;
  width: number | string;
}

const ResponsiveImage: React.FunctionComponent<Props> = (props: Props) => {
  const { classes, src, placeholderColor, height, width } = props;
  const customPlaceholderStyle = placeholderColor ? { backgroundColor: placeholderColor } : {};

  return (
    <div className={classes.imageContainer} style={{ height: height, width: width, ...customPlaceholderStyle }}>
      <img src={src} className={classes.image} />
    </div>
  );
};

export default withStyles(styles)(ResponsiveImage);
