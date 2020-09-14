import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({
  stream,
  videoType
}) => {

  const videoRef = useRef();

  useEffect(() => {
    if (stream && !!videoRef){
      stream.addVideoElement(videoRef.current);
    }
  })

  return (
    <video 
      className={`${videoType}`} 
      autoPlay={true} 
      ref={videoRef} 
    />
  )
}

export default VideoPlayer;
