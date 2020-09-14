import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaBars } from "react-icons/fa";

const DropDownMenu = ({
  isSignedIn,
  signOut
}) => {

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuVisible(true);
    document.addEventListener('click', closeMenu);
  }
  
  const closeMenu = () => {
    setMenuVisible(false);
    document.removeEventListener('click', closeMenu);
  }

  return(
    <>
      <div className="drop-down-icon" >
        <div className='icon' onClick={openMenu} ><FaBars size={30} /></div>
      </div>
      { menuVisible
        ? (
        <div className="drop-down-options">
          <Link className='drop-down-option' to='/'>
            <div>HOME</div>
          </Link>
          <Link className='drop-down-option' to='/create'>
            <div>CREATE EVENT</div>
          </Link>
          <Link className='drop-down-option' to='/join'>
            <div>JOIN EVENT</div>
          </Link>
          <Link className='drop-down-option' to='/pricing'>
            <div>PRICING</div>
          </Link>
          {
            isSignedIn
            ?
            <>
              <Link className='drop-down-option' to='/account'>
              <div>ACCOUNT</div>
              </Link>
              <div className='drop-down-option' onClick={() => signOut()}>
                <div>SIGN OUT</div>
              </div>
            </>
            :
            <Link className='drop-down-option' to='/signin'>
              <div>SIGN IN</div>
            </Link>
          }
        </div>
        )
        : (
          null
        )
      }
    </>
  );
}

export default DropDownMenu;
