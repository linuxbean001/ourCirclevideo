import React from 'react';

import './PlatformViews.scss';
import confrence1 from '../../../assets/confrence1.png';
import confrence2 from '../../../assets/confrence2.png';

const PlatformViews = () => {

  return(
    <>
      <section className="conference-main">
        <div className="custom-container">
          <div className="conference-main-inner">
            <div className="conference-image">
              <img data-aos="fade-right" data-aos-duration="1500" src={confrence1} alt="lobby-view"/>
            </div>
            <div className="conference-main-content">
              <h3>Be actively present</h3>
              <p>Choose your spot and who to inteact with. Users are free to discover their peers naturally.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="conference-main">
        <div className="custom-container">
          <div className="conference-main-inner">
            <div className="conference-main-content con-order">
              <h3>Unique interaction</h3>
              <p>Users select their own tables, Watch the main broadcast and video chat together in tables simultaneously.</p>
            </div>
            <div className="conference-image">
              <img data-aos="fade-left" data-aos-duration="1500" src={confrence2} alt="table-view"/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PlatformViews;