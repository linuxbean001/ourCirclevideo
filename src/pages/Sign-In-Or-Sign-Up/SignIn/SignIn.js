import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../../components/FormInput/FormInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ResetPassword from '../ResetPassword/ResetPassword';
import { withRouter } from 'react-router-dom';
import { signInStart } from '../../../redux/user/user.actions.js';
import { selectUser } from '../../../redux/user/user.selectors';
import SocialButton from '../SocialLogin/SocialLogin'

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

  const [formHidden, setFormHidden] = useState(false);

  const handleChange = event => {
    const { value, name } = event.target;
    setUserInfo({
      ...userInfo, 
      [name]: value 
    })
  }


  const handleSocialLogin = (user) => {
    console.log(user)
  }
   
  const handleSocialLoginFailure = (err) => {
    console.error(err)
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

  const handleToggle = () =>
    setTimeout(
      () => setFormHidden(true),
      1000
    );
  return(
    <div>
      {formHidden == false ? (
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
          <a className="reset_link" onClick={handleToggle}> Reset Password </a>
        </div>
      </form>

      <hr class="hr-text" data-content="OR"/>

      <SocialButton
      provider='facebook'
      appId='366550800348178'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      className="facebook-connect social-button"
    >
      Login with Facebook
    </SocialButton>

    <SocialButton
          provider='google'
          appId='844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com'
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          className="google-connect social-button"
        >
          Login with Google
    </SocialButton>

    <SocialButton
          provider='linkedin'
          appId='7775kne2guetd0'
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          className="linkedin-connect social-button"
        >
          Login with LinkedIn
    </SocialButton>


    </div>) : (
    <div className='reset-password'>
      <ResetPassword />
    </div>
    ) }
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