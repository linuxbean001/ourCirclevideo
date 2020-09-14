import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../../components/FormInput/FormInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

import { withRouter } from 'react-router-dom';
import { signUpStart } from '../../../redux/user/user.actions.js'
import { selectUser } from '../../../redux/user/user.selectors';

import './SignUp.scss';

const SignUp = ({
  signUpStart,
  history,
  user
}) => {

  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value 
    });
  }

  useEffect(() => {
    if (user.error !== null){
      if (user.error.message === 'error signing up'){
        alert("Error logging in. Please try again.")
        setUserInfo({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
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

    const {displayName, email, password, confirmPassword } = userInfo;

    if (password !== confirmPassword){
      alert("Passwords Don't Match");
      return;
    }
    signUpStart(displayName, email, password);
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput 
          type='text'
          name='displayName'
          value={userInfo.displayName}
          onChange={handleChange}
          label='Display Name'
          maxLength={40}
          required
        />
        <FormInput 
          type='email'
          name='email'
          value={userInfo.email}
          onChange={handleChange}
          label='Email'
          maxLength={60}
          required
        />
        <FormInput 
          type='password'
          name='password'
          value={userInfo.password}
          onChange={handleChange}
          label='Password'
          maxLength={50}
          required
        />
        <FormInput 
          type='password'
          name='confirmPassword'
          value={userInfo.confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          maxLength={50}
          required
        />
        <CustomButton type='submit'> SIGN UP </CustomButton>
      </form>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
})

const mapDispatchToProps = dispatch => ({
  signUpStart: (displayName, email, password) => dispatch(signUpStart({displayName, email, password}))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));