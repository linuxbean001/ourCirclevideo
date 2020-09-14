//import React from 'react';
import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './AttendeesSummary.scss';

import { selectUsers } from '../../../redux/eventData/eventData.selectors';

import { FaBars } from "react-icons/fa";

const AttendeesSummary = () => {
      
  const [menuVisible, setmenuVisible] = useState();


  const openMenu = (event) => {
    event.preventDefault();

    setmenuVisible( true, () => { 
      document.addEventListener('click', this.closeMenu);
    });

   /* this.setState({
      menuVisible: true
    }, () => {
      document.addEventListener('click', this.closeMenu);
    })*/
  }

  const closeMenu = () => {
    setmenuVisible( false, () => { 
      document.addEventListener('click', this.closeMenu);
    });

   /* this.setState({
      menuVisible: false
    }, () => {
      document.removeEventListener('click', this.closeMenu);
    })*/
  }

  const numberOfAttendees = (option) => {
    let users = [...this.props.users];
    let count = 0;
    if (option === "table"){
      users.forEach((user) => {
        if (user.zoomed){
          count+=1;
        }
      })
      return count;
    }
    else if (option === "lobby"){
      users.forEach((user) => {
        if (!user.zoomed && user.position.table !== -1){
          count+=1;
        }
      })
      return count;
    }
    else if (option === 'spectating'){
      users.forEach((user) => {
        if (user.position.table === -1){
          count+=1;
        }
      })
      return count;
    }
  }

    return(
      <div className='attendees-summary'>
        <div className='title-and-icon'>
          <div className='title'>
            Attendees<br></br>Summary
          </div>
          <div className='icon' onClick={this.openMenu} >
            <FaBars />
          </div>
        </div>
        { 
          this.state.menuVisible
          ? 
          <div className="drop-down-list">
            <div className='drop-down-item total'>
              <div className='item-description'>
                Total Number of Attendees:
              </div>
              <div className='item-value'>
                {this.props.users.length}
              </div>
            </div>
            <div className='drop-down-item lobby'>
              <div className='item-description'>
                Total In Lobby View:
              </div>
              <div className='item-value'>
                {this.numberOfAttendees("lobby")}
              </div>
            </div>
            <div className='drop-down-item table'>
              <div className='item-description'>
                Total In Table View:
              </div>
              <div className='item-value'>
                {this.numberOfAttendees("table")}
              </div>
            </div>
            <div className='drop-down-item spectating'>
              <div className='item-description'>
                Total Spectating:
              </div>
              <div className='item-value'>
                {this.numberOfAttendees("spectating")}
              </div>
            </div>
          </div>
          : 
            null
        }
      </div>
    )

}

const mapStateToProps = createStructuredSelector({
  users: selectUsers
})

export default connect(mapStateToProps)(AttendeesSummary);