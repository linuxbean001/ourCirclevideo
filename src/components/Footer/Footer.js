import React from 'react';

import './Footer.scss';
import rings from '../../assets/footer-rings.png';
const Footer = () => {

  return(
    <section className="copyright-main">
        <div className="copyright-main-inner">
            <div className="copyright-main-image hide-mbl">
                <img src={rings} alt="rings"/>
            </div>
            <div className="copyright-main-content">
                <p>Copyright 2020<br/>Envollo</p>
            </div>
            <div className="copyright-main-image">
                <img src={rings} alt="rings"/>
            </div>
        </div>
    </section>
  )
}

export default Footer;