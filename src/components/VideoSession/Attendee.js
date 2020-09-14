import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VideoPlayer from './VideoPlayer';

import { selectEventData } from '../../redux/eventData/eventData.selectors';

import defaultPicture from '../../assets/defaultPicture.png';


const Attendee = ({
  occupied,
  stream,
  isVisible,
  profilePicture,
  username,
  eventData
}) => {

  return (
    <>
      {
        occupied? 
          <div className='user'>
            <>
            {
              stream
              ? 
              <>
                <VideoPlayer stream={stream} videoType={"circle-video"} />
                {
                  !isVisible &&
                  <img src={profilePicture || defaultPicture} alt='' />
                }
              </>
              : 
              <img src={profilePicture || defaultPicture} alt='' />
            }
            </>
            <div className='user-name'>
              { username }
            </div>
          </div>
        :
        <div className='unoccupied'>
          {
            (eventData.position.seat === -1)
            ? <div className='select-your-circle'>Select Your Circle</div>
            : null
          }
        </div>
      }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData
})

export default connect(mapStateToProps)(Attendee);