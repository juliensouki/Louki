import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import SearchField from '../../utils/SearchField';
import Loader from '../../utils/Loader';

import texts from '../../../lang/modals/add-picture-modal';
import { PixabaySearch, PixabaySearchResponse } from '../../../requests/Pixabay';

const styles = (theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.3rem',
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
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    pictureContainer: {
      width: 'calc(33% - 2px)',
      height: 100,
      marginRight: 2,
      marginTop: 2,
      textAlign: 'center',
      backgroundColor: '#515151',
      [theme.breakpoints.down('sm')]: {
        height: 70,
      },
    },
    image: {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '100%',
    },
  });

interface Props extends WithStyles<typeof styles> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateUrl: (url: string) => void;
  searchText: string;
}

@observer
class UploadBySearch extends React.Component<Props, NoState> {
  @observable resultsArray: Array<string> = [];
  @observable loading: boolean = false;
  @observable currentUrl: string = '';

  search = () => {
    this.loading = true;
    PixabaySearch(this.props.searchText).then((results: PixabaySearchResponse) => {
      if (results.error == null) {
        this.resultsArray = results.data;
      } else {
        //add notification
      }
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

  render() {
    const { classes } = this.props;
    const imagePerLine = 3;
    const imageRows = this.organizeImages(this.resultsArray, imagePerLine);
    const T = texts.current;

    return (
      <div style={{ width: '100%' }}>
        <SearchField
          buttonText={T.searchButton}
          placeholder={T.searchPlaceholder}
          value={this.props.searchText}
          onChange={this.props.onChange}
          onSearch={this.search}
        />
        <Typography className={classes.text}>
          {T.credits}
          <a href='https://pixabay.com/' target='_blank' rel='noopener noreferrer' style={{ marginLeft: 5 }}>
            Pixabay
          </a>
        </Typography>
        <div className={classes.searchContainer}>
          {this.loading ? (
            <Grid container alignItems='center' justify='center' style={{ width: '100%', height: '100%' }}>
              <Loader size={30} thickness={5} />
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
                      <Grid
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                        onClick={() => {
                          this.pickPicture(image);
                        }}
                        key={'image-' + imageIndex}
                        className={classes.pictureContainer}
                        style={this.currentUrl == image ? { border: '1px solid #FFB13B' } : {}}
                      >
                        <img className={classes.image} src={image}></img>
                      </Grid>
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
