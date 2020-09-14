import React from 'react';

import './HomePage.scss';
import Intro from './Intro/Intro'
import Ideal from './Ideal/Ideal'
import PlatformViews from './PlatFormViews/PlatformViews';
import Features from './Features/Features';
import Video from './VideoSec/Video';
import FreeTrial from './FreeTrial/FreeTrial'
import Footer from '../../components/Footer/Footer'

const HomePage = () => {

  return (
    <div className='home-page'>
      <Intro />
      <Ideal />
      <Video />
      <PlatformViews />
      <Features />
      <FreeTrial />
      <Footer />
    </div>
  )
}

export default HomePage;



