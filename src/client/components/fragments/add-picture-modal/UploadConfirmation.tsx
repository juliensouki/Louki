import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Grid } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.3rem',
    },
    imgContainer: {
      marginTop: '1em',
      width: 200,
      height: 120,
      textAlign: 'center',
      backgroundColor: '#515151',
    },
    image: {
      width: 'auto',
      maxWidth: '100%',
      height: '100%',
    },
  });

interface IProps extends WithStyles<typeof styles> {
  loaded: boolean;
  onLoad: () => void;
  url: string;
  onError: () => void;
  error: boolean;
}

const ColorCircularProgress = withStyles({
  root: {
    color: '#FFB13B',
  },
})(CircularProgress);

@observer
class UploadConfirmation extends React.Component<IProps, NoState> {
  @observable image: HTMLImageElement;

  componentDidMount() {
    this.image = new Image();
    this.image.src = this.props.url;
    this.image.onload = this.props.onLoad;
    this.image.onerror = this.props.onError;
  }

  render() {
    const { loaded, error, url, classes } = this.props;

    if (!loaded && !error) {
      return (
        <Grid container alignItems='center' justify='center'>
          <ColorCircularProgress size={30} thickness={5} />
        </Grid>
      );
    } else if (error == false) {
      return (
        <Grid container direction='column'>
          <Typography className={classes.text}>Do you want to load this picture ?</Typography>
          <div className={classes.imgContainer}>
            <img className={classes.image} src={url}></img>
          </div>
        </Grid>
      );
    } else {
      return <Typography className={classes.text}>{"Couldn't find the image, please try again."}</Typography>;
    }
  }
}

export default withStyles(styles)(UploadConfirmation);
