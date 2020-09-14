import React from 'react';

import './Ideal.scss';
import IdealLogo1 from '../../../assets/ideal-logo1.png';
import IdealLogo2 from '../../../assets/ideal-logo2.png';
import IdealLogo3 from '../../../assets/ideal-logo3.png';
import IdealLogo4 from '../../../assets/ideal-logo4.png';
import IdealLogo5 from '../../../assets/ideal-logo5.png';
import IdealLogo6 from '../../../assets/ideal-logo6.png';
import IdealLogo7 from '../../../assets/ideal-logo7.png';

const Ideal = () => {

  return(
    <section className="ideal-logos-main">
      <div className="custom-container">
        <div className="section-title">
          <h2>Ideal for:</h2>
        </div>
        <div className="ideal-logos-main-inner">             
          <ul data-aos="zoom-in" data-aos-duration="1500" >
            <li><img src={IdealLogo1} alt="Weddings"/></li>
            <li><img src={IdealLogo2} alt="Networking"/></li>
            <li><img src={IdealLogo3} alt="Presentations"/></li>
            <li><img src={IdealLogo4} alt="Conferences"/></li>
            <li><img src={IdealLogo5} alt="Classrooms"/></li>
            <li><img src={IdealLogo6} alt="Game Nights"/></li>
            <li><img src={IdealLogo7} alt="Workshops"/></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Ideal;