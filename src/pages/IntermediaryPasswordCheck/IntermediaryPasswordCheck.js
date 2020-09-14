import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './IntermediaryPasswordCheck.scss';

import { selectPasswordCorrect, selectEventAccess } from '../../redux/eventAccess/eventAccess.selectors';

import { joinEventStart } from '../../redux/eventAccess/eventAccess.actions';
import { openGeneralModal } from '../../redux/general/general.actions';

import { fetchEventInformationStart } from '../../redux/eventData/eventData.actions';

import Session from '../../components/VideoSession/Session';
import PasswordCheckForm from './PasswordCheckForm/PasswordCheckForm';

import { isLegacyEdge } from "react-device-detect";

const IntermediaryPasswordCheck = ({
  match,
  passwordCorrect,
  joinEventStart,
  eventAccess,
  fetchEventInformationStart,
  openGeneralModal
}) => {

  const [sessionId, setSessionId] = useState(match.params.sessionId);
  const [sessionPassword, setSessionPassword] = useState('');
  const [hostId, setHostId] = useState('');
  const [accessingHost, setAccessingHost] = useState(false);

  useEffect(() => {
    if (eventAccess.error !== null){
      if (eventAccess.error.message === 'unable to join event'){
        openGeneralModal({
          code: 0,
          modalText: "Sorry, we couldn't locate this Event. Please try again."
        })
      }
      else if (eventAccess.error.message === 'unable to fetch event information'){
        alert("There was an error joining the event. Please try again later.")
      }
      else if (eventAccess.error.message === 'Failed to fetch'){
        alert("There was an error joining the event. Please try again later.")
      }
    }
  }, [eventAccess.error])

  const handleChangeSessionPassword = (e) => {
    setSessionPassword(e.target.value);
  }

  const handleChangeHostId = (e) => {
    setHostId(e.target.value);
  }

  const handleAccessingHost = (e) => {
    if (e.target.value === 'true'){
      setAccessingHost(true);
    }
    else{
      setAccessingHost(false);
      setHostId('');
    }
  }


  const activateSession = (e) => {
    e.preventDefault();
    if (window.document.documentMode) {
      alert("Internet Explorer browser is not supported. Please use another internet browser to continue.");
    }
    else if (isLegacyEdge){
      alert("This version of Microsoft Edge is not supported. Please use the latest version of Microsoft Edge.");
    }
    else{
      joinEventStart({
        sessionId,
        sessionPassword,
        hostId
      })
    }
  }

  useEffect(() => {
    if (passwordCorrect){
      if (window.document.documentMode) {
        alert("Internet Explorer is not support by Circles Video. Please use another browser.");
      }
      else if (isLegacyEdge){
        alert("This version of Microsoft Edge is not supported. Please use the latest version of Microsoft Edge.");
      }
      else{
        fetchEventInformationStart({
          sessionId
        })
      }
    }
  }, [passwordCorrect, sessionId, fetchEventInformationStart])


  return(
    <>
      {
        !passwordCorrect
        ?
        <div className='intermediary-password-check'>
          <PasswordCheckForm
            activateSession={activateSession}
            sessionPassword={sessionPassword}
            handleChangeSessionPassword={handleChangeSessionPassword}
            hostId={hostId}
            handleChangeHostId={handleChangeHostId}
            accessingHost={accessingHost}
            handleAccessingHost={handleAccessingHost}
          />
        </div>
        :
        <>
          {
            eventAccess.eventInformationFetched &&
            <Session />
          }
        </>
      }
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  passwordCorrect: selectPasswordCorrect,
  eventAccess: selectEventAccess
})

const mapDispatchToProps = dispatch => ({
  joinEventStart: data => dispatch(joinEventStart(data)),
  fetchEventInformationStart: data => dispatch(fetchEventInformationStart(data)),
  openGeneralModal: data => dispatch(openGeneralModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(IntermediaryPasswordCheck);