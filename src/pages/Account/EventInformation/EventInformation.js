import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectExistingEventInfo } from '../../../redux/user/user.selectors';

import ExistingEvent from '../../../components/ExistingEvent/ExistingEvent';
import EventModal from '../EventModal/EventModal';

import './EventInformation.scss';

const EventInformation = ({
  existingEventInfo
}) => {

  const [accessEventModal, setAccessEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAccessEventModal = (sessionId) => {
    let idx = existingEventInfo.findIndex((event) => {
      return event.sessionId === sessionId;
    })
    setSelectedEvent(existingEventInfo[idx]);
    setAccessEventModal(true);
  }

  const handleEventModalClose = () => {
    setAccessEventModal(false);
    setSelectedEvent(null);
  }

  return(
    <>
      <div className="event-information">
        <div className="inside-container">
          <h1 className='title'> Existing events </h1>
          {
            existingEventInfo.length > 0
            ?
              <>
              {
                existingEventInfo.map((event, index) => {
                  return <ExistingEvent 
                    key={index}
                    eventInfo={event}
                    handleAccessEventModal={handleAccessEventModal}
                  />
                })
              }
              </>
            :
              <div className='no-existing-events'>
                You have no existing events
              </div>
          }
        </div>
        {
        accessEventModal &&
        <EventModal
          handleEventModalClose={handleEventModalClose}
          eventInfo={selectedEvent}
        />
      }
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  existingEventInfo: selectExistingEventInfo
})


export default connect(mapStateToProps)(EventInformation);