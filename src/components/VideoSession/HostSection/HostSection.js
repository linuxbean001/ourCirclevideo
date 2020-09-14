import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './HostSection.scss';

import { selectUsers, selectEventData } from '../../../redux/eventData/eventData.selectors';
import { selectSessionId } from '../../../redux/eventAccess/eventAccess.selectors';
import { selectSocket } from '../../../redux/socket/socket.selectors';

import Host from '../Host';
import HostControls from './HostControls/HostControls';
import AttendeesSummary from '../AttendeesSummary/AttendeesSummary';

const HostSection = ({
  eventData,
  users,
  sessionId,
  socket
}) => {

  const setPositionAsHost = (e) => {
    e.stopPropagation();
    let {
      session,
      id,
      publisher
    } = eventData;

    let currentPosition = eventData.position;

    if(currentPosition.table !== -2 || currentPosition.seat !== -2){
      socket.emit('set-position', {
        sessionId: sessionId,
        id: id,
        table: -2,
        seat: -2
      })
      if (session && publisher){
        session.publish(publisher)
      }
    }
  }

  const renderHost = () => {
    let hosts = [];
    let usersCopy = [...users];

    if (eventData.position.seat === -2){
      hosts.push(
        <React.Fragment key={1}>
          <div 
          className='host-video-container host-video-container-lobby'>
            <Host 
              stream={eventData.fullScreenMode ? null : eventData.publisher}
              isVisible={eventData.isVisible}
            />
          </div>
          <div className='host-controls-and-attendees-summary'>
            <div className='attendees-summary-container'>
              <AttendeesSummary />
            </div>
            {
              eventData.connectionId &&
              <div className='host-controls-container'>
                <HostControls />
              </div>
            }
          </div>
        </React.Fragment>
      )
    }
    else{
      let found=false;
      usersCopy.forEach((user) => {
        if (user.position && user.position.seat === -2){
          hosts.push(
            <div 
              className={`host-video-container ${user.zoomed? 'host-video-container-table' : 'host-video-container-lobby'}`}
              key={1}
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
            key={1}
            onClick = {(e) => setPositionAsHost(e)}
            style={{
              cursor: "pointer"
            }}
          >
            <Host />
          </div>
        )
      }
    }
    return hosts;
  }

  return (
    <div className='grid-item-host'>
      <div className='host'>
        { renderHost() }
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  eventData: selectEventData,
  sessionId: selectSessionId,
  socket: selectSocket
})



export default connect(mapStateToProps)(HostSection);