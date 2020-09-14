import React from 'react';

import './Triangle.scss';


const Triangle = ({executeScroll}) => {
  
  return (
    <div className='triangle-nav'>
        <div className='triangle' onClick={executeScroll} ></div>
    </div>
  )
}

export default Triangle;