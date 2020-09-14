import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './AttendeesSummary.scss';
import { FaBars } from "react-icons/fa";

export default function AttendeesSummary(){
  let [menuVisible, setMenuVisible] = useState( false )
  let users = useSelector( state => state.eventData.users )

  const openMenu = (event) => {
    event.preventDefault()
    setMenuVisible(true)
    document.addEventListener('click', closeMenu)
  }
  
  const closeMenu = () => {
    setMenuVisible(false)
    document.removeEventListener('click', closeMenu)
  }

  const numberOfAttendees = (option) => {
    let num
    if (option === "table"){
      num = users && users.filter( user => user.zoomed).length
    }
    else if (option === "lobby"){
      num = users && users.filter( user => !user.zoomed && user.position.table ).length
    }
    else if (option === 'spectating'){
      num = users && users.filter( user => user.position.table ).length
    }
    return num || 0
  }

  const dropDownItem= (type, text, number) =>{
    return <div className={'drop-down-item '+type}>
      <div className='item-description'>
      {text}
      </div>
      <div className='item-value'>
        {number}
      </div>
    </div>
  }

  return(
      <div className='attendees-summary'>
        <div className='title-and-icon'>
          <div className='title'>
            Attendees<br></br>Summary
          </div>
          <div className='icon' onClick={openMenu} >
            <FaBars />
          </div>
        </div>
        { menuVisible && 
          <div className="drop-down-list">
            {dropDownItem(
              'total', 
              'Total Number of Attendees:', 
              (users && users.length) || 0
            )}
            {dropDownItem(
              'lobby', 
              'Total In Lobby View:', 
              numberOfAttendees("lobby")
            )}
            {dropDownItem(
              'table', 
              'Total In Table View:', 
              numberOfAttendees("table")
            )}
            {dropDownItem(
              'spectating', 
              'Total Spectating:', 
              numberOfAttendees("spectating")
            )}
          </div>}
      </div>
  )
}
