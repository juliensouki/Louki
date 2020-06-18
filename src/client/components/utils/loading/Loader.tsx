import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const ColorCircularProgress = withStyles({
  root: {
    color: '#FFB13B',
  },
})(CircularProgress);

export default ColorCircularProgress;
