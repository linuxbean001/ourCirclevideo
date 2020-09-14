import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectRemovedFromEvent } from '../../redux/eventAccess/eventAccess.selectors';
import { setRemovedStateToDefault } from '../../redux/eventAccess/eventAccess.actions'

import './RemovedFromSessionModal.scss';

const RemovedFromSessionModal = ({
  removedFromEvent,
  setRemovedStateToDefault
}) => {

  const modalSubmit = (e) => {
    e.preventDefault();
    setRemovedStateToDefault()
  }

    return (
      <div className='removed-modal-page'>
        <div className='modal'>
          <h1 className='form-title'>{`The Host has ${removedFromEvent.reason} the event.`}</h1>
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
  removedFromEvent: selectRemovedFromEvent
})

const mapDispatchToProps = dispatch => ({
 setRemovedStateToDefault: () => dispatch(setRemovedStateToDefault())
})

export default connect(mapStateToProps, mapDispatchToProps)(RemovedFromSessionModal);