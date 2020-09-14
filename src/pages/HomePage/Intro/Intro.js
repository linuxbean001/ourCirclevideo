import React from 'react';

import './Intro.scss';
import heroImage from '../../../assets/hero-image.png';
import EmailForm from '../../../components/EmailForm/EmailForm'

const Intro = () => {

  return(
    <section className="hero-section">
      <div className="custom-container">
        <div className="hero-section-inner">
          <div className='hero-content'>
            <h1  data-aos="fade-right" data-aos-duration="1500" >Interactive online events for your community</h1>
            <h5  data-aos="fade-right" data-aos-duration="1500" >Engaging, hassle free video streaming and meetings made for humans</h5>
            <div data-aos="fade-right" data-aos-duration="1500" className='email-form-container'>
              <EmailForm />
            </div>
          </div>
          <div className="hero-image">
            <img data-aos="fade-left" data-aos-duration="1500" src={heroImage} alt="circle-table"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro;
