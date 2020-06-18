import * as React from 'react';
import { observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';

import Button from '../../utils/form-controls/Button';
import Modal from '../../utils/modal/Modal';
import NewAccount from './NewAccount';
import FirstUsage from './FirstUsage';
import Pixabay from './Pixabay';
import AcceptLocalStorage from './AcceptLocalStorage';

import SetupForm from '../../../store/forms/SetupForm';
import Loading from '../../../store/loading/Loading';

interface Props {
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

  componentDidMount() {
    SetupForm.init();
  }

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
    const buttonsArrays = [
      [<Button key={0} onClick={this.nextStep} type='save' text='Next' />],
      [
        <Button key={0} onClick={this.previousStep} type='cancel' text='Previous' />,
        <Button key={1} disabled={SetupForm.username.length == 0} onClick={this.nextStep} type='save' text='Next' />,
      ],
      [
        <Button key={0} onClick={this.previousStep} type='cancel' text='Previous' />,
        <Button key={1} onClick={this.nextStep} type='save' text='Next' />,
      ],
      [
        <Button key={0} onClick={this.previousStep} type='cancel' text='Previous' />,
        <Button key={1} onClick={this.validation} type='save' text='Enjoy Louki' />,
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

export default SetupModal;
