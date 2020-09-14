import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../../components/FormInput/FormInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

import { withRouter } from 'react-router-dom';
import { signInStart } from '../../../redux/user/user.actions.js';
import { selectUser } from '../../../redux/user/user.selectors';

import './SignIn.scss';

const SignIn = ({
  history,
  signInStart,
  user
}) => {

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = event => {
    const { value, name } = event.target;
    setUserInfo({
      ...userInfo, 
      [name]: value 
    })
  }

  useEffect(() => {
    if (user.error !== null){
      if (user.error.message === 'error signing in'){
        alert("Error logging in. Please try again.");
        setUserInfo({
          email: '',
          password: '',
        })
      }
      else if (user.error.message === 'Failed to fetch'){
        alert("Error logging in. Please try again later.");
      }
    }
    if (user.isSignedIn){
      history.push('/');
    }
  }, [user.error, user.isSignedIn, history])


  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = userInfo;
    signInStart(email, password);
  } 


  return(
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name="email" 
          type='email'
          value={userInfo.email} 
          handleChange={handleChange}
          label="email"
          maxLength={60}
          required 
        />
        <FormInput 
          name="password"
          type='password'
          value={userInfo.password}
          handleChange={handleChange}
          label="password" 
          maxLength={50}
          required 
        />

        <div className='buttons'>
          <CustomButton 
            type="submit" 
            value="Submit Form" 
          > 
            Sign In 
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
})

const mapDispatchToProps = dispatch => ({
  signInStart: (email, password) => dispatch(signInStart({email, password}))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn));