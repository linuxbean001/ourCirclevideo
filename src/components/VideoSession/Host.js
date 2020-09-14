import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectEventData } from '../../redux/eventData/eventData.selectors';
import { selectHost } from '../../redux/eventAccess/eventAccess.selectors';
import { updateFullScreenMode } from '../../redux/eventData/eventData.actions';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

import VideoPlayer from './VideoPlayer';

import Logo from '../../assets/logo.png';


const Host = ({
  stream, 
  eventData,
  host,
  updateFullScreenMode,
  isVisible
}) => {

  const handleFullScreenMode = (state) => {
    updateFullScreenMode(state);
  }

  return (
    <>
    {
      eventData.hostTable &&
      eventData.tableView &&
      eventData.hostTable !== -2 &&
      eventData.hostTable !== eventData.tableView.table
      ?
      <>
        {
          stream && isVisible && !host
          ?
            <div className='host-table-text'>
              Host at {eventData.tables[eventData.hostTable-1] && eventData.tables[eventData.hostTable-1].tableName}
            </div>
          :
            <div className='logo'>
              <img src={Logo} alt='' />
            </div>
        }
      </>
      :
        <>
          {
            stream 
            ?
            <>
              <VideoPlayer stream={stream} videoType={"host-video"} />
              <div className='full-screen-icon'>
                {
                  eventData.fullScreenMode
                  ?<BsFullscreenExit onClick={() => handleFullScreenMode(false)}/>
                  :<BsFullscreen onClick={() => handleFullScreenMode(true)}/>
                }
              </div>
              {
                !isVisible && 
                <div className='logo'>
                  <img src={Logo} alt='' />
                </div>
              }
            </>
            : 
              <div className='logo'>
                <img src={Logo} alt='' />
              </div>
          }
        </>
    }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  host: selectHost
})
const mapDispatchToProps = dispatch => ({
  updateFullScreenMode: fullScreen => dispatch(updateFullScreenMode(fullScreen))
})

export default connect(mapStateToProps, mapDispatchToProps)(Host);