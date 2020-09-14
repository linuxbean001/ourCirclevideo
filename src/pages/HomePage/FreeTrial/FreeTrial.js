import React from 'react';
import './FreeTrial.scss';
import EmailForm from '../../../components/EmailForm/EmailForm';

const FreeTrial = () => {
  return(
    <section className="footer-main">
      <div className="custom-container">
        <div className="footer-main-inner">
          <div className="footer-content">
            <h2 data-aos="fade-down" data-aos-duration="1500" >Get your community event started today</h2>
            <div data-aos="fade-down" data-aos-duration="1500" c lassName="email-form-container">
              <EmailForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FreeTrial;