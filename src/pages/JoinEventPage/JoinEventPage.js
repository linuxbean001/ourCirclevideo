import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './JoinEventPage.scss'

import { selectPasswordCorrect, selectEventAccess } from '../../redux/eventAccess/eventAccess.selectors';
import { setEventAccessDefault, joinEventStart } from '../../redux/eventAccess/eventAccess.actions';
import { openGeneralModal } from '../../redux/general/general.actions';

import JoinEventForm from './JoinEventForm/JoinEventForm';
import Footer from '../../components/Footer/Footer';

import { isLegacyEdge } from "react-device-detect";


const JoinEventPage = ({
  setEventAccessDefault,
  history,
  passwordCorrect,
  eventAccess,
  joinEventStart,
  openGeneralModal
}) => {

  const [sessionId, setSessionId] = useState('');
  const [sessionPassword, setSessionPassword] = useState('');
  const [hostId, setHostId] = useState('');
  const [accessingHost, setAccessingHost] = useState(false);

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
      history.push(`/session/${sessionId}`);
    }
  }, [passwordCorrect, sessionId, prevPasswordCorrect, history]);

  useEffect(() => {
    if (eventAccess.error !== null){
      if (eventAccess.error.message === 'unable to join event'){
        openGeneralModal({
          code: 0,
          modalText: "Sorry, we couldn't locate this Event. Please try again."
        })
      }
      else if (eventAccess.error.message === 'Failed to fetch'){
        alert("There was an error joining the event. Please try again later.")
      }
    }
  }, [eventAccess.error])


  const handleChangeSessionId = (e) => {
    setSessionId(e.target.value);
  }

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


  return(
    <>
      <div className='join-event-page'>
        <JoinEventForm 
          activateSession={activateSession} 
          sessionId={sessionId}
          handleChangeSessionId={handleChangeSessionId} 
          sessionPassword={sessionPassword}
          handleChangeSessionPassword={handleChangeSessionPassword}
          hostId={hostId}
          handleChangeHostId={handleChangeHostId}
          accessingHost={accessingHost}
          handleAccessingHost={handleAccessingHost}
        />
      </div>
      <Footer />
    </>
  )
}


  const mapStateToProps = createStructuredSelector({
    passwordCorrect: selectPasswordCorrect,
    eventAccess: selectEventAccess
  })

  const mapDispatchToProps = dispatch => ({
    setEventAccessDefault: () => dispatch(setEventAccessDefault()),
    joinEventStart: data => dispatch(joinEventStart(data)),
    openGeneralModal: data => dispatch(openGeneralModal(data))
  })

export default connect(mapStateToProps, mapDispatchToProps)(JoinEventPage);
