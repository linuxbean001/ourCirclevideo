import React from 'react';

import './ActiveEventIcon.scss';

const ActiveEventIcon = ({
  eventActiveState,
  inModal
}) => {
  return (
    <div className={`active-state 
      ${eventActiveState? 'active' : 'inactive'}
      ${inModal? 'in-modal' : 'not-in-modal'}
      `} 
    >
      {
        eventActiveState
        ?'Active'
        :'Inactive'
      }
    </div>
  )
}

export default ActiveEventIcon;