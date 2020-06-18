import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import texts from '../../../lang/modals/add-picture-modal';
import Loader from '../../utils/loading/Loader';

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
      height: 'auto',
      maxHeight: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> {
  loaded: boolean;
  onLoad: () => void;
  url: string;
  onError: () => void;
  error: boolean;
}

@observer
class UploadConfirmation extends React.Component<Props, NoState> {
  @observable image: HTMLImageElement;

  componentDidMount() {
    this.image = new Image();
    this.image.src = this.props.url;
    this.image.onload = this.props.onLoad;
    this.image.onerror = this.props.onError;
  }

  render() {
    const { loaded, error, url, classes } = this.props;
    const T = texts.current;

    if (!loaded && !error) {
      return (
        <Grid container alignItems='center' justify='center'>
          <Loader size={30} thickness={5} />
        </Grid>
      );
    } else if (error == false) {
      return (
        <Grid container direction='column'>
          <Typography className={classes.text}>{T.confirmationMessage}</Typography>
          <div className={classes.imgContainer}>
            <img className={classes.image} src={url}></img>
          </div>
        </Grid>
      );
    } else {
      return <Typography className={classes.text}>{T.error}</Typography>;
    }
  }
}

export default withStyles(styles)(UploadConfirmation);
