import React from 'react';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

import './SignInOrSignUp.scss';

const SignInOrSignUp = () => {

  return(
    <div className='sign-in-or-sign-up-page'>
      <div className='sign-in-or-sign-up'>
        <SignIn />
        <SignUp />
      </div>
    </div>
  )
}

export default SignInOrSignUp;