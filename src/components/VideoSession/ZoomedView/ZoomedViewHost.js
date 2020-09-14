import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './ZoomedViewHost.scss';

import { selectUsers, selectEventData } from '../../../redux/eventData/eventData.selectors';

import Host from '../Host';

const ZoomedViewHost = ({users, eventData}) => {

  const renderHost = () => {
    let hosts=[];

    if (eventData.position.seat === -2){
      hosts.push(
        <React.Fragment key={1}>
          <div className='host-video-container host-video-container-table'>
            <Host 
              stream={eventData.fullScreenMode ? null : eventData.publisher}
              isVisible={eventData.isVisible}
            />
          </div>
        </React.Fragment>
      )
    }
    else{
      let found=false;
      users.forEach((user) => {
        if (user.position && user.position.seat === -2){
          hosts.push(
            <div 
              className={`host-video-container ${user.zoomed? 'host-video-container-table' : 'host-video-container-lobby'}`} 
              key={-2}
            >
              <Host
                stream={eventData.fullScreenMode ? null : user.stream}
                isVisible={user.isVisible}
              />
            </div>
          )
          found=true;
        }
      })
      if (!found){
        hosts.push(
          <div 
            className='host-video-container host-video-container-lobby' 
            key={-2}
          >
            <Host />
          </div>
        )
      }
    }
    return hosts;
  }

  return (
    <div className='host'>
      { renderHost() }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  eventData: selectEventData
})

export default connect(mapStateToProps)(ZoomedViewHost);