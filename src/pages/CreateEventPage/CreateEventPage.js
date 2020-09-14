import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './CreateEventPage.scss'

import { 
  selectIsSignedIn, 
  selectEmail,
  selectUser 
} from '../../redux/user/user.selectors';

import { openGeneralModal } from '../../redux/general/general.actions';

import { 
  selectPasswordCorrect, 
  selectSessionId, 
  selectEventAccess 
} from '../../redux/eventAccess/eventAccess.selectors'

import { 
  joinSession, 
  setEventAccessDefault, 
  createEventStart
} from '../../redux/eventAccess/eventAccess.actions';

import CreateEventForm from './CreateEventForm/CreateEventForm';
import EventSummaryForm from '../../components/EventSummaryForm/EventSummaryForm';
import Footer from '../../components/Footer/Footer'

import { isLegacyEdge } from "react-device-detect";


const CreateEventPage  = ({
  passwordCorrect, 
  email, 
  isSignedIn, 
  setEventAccessDefault,
  joinSession,
  history,
  sessionId,
  user,
  eventAccess,
  createEventStart,
  openGeneralModal
}) => {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  // const [eventStart, setEventStart] = useState('');
  // const [eventEnd, setEventEnd] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  const [numOfAttendees, setNumOfAttendees] = useState(25);
  const [seatsPerTable, setSeatsPerTable] = useState(4);

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
  }, [passwordCorrect, prevPasswordCorrect, sessionId, history]);

  useEffect(() => {
    if (eventAccess.error !== null){
      if (eventAccess.error.message === 'access denied'){
        console.log("ERRORR")
        alert("Access temporarily denied. Please email contact@circlesvideo.com for a demo.");
      }
      else if (eventAccess.error.message === 'unable to create event'){
        alert("There was an error creating the event. Please try again later.")
      }
      else if (eventAccess.error.message === 'Failed to fetch'){
        alert("There was an error creating the event. Please try again later.")
      }
    }
  }, [eventAccess.error])

  useEffect(() => {
        if (!isSignedIn){
            openGeneralModal({
                code: 1,
                modalText: "You must be signed in to create an event"
            })
        }
  }, [])

  const handleChangeEventName = (e) => {
    setEventName(e.target.value);
  }

  const handleEventDate = (date) => {
    setEventDate(date);
  }

  // const handleEventStart = (e) => {
  //   setEventStart(e._d);
  // }

  // const handleEventEnd = (e) => {
  //   setEventEnd(e._d);
  // }

  const handleChangeNumOfAttendees = (e) => {
    setNumOfAttendees(e.target.value)
  }

  const handleChangeSeatsPerTable = (e)=> {
    setSeatsPerTable(parseInt(e.target.value))
  };

  const submitEventInformation = (e) => {
    e.preventDefault();
    if (window.document.documentMode) {
      alert("Internet Explorer browser is not supported. Please use another internet browser to continue.");
    }
    else if (isLegacyEdge){
      alert("This version of Microsoft Edge is not supported. Please use the latest version of Microsoft Edge.");
    }
    else if (user.existingEventInfo.length >= 4){
      alert("You've reached your limit of 4 existing events. Please go to your Profile page to access or delete existing events.");
    }
    else if (user.plan !== 1){
      //setPricingPlanModalToggle(true);
      openGeneralModal({
        code: 2,
        modalText: "Please email us for a free trial, or purchase a plan."
      })
    }
    else{

      // let {eventStart, eventEnd, eventDate} = this.state;
  
      // let year = eventDate.getFullYear();
      // let month = eventDate.getMonth();
      // let date = eventDate.getDate();
  
      // let startTime = new Date(year, month, date, eventStart.getHours(), eventStart.getMinutes()).getTime();
      // let endTime = new Date(year, month, date, eventEnd.getHours(), eventEnd.getMinutes()).getTime();
  
      // if(startTime >= endTime){
      //   alert(`The event's end time must be after the start time`);
      // }
      // else if (startTime < new Date().getTime()){
      //   alert(`The event date cannot be in the past`);
      // }
        createEventStart({
          eventName: eventName,
          email: email,
          numOfAttendees: numOfAttendees,
          seatsPerTable: seatsPerTable
        })
    }
  }

  const activateEvent = (e) => {
    e.preventDefault();
    joinSession({
      host: true,
      sessionId: eventAccess.sessionId,
      passwordCorrect: true
    });
  }

  return (
    <>
      <div className='create-event-page'>
      {
        !eventAccess.eventCreated
        ?
        <CreateEventForm 
          submitEventInformation={submitEventInformation} 
          eventName={eventName}
          handleChangeEventName={handleChangeEventName}
          eventDate={eventDate} 
          handleEventDate={handleEventDate}
          // handleEventStart={handleEventStart}
          // handleEventEnd={handleEventEnd}
          numOfAttendees={numOfAttendees}
          handleChangeNumOfAttendees={handleChangeNumOfAttendees}
          handleChangeSeatsPerTable={handleChangeSeatsPerTable}
          seatsPerTable={seatsPerTable}
        />
        :
        <EventSummaryForm
          eventName={eventName}
          sessionId={eventAccess.sessionId}
          sessionPassword={eventAccess.sessionPassword}
          hostId={eventAccess.hostId}
          activateEvent={activateEvent}
          // startTime={startTime}
          // endTime={endTime}
        />
      }
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  isSignedIn: selectIsSignedIn,
  email: selectEmail,
  passwordCorrect: selectPasswordCorrect,
  sessionId: selectSessionId,
  user: selectUser,
  eventAccess: selectEventAccess
})

const mapDispatchToProps = dispatch => ({
  joinSession: eventData => dispatch(joinSession(eventData)),
  setEventAccessDefault: () => dispatch(setEventAccessDefault()),
  createEventStart: (data) => dispatch(createEventStart(data)),
  openGeneralModal: (data) => dispatch(openGeneralModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);