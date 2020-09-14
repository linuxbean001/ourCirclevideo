import React from 'react';

import './Features.scss';

const Features = () => {

  return(
    <section className="features">
      <div className="custom-container">
        <div className="features-inner">
          <div className="features-content">
            <h3>Quick &amp; Simple Use</h3>
            <p>Create events in seconds with only a few clicks, Users join just as easily.</p>
          </div>
          <div className="features-content">
            <h3>High Quality Video</h3>
            <p>High res, low latency video streaming using WebRTC straight from your browser.</p>
          </div>
          <div className="features-content">
            <h3>Secure &amp; Private</h3>
            <p>Video sessions are encrypted and conversations are kept private.</p>
          </div>
          <div className="features-content">
            <h3>Personalize</h3>
            <p>Customize your event space, change table names, and add images to the event space.</p>
          </div>
          <div className="features-content">
            <h3>No Downloads</h3>
            <p>Nothing to install or download, Get started right off your web browser.</p>
          </div>
          <div className="features-content">
            <h3>Screen Share</h3>
            <p>As a host, share your screen in realtime to everyone in the event.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features;