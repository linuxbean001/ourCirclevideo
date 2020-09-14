import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import DropDownMenu from './DropDownMenu';
import Logo from '../../assets/logo.png';

import { selectIsSignedIn } from '../../redux/user/user.selectors';
import { signOut } from '../../redux/user/user.actions.js'

import './Header.scss';

const Header = ({isSignedIn, signOut}) => {

  return(
  <div className='header'>
    <Link className='logo-container' to='/'>
      <div className='logo'><img src={Logo} alt=""/></div>
    </Link>
    <div className='options'>
      <Link className='option' to='/'>
        HOME
      </Link>
      <Link className='option' to='/create'>
        CREATE EVENT
      </Link>
      <Link className='option' to='/join'>
        JOIN EVENT
      </Link>
      <Link className='option' to='/pricing'>
        PRICING
      </Link>
      {
        isSignedIn
        ?<>
          <Link className='option' to='/account'>
            ACCOUNT
          </Link>
          <div className='option' onClick={() => signOut()}>SIGN OUT</div>
        </>
        :<Link className='option' to='/signin'>
          SIGN IN
        </Link>
      }
    </div>
    <div className="drop-down-menu">
      <DropDownMenu 
        isSignedIn={isSignedIn}
        signOut={signOut}
      />
    </div>
  </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isSignedIn: selectIsSignedIn
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);