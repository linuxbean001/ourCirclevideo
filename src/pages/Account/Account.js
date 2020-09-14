import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import UserDetails from './UserDetails/UserDetails';
import EventInformation from './EventInformation/EventInformation'

import { selectIsSignedIn } from '../../redux/user/user.selectors';

import './Account.scss';

const Account = ({
  isSignedIn, 
  history
}) => {

  return(
    <>
      {
        isSignedIn ?
        <div className='account-form'>
          <UserDetails />
          <EventInformation />
        </div>
        :
        <>
          {history.push('/')}
        </>
      }
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  isSignedIn: selectIsSignedIn,
})


export default withRouter(connect(mapStateToProps)(Account));
