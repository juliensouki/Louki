import * as React from 'react';
import { observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';

import Button from '../../utils/Button';
import Modal from '../../utils/Modal';

import UploadMethod from './UploadMethod';
import UploadByUrl from './UploadByUrl';
import UploadBySearch from './UploadBySearch';
import UploadConfirmation from './UploadConfirmation';

import texts from '../../../lang/modals/add-picture-modal';

import NewPlaylistForm from '../../../store/forms/NewPlaylistForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

enum AddPictureSteps {
  UPLOAD_METHOD = 0,
  UPLOAD_BY_URL = 1,
  UPLOAD_BY_SEARCH = 2,
  UPLOAD_CONFIRMATION = 3,
}

@observer
class AddPlaylistModal extends React.Component<Props, NoState> {
  @observable step: AddPictureSteps = AddPictureSteps.UPLOAD_METHOD;
  @observable prevStep: AddPictureSteps = AddPictureSteps.UPLOAD_METHOD;
  @observable url: string = '';
  @observable confirmationLoaded: boolean = false;
  @observable error: boolean = false;
  @observable searchText: string = '';

  @computed get buttons(): Array<JSX.Element> {
    const T = texts.current;

    if (this.step == AddPictureSteps.UPLOAD_METHOD) {
      return [<Button onClick={this.onClose} type='cancel' text={T.cancel} key={0} />];
    } else if (this.step == AddPictureSteps.UPLOAD_BY_URL || this.step == AddPictureSteps.UPLOAD_BY_SEARCH) {
      return [
        <Button key={0} type='cancel' onClick={this.previousStep} text={T.back} />,
        <Button key={1} type='save' disabled={!this.UrlRegExp} onClick={this.nextStep} text={T.next} />,
      ];
    }
    return [
      <Button key={0} type='cancel' onClick={this.tryAgain} disabled={!this.confirmationLoaded} text={T.tryAgain} />,
      <Button
        key={1}
        type='save'
        onClick={this.submit}
        disabled={!this.confirmationLoaded || this.error}
        text={T.yes}
      />,
    ];
  }

  @action handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.searchText = event.target.value;
  };

  @action updateUrl = (url: string) => {
    this.url = url;
  };

  @action onError = () => {
    this.confirmationLoaded = true;
    this.error = true;
  };

  @action tryAgain = () => {
    this.step = this.prevStep;
  };

  @action confirmationHasLoaded = () => {
    this.confirmationLoaded = true;
  };

  @action nextStep = () => {
    this.prevStep = this.step;
    this.confirmationLoaded = false;
    this.error = false;
    this.step = AddPictureSteps.UPLOAD_CONFIRMATION;
  };

  @action previousStep = () => {
    this.url = '';
    this.prevStep = this.step;
    this.step = AddPictureSteps.UPLOAD_METHOD;
  };

  @action handleUrl = () => {
    this.prevStep = this.step;
    this.step = AddPictureSteps.UPLOAD_BY_URL;
  };

  @action handleSearch = () => {
    this.prevStep = this.step;
    this.step = AddPictureSteps.UPLOAD_BY_SEARCH;
  };

  @action onClose = () => {
    this.props.onClose();
    this.prevStep = AddPictureSteps.UPLOAD_METHOD;
    this.step = AddPictureSteps.UPLOAD_METHOD;
  };

  @action handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.url = event.target.value;
  };

  @action submit = () => {
    NewPlaylistForm.setPictureUrl(this.url);
    this.step = AddPictureSteps.UPLOAD_METHOD;
    this.props.onClose();
  };

  @computed get UrlRegExp() {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return this.url.match(regex);
  }

  render() {
    const { open } = this.props;
    let stepComponent: JSX.Element;

    if (this.step == AddPictureSteps.UPLOAD_METHOD) {
      stepComponent = <UploadMethod handleUrl={this.handleUrl} handleSearch={this.handleSearch} />;
    } else if (this.step == AddPictureSteps.UPLOAD_BY_URL) {
      stepComponent = <UploadByUrl onChange={this.handleUrlChange} url={this.url} isValid={this.UrlRegExp != null} />;
    } else if (this.step == AddPictureSteps.UPLOAD_BY_SEARCH) {
      stepComponent = (
        <UploadBySearch onChange={this.handleSearchText} searchText={this.searchText} updateUrl={this.updateUrl} />
      );
    } else {
      stepComponent = (
        <UploadConfirmation
          loaded={this.confirmationLoaded}
          onLoad={this.confirmationHasLoaded}
          url={this.url}
          onError={this.onError}
          error={this.error}
        />
      );
    }

    const T = texts.current;

    return (
      <Modal
        open={open}
        onClose={this.onClose}
        title={this.step == AddPictureSteps.UPLOAD_CONFIRMATION ? T.confirmation : T.title}
        buttons={this.buttons}
      >
        {stepComponent}
      </Modal>
    );
  }
}

export default AddPlaylistModal;
