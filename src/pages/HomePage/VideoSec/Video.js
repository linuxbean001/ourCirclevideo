import React from 'react';
import './Video.scss';

const Video = () => {

  return(
    <section className="video-main">
      <div className="custom-container">
        <div className="video-main-inner">
          <div data-aos="fade-up" data-aos-duration="1500"  className="video-main-inner-box">
            <div className="wpb_video_wrapper">
              <iframe 
                title="Promotional Video"
                src="https://www.youtube.com/embed/4NFuLs7peNk" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Video;
