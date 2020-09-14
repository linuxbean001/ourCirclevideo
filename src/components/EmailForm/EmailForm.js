import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import "./EmailForm.scss";

import { selectIsSignedIn } from '../../redux/user/user.selectors';

import { submitEmailStart } from '../../redux/user/user.actions';
import { openGeneralModal } from '../../redux/general/general.actions';

import tick from '../../assets/tick.png';

const EmailForm = ({
  submitEmailStart,
  openGeneralModal,
  isSignedIn
}) => {

  const [email, setEmail] = useState('');

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  } 

  const submitEmail = (e) => {
    e.preventDefault();
    if (!isSignedIn){
        openGeneralModal({
            code: 1,
            modalText: "You must be signed in for free trail"
        })
    }else{
      
      setEmail('');
      submitEmailStart(email);
    }
  }

  return (
    <div className="email-form">
        <div className="email-form-form">
          <form action="#" method="post" onSubmit={submitEmail}>
            <div className="subscribe-field">
              <input 
                type="email" 
                className="email-field" 
                name="email-form-input" 
                value={email}
                onChange={handleSetEmail}
                placeholder="Your email address" 
                required
              />
            </div>
            <input type="submit" className="btn-field" value="FREE TRIAL"/>
          </form>
        </div>
        <ul>
          <li> <img className="tick-img"  src={tick} alt="tick"/> No Credit Card Required </li>
          <li> <img className="tick-img" src={tick} alt="tick"/> Free Signup</li>
          <li> <img className="tick-img" src={tick} alt="tick"/> No Installation Required</li>
        </ul>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isSignedIn: selectIsSignedIn
})

const mapDispatchToProps = dispatch => ({
  submitEmailStart: (email) => dispatch(submitEmailStart({email})),
  openGeneralModal: (data) => dispatch(openGeneralModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);