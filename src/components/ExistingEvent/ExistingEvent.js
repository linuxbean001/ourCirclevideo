import React from 'react';

import './ExistingEvent.scss';

import ActiveEventIcon from '../ActiveEventIcon/ActiveEventIcon';

const ExistingEvent = ({
  eventInfo,
  handleAccessEventModal
}) => {

  return(
    <div 
      className='existing-event'
      onClick={() => handleAccessEventModal(eventInfo.sessionId)}
    >
      <div className='event-name'>
        { eventInfo.eventName }
      </div>
      <ActiveEventIcon 
        eventActiveState={eventInfo.active}
        inModal={false}
      />
    </div>
  )
}

export default ExistingEvent;