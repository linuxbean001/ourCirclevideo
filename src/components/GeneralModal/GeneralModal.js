import React from 'react';
import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeGeneralModal } from '../../redux/general/general.actions';
import { selectGeneralModal } from '../../redux/general/general.selectors'

import './GeneralModal.scss';

const GeneralModal = ({
  closeGeneralModal,
  generalModal,
  history
}) => {

  const modalSubmit = (e) => {
    e.preventDefault();
    switch(generalModal.code) {
      case 1:
        history.push('/signin');
        break;
      case 2:
        history.push('/pricing');
        break;
      default:
        // code block
    }
    closeGeneralModal();
  }

  return (
    <div className='general-modal-page'>
      <div className='modal'>
        <h1 className='form-title'> {generalModal.modalText} </h1>
        <form className='form' onSubmit={modalSubmit}>
          <div className='submit'>
            <input className="submit-button" name="submit" type="submit" value="OK" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  generalModal: selectGeneralModal
})

const mapDispatchToProps = dispatch => ({
  closeGeneralModal: () => dispatch(closeGeneralModal())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneralModal));