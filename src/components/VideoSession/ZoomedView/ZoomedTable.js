import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './ZoomedTable.scss';

import { 
  setTablePublisher
} from '../../../redux/eventData/eventData.actions';

import { selectEventData, selectUsers } from '../../../redux/eventData/eventData.selectors';
import { selectSessionId } from '../../../redux/eventAccess/eventAccess.selectors';
import { selectUser } from '../../../redux/user/user.selectors';
import { selectSocket } from '../../../redux/socket/socket.selectors';

import Attendee from '../Attendee';

import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

import TableChatBox from './TableChatBox/TableChatBox';


const ZoomedTable = ({
  users,
  user,
  eventData,
  socket,
  sessionId,
  OV,
  setTablePublisher
}) => {

  const setPosition = (table, seat, e) => {
    e.stopPropagation();
    let currentPosition = eventData.position;
    if (currentPosition.seat !== -2){
      if(currentPosition.table === table && currentPosition.seat === seat){
        socket.emit('set-position', {
          sessionId,
          id: eventData.id,
          table: -1,
          seat: -1
        })
      }
      else{
        socket.emit('set-position', {
          sessionId,
          id: eventData.id,
          table,
          seat
        })
      }
    }
  }

  const sendUserVideoAndAudio = (isVisible, hasAudio) => {
    socket.emit('change-user-video-and-audio', {
      sessionId: sessionId,
      id: eventData.id,
      isVisible: isVisible,
      hasAudio: hasAudio
    })
  }

  const changeAudioState = () => {
    let {tablePublisher} = eventData;
    if (!eventData.hasAudio){
      if (tablePublisher === undefined){
        initialStreamPublish(true, false);
        sendUserVideoAndAudio(eventData.isVisible, true);
      }
      else{
        tablePublisher.publishAudio(true);
        sendUserVideoAndAudio(eventData.isVisible, true);
      }
    }
    else{
      tablePublisher.publishAudio(false)
      sendUserVideoAndAudio(eventData.isVisible, false);
    }
  }

  const publishSelf = () => {
    let {tablePublisher} = eventData;
    if (tablePublisher === undefined){
      initialStreamPublish(true, true);
      sendUserVideoAndAudio(true, true);
    }
    else{
      tablePublisher.publishVideo(true);
      sendUserVideoAndAudio(true, eventData.hasAudio);
    }
  }

  const unpublishSelf = () => {
    let { tablePublisher } = eventData;
    if (tablePublisher && tablePublisher.stream){
      tablePublisher.publishVideo(false);
      sendUserVideoAndAudio(false, eventData.hasAudio);
    }
  }


  const initialStreamPublish = (audioOption, videoOption) => {
    let {tableSession, tableConnectionId} = eventData;
    if (tableSession !== undefined || tableConnectionId === ''){
      let tablePublisher = OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: audioOption, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: videoOption, // Whether you want to start publishing with your video enabled or not
        resolution: '320x240', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: true, // Whether to mirror your local video or not
      });
      // --- 6) Publish your stream ---
      tableSession.publish(tablePublisher);
      // Set the main video in the page to display our webcam and store our Publisher
      setTablePublisher(tablePublisher);
    }
  }


  const renderTable = () => {

    let {table, seat} = eventData.position;

    let gridItems = [];
    let chatPosition = eventData.seatsPerTable/2 + 1;
    let zoomedTableClassName;

    if (eventData.seatsPerTable === 4){
      zoomedTableClassName = "zoomed-table users-4";
    }
    else if (eventData.seatsPerTable === 6){
      zoomedTableClassName = "zoomed-table users-6";
    }
    else{
      zoomedTableClassName = "zoomed-table users-8";
    }

    for (let i=1; i<=eventData.seatsPerTable+1; i++){
      if (chatPosition === i){
        gridItems.push(
          <div className='table-grid-item' key={i}>
            <div className='table-chat-box'>
              <TableChatBox
                table={eventData.tableView.table}
              />
            </div>
          </div>
        )
      }
      else{
        let j;
        if (i > chatPosition){
          j = i - 1;
        }
        else{
          j = i;
        }
        if (seat === j && table === eventData.tableView.table){
          gridItems.push(
            <div className='circle-grid-item' key={i}>
              <div className='circle-container'>
                <div 
                className='circle circle-table'
                >
                  <Attendee 
                    me={true}
                    occupied={true}
                    username={eventData.username}
                    profilePicture={user.profilePicture}
                    stream={eventData.tablePublisher}
                    isVisible={eventData.isVisible}
                  />
                </div>
                {
                  eventData.tableConnectionId &&
                  <>
                    <div className='video-control'>
                    {
                      eventData.isVisible
                      ?
                        <FaVideo 
                          onClick={unpublishSelf}
                        />
                      :
                        <FaVideoSlash 
                          onClick={publishSelf}
                        />
                    }
                    </div>
                    <div className='audio-control'>
                    {
                      eventData.hasAudio
                      ?
                        <FaMicrophone
                          onClick={changeAudioState}
                        />
                      :
                        <FaMicrophoneSlash
                          onClick={changeAudioState}
                        />
                    }
                    </div>
                  </>
                }
                
              </div>
            </div>
          )
        }
        else{
          let found = false;
          users.forEach((user) => {
            if (user.position 
              && user.position.table === eventData.tableView.table 
              && user.position.seat === j
              && !found){
              gridItems.push(
                <div className='circle-grid-item' key={i}>
                  <div className='circle-container'>
                    <div className={`circle ${user.zoomed? 'circle-table' : 'circle-lobby'}`}>
                      <Attendee 
                        me={false}
                        occupied={true}
                        username={user.username}
                        profilePicture={user.profilePicture}
                        stream={user.stream}
                        isVisible={user.isVisible}
                      />
                    </div>
                  </div>
                </div>
              )
              found = true;
            }
          })
          if (!found){
            gridItems.push(
              <div className='circle-grid-item' key={i}>
                <div className='circle-container'>
                  <div 
                    className='circle circle-unoccupied'
                    onClick = {(e) => setPosition(eventData.tableView.table, j, e)}
                    style={{cursor: "pointer"}}
                  >
                    <Attendee 
                      me={false}
                      occupied={false}
                    />
                  </div>

                </div>
              </div>
            )
          }
        }
      }
    }
    return <div className={zoomedTableClassName}>
      {gridItems}
    </div>
  }

  return (
    <>
      {renderTable()}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  users: selectUsers,
  sessionId: selectSessionId,
  user: selectUser,
  socket: selectSocket
})

const mapDispatchToProps = dispatch => ({
  setTablePublisher: tablePublisher => dispatch(setTablePublisher(tablePublisher))
})


export default connect(mapStateToProps, mapDispatchToProps)(ZoomedTable);