import React from 'react';

import './EventSummaryForm.scss'

const EventSummaryForm = ({
  eventName, 
  sessionId,
  sessionPassword,
  hostId,
  activateEvent,
}) => {

  return(
    <div className='event-summary-form'>
      <div className="inside-container">
        <div className='form-title'> Event Summary </div>
        <div className='body'>
          The Session ID and Session Password should be sent to your attendees for event access.<br></br>
          You can also view created events in your Profile page at a later date.
        </div>
        <form className="form" onSubmit={activateEvent}>
          <div className='info-section'>
            <label className='label'>Event Name: </label>
            <div className='description'>{eventName}</div>
          </div>
          <div className='info-section'>
            <label className='label'> Session ID: </label>
            <div className='description'>{sessionId}</div>
          </div>
          <div className='info-section'>
            <label className='label'> Session Password: </label>
            <div className='description'>{sessionPassword}</div>
          </div>
          <div className='info-section'>
            <label className='label'> Host ID: </label>
            <div className='description'>{hostId}</div>
          </div>
          <div className='submit'>
            <input className="submit-button" name="commit" type="submit" value="JOIN" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventSummaryForm;