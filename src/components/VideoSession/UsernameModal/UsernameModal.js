import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectEventData } from '../../../redux/eventData/eventData.selectors'

import './UsernameModal.scss';

const UsernameModal = ({
  usernameModalSubmit, 
  eventData, 
  username, 
  handleChangeUsername,
  socketReconnection
}) => {

    return (
      <div className='username-modal-page'>
        <div className='modal'>
          <h1 className='form-title'> Welcome To {eventData.eventName} </h1>
          <form className='form' onSubmit={usernameModalSubmit}>
            <div className='input-section'>
            {
              socketReconnection &&
              <div className='socket-disconnect'>
                You experienced a connection issue. Please enter your name and join again.
              </div>
            }
              <label className='label'>Attendee Name: </label>
              <input
                className="input"
                type="text"
                id="userName"
                value={username}
                onChange={handleChangeUsername}
                placeholder='Enter Your Name'
                maxLength={20}
                autoComplete="off"
                required
              />
            </div>
            <div className='submit'>
              <input className="submit-button" name="submit" type="submit" value="Join Event" />
            </div>
          </form>
        </div>
      </div>
    );
};

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData
})


export default connect(mapStateToProps)(UsernameModal);