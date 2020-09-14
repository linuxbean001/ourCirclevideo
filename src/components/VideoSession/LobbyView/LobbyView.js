import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectEventData } from '../../../redux/eventData/eventData.selectors';

import './LobbyView.scss'

import HostSection from '../HostSection/HostSection';
import EventChat from '../EventChat/EventChat';
import AttendeeSection from '../AttendeeSection';


const LobbyView = ({
  eventData
}) => {


  const renderLobby = () => {
    let eventSections = [];
    let iterationCount = eventData.tables.length + 2;
    for (let i = 1; i <= iterationCount; i++){
      if (i === 2){
        eventSections.push(
          <HostSection 
            key={i}
          />
        )
      }
      else if (i === 5){
        eventSections.push(
          <EventChat 
            key={i}
          />
        )
      }
      else{
        let table = 1;
        if (i>2 && i<5){
          table = i - 1;
        }
        else if (i > 5){
          table = i - 2;
        }
        eventSections.push(
          <AttendeeSection 
            key={i}
            table={table}
          />
        )
      }
    }
    return eventSections;
  }


  return (
    <div className='lobby-view'>
      { renderLobby() }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
})

export default connect(mapStateToProps)(LobbyView);