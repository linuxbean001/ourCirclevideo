import React from 'react';

import './Pricing.scss';

import EmailForm from '../../components/EmailForm/EmailForm';
import heroImage from '../../assets/hero-image.png';
//import tablepricing from '../../assets/tablepricing.jpg';

const Pricing = () => {

  return (
    <section className="pricing-page">
      <div className="custom-container">
        <div className="pricing-page-inner">
          <div className='pricing-content'>
            <h1  data-aos="fade-right" data-aos-duration="1500" >
              It's hard to interact with multiple people online...
            </h1>
            <h5  data-aos="fade-right" data-aos-duration="1500" >
              To help our communities adapt to the challenges of Covid-19,
              we are offering our web platform free to all users for a limited
              time. Hurry, this offer won't last long.
            </h5>
            <div data-aos="fade-right" data-aos-duration="1500" className='email-form-container'>
              <EmailForm />
            </div>
          </div>
          <div className="pricing-image">
            <img data-aos="fade-left" data-aos-duration="1500" src={heroImage} alt="circle-table"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing;