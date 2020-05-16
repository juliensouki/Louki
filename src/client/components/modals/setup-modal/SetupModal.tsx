import * as React from 'react';
import { observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '../../utils/Modal';
import NewAccount from './NewAccount';
import FirstUsage from './FirstUsage';
import Pixabay from './Pixabay';
import AcceptLocalStorage from './AcceptLocalStorage';

import SetupForm from '../../../store/forms/SetupForm';
import Loading from '../../../store/loading/Loading';

const styles = (theme: Theme) =>
  createStyles({
    cancelButton: {
      backgroundColor: '#9D9D9D',
      color: '#464646',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
    confirmButton: {
      backgroundColor: theme.palette.background.default,
      color: '#9D9D9D',
      textTransform: 'none',
      marginLeft: '1em',
      marginRight: '1em',
      fontSize: '1.3rem',
    },
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

enum SetupSteps {
  FIRST_USAGE = 0,
  NEW_ACCOUNT = 1,
  PIXABAY = 2,
  ACCEPT_LOCAL_STORAGE = 3,
}

@observer
class SetupModal extends React.Component<Props, NoState> {
  @observable currentStep: SetupSteps = SetupSteps.FIRST_USAGE;

  @action previousStep = () => {
    if (this.currentStep > SetupSteps.FIRST_USAGE) {
      this.currentStep--;
    }
  };

  @action nextStep = () => {
    if (this.currentStep < SetupSteps.ACCEPT_LOCAL_STORAGE) {
      this.currentStep++;
    }
  };
  @action validation = () => {
    SetupForm.submit().then(res => {
      if (res.status == 200) {
        Loading.reloadApp();
      }
    });
  };

  @computed get title(): string {
    const titles = ['Louki - First usage', 'Louki - New account', 'Louki - Web scraping', 'Louki - Authorization'];
    return titles[this.currentStep];
  }

  @computed get buttons(): Array<JSX.Element> {
    const classes = this.props.classes;
    const buttonsArrays = [
      [
        <Button key={0} onClick={this.nextStep} className={classes.confirmButton}>
          Next
        </Button>,
      ],
      [
        <Button key={0} onClick={this.previousStep} className={classes.cancelButton}>
          Previous
        </Button>,
        <Button
          key={1}
          disabled={SetupForm.username.length == 0}
          onClick={this.nextStep}
          className={classes.confirmButton}
        >
          Next
        </Button>,
      ],
      [
        <Button key={0} onClick={this.previousStep} className={classes.cancelButton}>
          Previous
        </Button>,
        <Button key={1} onClick={this.nextStep} className={classes.confirmButton}>
          Next
        </Button>,
      ],
      [
        <Button key={0} onClick={this.previousStep} className={classes.cancelButton}>
          Previous
        </Button>,
        <Button disabled={!SetupForm.checkbox} key={1} onClick={this.validation} className={classes.confirmButton}>
          Enjoy Louki
        </Button>,
      ],
    ];
    return buttonsArrays[this.currentStep];
  }

  @computed get displayStep(): JSX.Element {
    const array = [<FirstUsage key={0} />, <NewAccount key={1} />, <Pixabay key={2} />, <AcceptLocalStorage key={3} />];
    return array[this.currentStep];
  }

  render() {
    const { open } = this.props;

    return (
      <Modal open={open} title={this.title} buttons={this.buttons} steps={`${this.currentStep + 1}/4`} preventClosing>
        {this.displayStep}
      </Modal>
    );
  }
}

export default withStyles(styles)(SetupModal);
