import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.3rem',
    },
    button: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      textTransform: 'none',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    divider: {
      width: '100%',
      margin: '3em',
      marginLeft: 0,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  handleUrl: () => void;
  handleSearch: () => void;
}

@observer
class UploadMethod extends React.Component<IProps, NoState> {
  render() {
    const { classes, handleUrl, handleSearch } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.text} style={{ marginBottom: '1em' }}>
          Add a new picture using one of the following ways :
        </Typography>
        <Button className={classes.button} onClick={handleUrl}>
          <SearchIcon style={{ marginRight: '0.7em' }} /> Upload
        </Button>
        <Typography className={classes.text} style={{ display: 'inline-block' }}>
          a picture using a url
        </Typography>
        <Divider className={classes.divider} />
        <Button className={classes.button} onClick={handleSearch}>
          <ImageSearchIcon style={{ marginRight: '0.7em' }} /> Search
        </Button>
        <Typography className={classes.text} style={{ display: 'inline-block' }}>
          and upload a picture directly from Louki
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UploadMethod);
