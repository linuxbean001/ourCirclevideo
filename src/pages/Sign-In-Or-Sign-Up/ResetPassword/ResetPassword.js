import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../../components/FormInput/FormInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

import { withRouter } from 'react-router-dom';
import { submitResetPasswordSuccess } from '../../../redux/user/user.actions.js';
import { selectEmail } from '../../../redux/user/user.selectors';

import './ResetPassword.scss';

const ResetPassword = ({
  submitResetPasswordSuccess,
  user
}) => {

    const [email, setEmail] = useState('');

    const handleSetEmail = (e) => {
      setEmail(e.target.value);
    } 
  
    const submitEmail = (e) => {
      e.preventDefault();
        setEmail('');
        submitResetPasswordSuccess(email);
    }

  return(
    <div className='reset-password-sec'>
      <h2>Reset your account password</h2>
      <span>Reset password with your email </span>
      <form onSubmit={submitEmail}>
        <FormInput 
         name="email" 
         type='email'
         value={email} 
         onChange={handleSetEmail}
         label="email"
         maxLength={60}
         required 
        />
        <div className='buttons'>
          <CustomButton 
            type="submit" 
            value="Submit Form" 
          > 
           Reset Password
          </CustomButton>
          <a className="reset_link" href="/signin"> Sign In </a>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectEmail,
})

const mapDispatchToProps = dispatch => ({
    submitResetPasswordSuccess: (email) => dispatch(submitResetPasswordSuccess({email}))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ResetPassword));