import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './HostControls.scss';

import { selectSessionId } from '../../../../redux/eventAccess/eventAccess.selectors';
import { selectEventData } from '../../../../redux/eventData/eventData.selectors'
import { 
  changeEditMode,
  updateScreenShare,
  setPublisher
} from '../../../../redux/eventData/eventData.actions'
import { selectSocket } from '../../../../redux/socket/socket.selectors';

import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";

import { AiFillEdit } from "react-icons/ai";

const HostControls = ({
  eventData,
  sessionId,
  socket,
  changeEditMode,
  updateScreenShare,
  setPublisher
}) => {

  const initialPublish = () => {
    const { session, hostOV } = eventData;

    let publisher = hostOV.initPublisher(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '1280x720', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: true, // Whether to mirror your local video or not
    });
    // --- 6) Publish your stream ---
    session.publish(publisher);
    // Set the main video in the page to display our webcam and store our Publisher
    setPublisher(publisher);
    sendUserVideoAndAudio(true, true);
  }

  const sendUserVideoAndAudio = (isVisible, hasAudio) => {
    socket.emit('change-user-video-and-audio', {
      sessionId: sessionId,
      id: eventData.id,
      isVisible: isVisible,
      hasAudio: hasAudio
    })
  }


  const changeHostVisibility = () => {
    let {publisher, hasAudio, isVisible} = eventData;

    if (isVisible){
      if (publisher && publisher.stream){
        publisher.publishVideo(false);
        sendUserVideoAndAudio(false, hasAudio);
      }
    }
    else{
      if (publisher){
        publisher.publishVideo(true);
        sendUserVideoAndAudio(true, hasAudio);
      }
      else{
        initialPublish();
      }
    }
  }

  const changeHostMuteState = () => {
    let {publisher, hasAudio, isVisible} = eventData;
    if (publisher && publisher.stream){
      if (!hasAudio){
        publisher.publishAudio(true)
        sendUserVideoAndAudio(isVisible, true);
      }
      else{
        publisher.publishAudio(false)
        sendUserVideoAndAudio(isVisible, false);
      }
    }
  }

  const changeToWebcam = () => {
    let {publisher, hostOV, hasAudio, isVisible} = eventData;
    hostOV.getUserMedia({
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: hasAudio, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: isVisible, // Whether you want to start publishing with your video enabled or not
      resolution: '1280x720', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: true, // Whether to mirror your local video or not
   })
   .then(mediaStream => {
     publisher.replaceTrack(mediaStream.getVideoTracks()[0]);
     updateScreenShare(false);
   })
   .catch(error => console.log(error))
  }

  const changeScreenShare = () => {
    let {publisher, hostOV, screenShare} = eventData;
    //session.unpublish(publisher);
    if (hostOV.checkScreenSharingCapabilities()){
      if (!screenShare){
        hostOV.getUserMedia({
          audioSource: undefined,
          videoSource: "screen",
          resolution: '1280x720',
          frameRate: 30,
          mirror: false
       })
       .then(mediaStream => {
         publisher.replaceTrack(mediaStream.getVideoTracks()[0]);
         updateScreenShare(true);
         mediaStream.getVideoTracks()[0].onended = () => {
          changeToWebcam();
         }
       })
       .catch(error => console.log(error))
      }
      else{
        changeToWebcam();
      }
    }
    else{
      alert("Sorry, your browser is not supported for screen sharing.");
    }
  }

  return (
    <div className="host-controls">
      <div className='controls-grid'>
        <div className='option mute-container' onClick={changeHostMuteState}>
          {
            eventData.hasAudio
            ?<FaMicrophone />
            :<FaMicrophoneSlash />
          }
        </div>
        <div className='option visibility-container' onClick={changeHostVisibility}>
          {
            eventData.isVisible
            ?<FaVideo />
            :<FaVideoSlash />
          }
        </div>
        <div className='option share-screen-container' onClick={changeScreenShare}>
          {
            eventData.screenShare
            ?<MdScreenShare />
            :<MdStopScreenShare />
          }
        </div>
        <div className={`option ${eventData.editMode && 'edit-container'}`} onClick={changeEditMode}>
          {
            eventData.editMode
            ?<AiFillEdit />
            :<AiFillEdit />
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  sessionId: selectSessionId,
  socket: selectSocket
})

const mapDispatchToProps = dispatch => ({
  changeEditMode: () => dispatch(changeEditMode()),
  updateScreenShare: screenShare => dispatch(updateScreenShare(screenShare)),
  setPublisher: (publisher) => dispatch(setPublisher(publisher))
})

export default connect(mapStateToProps, mapDispatchToProps)(HostControls);