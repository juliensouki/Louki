import * as React from 'react';
import { observer } from 'mobx-react';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

import texts from '../../../lang/fragments/add-picture-modal';

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
    const T = texts.current;

    return (
      <React.Fragment>
        <Typography className={classes.text} style={{ marginBottom: '1em' }}>
          {T.helper}
        </Typography>
        <Button className={classes.button} onClick={handleUrl}>
          <SearchIcon style={{ marginRight: '0.7em' }} /> {T.upload}
        </Button>
        <Typography className={classes.text} style={{ display: 'inline-block' }}>
          {T.uploadText}
        </Typography>
        <Divider className={classes.divider} />
        <Button className={classes.button} onClick={handleSearch}>
          <ImageSearchIcon style={{ marginRight: '0.7em' }} /> {T.search}
        </Button>
        <Typography className={classes.text} style={{ display: 'inline-block' }}>
          {T.searchText}
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UploadMethod);
