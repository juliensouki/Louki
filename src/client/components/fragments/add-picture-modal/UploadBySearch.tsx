import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#515151',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    text: {
      fontSize: '1.3rem',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    searchContainer: {
      width: '100%',
      marginTop: '0.5em',
      height: 400,
      padding: '0.5em',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    pictureContainer: {
      width: 'calc(33% - 2px)',
      height: 100,
      marginRight: 2,
      marginTop: 2,
      textAlign: 'center',
      backgroundColor: '#515151',
    },
    image: {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '100%',
    },
    searchButton: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface IProps extends WithStyles<typeof styles> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateUrl: (url: string) => void;
  searchText: string;
}

const ColorCircularProgress = withStyles({
  root: {
    color: '#FFB13B',
  },
})(CircularProgress);

@observer
class UploadBySearch extends React.Component<IProps, NoState> {
  @observable resultsArray: Array<string> = [];
  @observable loading: boolean = false;
  @observable currentUrl: string = '';

  search = () => {
    this.loading = true;
    fetch('/getResults?search=' + this.props.searchText)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.resultsArray = data;
        this.loading = false;
      });
  };

  organizeImages = (paths: Array<string>, imagePerLine: number): Array<Array<string>> => {
    const nbRows = Math.ceil((imagePerLine % (paths.length / imagePerLine) != 0 ? 1 : 0) + paths.length / imagePerLine);
    const rows: Array<Array<string>> = new Array(nbRows);
    let row: Array<string> = new Array(imagePerLine);
    let rowIndex = 0;

    for (let i = 0; i < paths.length; i++) {
      row[i % imagePerLine] = paths[i];
      if ((i != 0 && (i + 1) % imagePerLine == 0) || i + 1 == paths.length) {
        rows[rowIndex] = row;
        rowIndex++;
        row = [];
      }
    }
    return rows;
  };

  pickPicture = (imageUrl: string) => {
    this.currentUrl = imageUrl;
    this.props.updateUrl(imageUrl);
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == 'Enter') {
      this.search();
    }
  };

  render() {
    const { classes } = this.props;
    const imagePerLine = 3;
    const imageRows = this.organizeImages(this.resultsArray, imagePerLine);

    return (
      <div style={{ width: '100%' }} onKeyPress={this.handleKeyPress}>
        <Paper className={classes.root}>
          <IconButton type='submit' className={classes.iconButton} aria-label='search'>
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            value={this.props.searchText}
            onChange={this.props.onChange}
            placeholder='Search an image'
            inputProps={{ 'aria-label': 'Search an image' }}
          />
          <Button className={classes.searchButton} onClick={this.search}>
            Search
          </Button>
        </Paper>
        <Typography className={classes.text}>
          Search done thanks to
          <a href='https://pixabay.com/' target='_blank' rel='noopener noreferrer' style={{ marginLeft: 5 }}>
            Pixabay
          </a>
        </Typography>
        <div className={classes.searchContainer}>
          {this.loading ? (
            <Grid container alignItems='center' justify='center' style={{ width: '100%', height: '100%' }}>
              <ColorCircularProgress size={30} thickness={5} />
            </Grid>
          ) : (
            imageRows.map((imageRow, index) => {
              return (
                <Grid
                  key={'row-' + index}
                  container
                  direction='row'
                  alignItems='flex-start'
                  justify='flex-start'
                  style={{ width: '100%' }}
                >
                  {imageRow.map((image, imageIndex) => {
                    return (
                      <div
                        onClick={() => {
                          this.pickPicture(image);
                        }}
                        key={'image-' + imageIndex}
                        className={classes.pictureContainer}
                        style={this.currentUrl == image ? { border: '1px solid #FFB13B' } : {}}
                      >
                        <img className={classes.image} src={image}></img>
                      </div>
                    );
                  })}
                </Grid>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UploadBySearch);
