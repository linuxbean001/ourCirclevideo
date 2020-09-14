import React from 'react';

import './CreateEventForm.scss'

// import DateInput from '../DateInput/DateInput';
// import TimeInput from '../TimeInput/TimeInput';



const CreateEventForm = ({
  submitEventInformation, 
  eventName, 
  handleChangeEventName,
  numOfAttendees,
  handleChangeNumOfAttendees,
  seatsPerTable,
  handleChangeSeatsPerTable,
  eventDate,
  handleEventDate,
  handleEventStart,
  handleEventEnd
}) => {

  return(
    <div className='create-event-form'>
      <div className="inside-container">
        <div className='form-title'> Create an Event </div>
        <div className='body'>
          Create a lobby space to present, connect, and facilitate table-side conversations.
        </div>
        <form className="form" onSubmit={submitEventInformation}>
          <div className='input-section'>
            <label className='label'> Event Name: </label>
            <input
              className="input"
              type="text"
              id="eventName"
              value={eventName}
              onChange={handleChangeEventName}
              placeholder='Enter Your Event Name'
              maxLength={30}
              required
            />
          </div>
          <div className='input-section event-layout'>
            <div className='event-layout-item attendees'>
              <label className='label'> Number of Attendees: </label>
              <input
                className="input"
                type="number"
                id="numOfAttendees"
                value={numOfAttendees}
                onChange={handleChangeNumOfAttendees}
                min="25" 
                max="100"
                required
              />
            </div>
            <div className='event-layout-item seats-per-table'>
              <label className='label'> Seats Per Table: </label>
              <select className='input' value={seatsPerTable} onChange={handleChangeSeatsPerTable}>            
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
              </select>
            </div>
          </div>
          {/* <div className='input-section'>
          <label className='label'> Event Date and Time: </label>
            <div className='date-and-time-container'>
              <div className='date-container'>
                <DateInput
                  handleEventDate={handleEventDate}
                  eventDate={eventDate}
                />
              </div>
              <div className='time-container'>
                <TimeInput 
                  handleEventStart={handleEventStart}
                  handleEventEnd={handleEventEnd}
                />
              </div>
            </div>
          </div> */}
          <div className='submit'>
            <input className="submit-button" name="commit" type="submit" value="CREATE" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEventForm;