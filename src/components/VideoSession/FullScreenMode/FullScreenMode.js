import React, {useEffect, useRef} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUsers, selectEventData } from '../../../redux/eventData/eventData.selectors';
import { updateFullScreenMode } from '../../../redux/eventData/eventData.actions';

import Host from '../Host';
import EventChatBox from '../EventChat/EventChatBox/EventChatBox';

import './FullScreenMode.scss';

const FullScreenMode = ({
  users,
  eventData,
  updateFullScreenMode
}) => {

  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    handleCloseFullScreenMode();
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);



  const renderHost = () => {
    let hosts = [];
    let usersCopy = [...users];

    if (eventData.position.seat === -2){
      hosts.push(
          <Host 
            key={1}
            stream={eventData.publisher}
            isVisible={eventData.isVisible}
          />
      )
    }
    else{
      let found=false;
      usersCopy.forEach((user) => {
        if (user.position && user.position.seat === -2){
          hosts.push(
              <Host
                key={1}
                stream={user.stream}
                isVisible={user.isVisible}
              />
          )
          found=true;
        }
      })
      if (!found){
        hosts.push(
            <Host key={1}/>
        )
      }
    }
    return hosts;
  }

  const handleCloseFullScreenMode = () => {
    updateFullScreenMode(false);
  }

  return (
    <div className='full-screen-mode'>
      <div className='video-and-chat-container' ref={node}>
        <div className='full-screen-video-container'>
          {renderHost()}
        </div>
        <div className='full-screen-event-chat'>
          <EventChatBox 
            location={'full-screen'}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  eventData: selectEventData
})

const mapDispatchToProps = dispatch => ({
  updateFullScreenMode: fullScreen => dispatch(updateFullScreenMode(fullScreen))
})

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenMode);