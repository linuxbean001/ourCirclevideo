import React, { useEffect, useRef } from 'react';
import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './EventModal.scss';

import { 
  selectExistingEventInfo, 
  selectEmail, 
  selectUser 
} from '../../../redux/user/user.selectors';
import { 
  changeActiveStateStart,
  deleteEventStart
 } from '../../../redux/user/user.actions';

import { joinSession, setEventAccessDefault } from '../../../redux/eventAccess/eventAccess.actions';
import { selectPasswordCorrect } from '../../../redux/eventAccess/eventAccess.selectors';

import ActiveEventIcon from '../../../components/ActiveEventIcon/ActiveEventIcon'

const EventModal = ({
  handleEventModalClose,
  eventInfo,
  existingEventInfo,
  email,
  joinSession,
  passwordCorrect,
  setEventAccessDefault,
  history,
  changeActiveStateStart,
  user,
  deleteEventStart
}) => {

const usePrevious = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = passwordCorrect;
  });
  return ref.current;
}

const prevPasswordCorrect = usePrevious();

useEffect(() => {
  setEventAccessDefault();
}, [setEventAccessDefault]);

useEffect(() => {
  if (prevPasswordCorrect===false && passwordCorrect){
    history.push(`/session/${eventInfo.sessionId}`);
  }
}, [prevPasswordCorrect, passwordCorrect, history, eventInfo.sessionId]);

useEffect(() => {
  if (user.error !== null){
    if (user.error.message === 'error changing active state'){
      alert("Error changing active state.")
    }
    else if (user.error.message === 'error deleting event'){
      alert("Error deleting event.")
    }
  }
}, [user.error])

const changeActiveState = () => {
  changeActiveStateStart({
    sessionId: eventInfo.sessionId,
    active: !eventInfo.active,
    existingEventInfo,
    eventInfo
  })
}

const deleteEvent = () => {
  let existingEventInfoTemp = [...existingEventInfo];
  let sessionIdArray = existingEventInfoTemp.filter(event => event.sessionId !== eventInfo.sessionId).map(event => event.sessionId);

  deleteEventStart({
    sessionId: eventInfo.sessionId,
    sessionIdArray,
    email,
    handleEventModalClose
  })
}

const joinEvent = () => {
  joinSession({
    host: true,
    sessionId: eventInfo.sessionId,
    passwordCorrect: true
  });
}

  return(
    <div className="event-modal-page">
      <div className='event-modal'>
      <div className='exit-icon' onClick={() => handleEventModalClose()}>
        &#10005;
      </div>
        <div className='title'> Event Admin Controls </div>
        <div className='event-details-container'>
          <div className='sub-title'>
            Event Details:
          </div>
          <div className='event-detail'>
            <span className='event-detail-label'>Event Name:&nbsp;</span>{eventInfo.eventName}
          </div>
          <div className='event-detail'>
            <span className='event-detail-label'>Session ID:&nbsp;</span>{eventInfo.sessionId}
          </div>
          <div className='event-detail'>
            <span className='event-detail-label'>Session Password:&nbsp;</span>{eventInfo.sessionPassword}
          </div>
          <div className='event-detail'>
            <span className='event-detail-label'>Host ID:&nbsp;</span>{eventInfo.hostId}
          </div>
        </div>
        <div className='event-controls-container'>
          <div className='sub-title'>
            Event Controls:
          </div>
          <div className='event-controls'>
            <div className='event-control join-control'>
              <div className='event-control-label'>
                Join event as host:
              </div>
              <div className='control-button' onClick={() => joinEvent()}>
                <div className='join-event'>Join</div>
              </div>
            </div>
            <div className='event-control'>
              <div className='event-control-label'>
                Current event active state:
              </div>
              <div className='control-button' onClick={() => changeActiveState()}>
                <ActiveEventIcon 
                  eventActiveState={eventInfo.active}
                  inModal={true}
                />
              </div>
            </div>
            <div className='event-control'>
              <div className='event-control-label'>
                Permanently delete event:
              </div>
              <div className='control-button' onClick={() => deleteEvent()}>
                <div className='delete'>Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  existingEventInfo: selectExistingEventInfo,
  email: selectEmail,
  passwordCorrect: selectPasswordCorrect,
  user: selectUser
})

const mapDispatchToProps = dispatch => ({
  joinSession: eventData => dispatch(joinSession(eventData)),
  setEventAccessDefault: () => dispatch(setEventAccessDefault()),
  changeActiveStateStart: (data) => dispatch(changeActiveStateStart(data)),
  deleteEventStart: (data) => dispatch(deleteEventStart(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventModal));