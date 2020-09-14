import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  setTableView
} from '../../redux/eventData/eventData.actions';

import { selectEventData } from '../../redux/eventData/eventData.selectors';
import { selectSessionId, selectHost } from '../../redux/eventAccess/eventAccess.selectors';
import { selectUser } from '../../redux/user/user.selectors';
import { selectSocket } from '../../redux/socket/socket.selectors';

import './AttendeeSection.scss';

import Attendee from './Attendee';
import TableEditIcons from './TableEditIcons/TableEditIcons';

const AttendeeSection = ({
  eventData,
  host,
  table,
  socket,
  sessionId,
  setTableView,
  user
}) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [allowRender, setAllowRender] = useState(false);

  useEffect(() => {
    setAllowRender(true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])


  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }

  const setPosition = (newTable, newSeat, e) => {
    e.stopPropagation();
    let currentPosition = eventData.position;
    let {publisher, id, session} = eventData;

    if (currentPosition.seat === -2 && session && publisher){
      publisher.publishVideo(false);
      publisher.publishAudio(false);
      session.unpublish(publisher);
      //must also reset share screen
      socket.emit('change-user-video-and-audio', {
        sessionId: sessionId,
        id: eventData.id,
        isVisible: false,
        hasAudio: false
      })
    }
    if(currentPosition.table === newTable && currentPosition.seat === newSeat){
      socket.emit('set-position', {
        sessionId: sessionId,
        id: id,
        table: -1,
        seat: -1
      })
    }
    else{
      socket.emit('set-position', {
        sessionId: sessionId,
        id: id,
        table: newTable,
        seat: newSeat
      })
    }
  }

  const zoomTable = (table) => {
    setTableView({
      active: true,
      table
    });
    if (host){
      socket.emit('host-table', {
        sessionId,
        hostTable: table
      })
    }
  }

  const renderCircles = () => {
    let circles=[];
    if (allowRender){
      let users = [...eventData.users];
      let position = eventData.position;

      let div = 360 / eventData.seatsPerTable;
      let tableRef = document.getElementById('table');

      let tableWidth = parseInt(tableRef.offsetWidth); 
      
      let tableRadius = tableWidth / 2; //assumes parent is square
      let circleRadius = tableRadius / 1.7;

      let totalOffset;
      if (tableWidth > 100){
        totalOffset = tableRadius - circleRadius;
      }
      else if(tableWidth <= 100){
        totalOffset = tableRadius - circleRadius;
      }

      for (let i = 1; i <= eventData.seatsPerTable; i++) {
        let childdiv = document.createElement('div');
        childdiv.className = 'circle';

        let radius = tableRadius*1.5 + circleRadius/5;

        let y = Math.sin((div * i) * (Math.PI / 180)) * radius; 
        let x = Math.cos((div * i) * (Math.PI / 180)) * radius;

        let found = false;
        if (position.table === table
          && position.seat === i){
            circles.push(
              <div
                key={i}
                className="circle circle-lobby"
                onClick = {(e) => setPosition(table, i, e)}
                style={{
                  top: (y + totalOffset).toString() + "px",
                  left: (x + totalOffset).toString() + "px",
                  width: circleRadius*2,
                  height: circleRadius*2,
                  cursor: "pointer"
                }}
              >
                <Attendee 
                  occupied={true}
                  username={eventData.username}
                  profilePicture={user.profilePicture}
                />
              </div>
            )
          }
          else{
            users.forEach((user) => {
              if (user.position 
                && user.position.table === table
                && user.position.seat === i){
                  circles.push(
                    <div
                      key={i}
                      className={`circle ${user.zoomed? 'circle-table' : 'circle-lobby'}`}
                      style={{
                        top: (y + totalOffset).toString() + "px",
                        left: (x + totalOffset).toString() + "px",
                        width: circleRadius*2,
                        height: circleRadius*2,
                      }}
                    >
                      <Attendee 
                        occupied={true}
                        username={user.username}
                        profilePicture={user.profilePicture}
                      />
                    </div>
                  )
                  found = true;
                }
            })
            if (!found){
              circles.push(
                <div
                  key={i}
                  className='circle circle-unoccupied'
                  onClick = {(e) => setPosition(table, i, e)}
                  style={{
                    top: (y + totalOffset).toString() + "px",
                    left: (x + totalOffset).toString() + "px",
                    width: circleRadius*2,
                    height: circleRadius*2,
                    cursor: !host && "pointer"
                  }}
                >
                  <Attendee 
                    occupied={false}
                  />
                </div>
              )
            }
          }
      }
    }
    return circles;
  }

  return (
    <div className='attendee-grid-item'>
      <div 
        id='table' 
        className='table'
        onClick={((eventData.position.table === table || host) && !eventData.editMode)?(() => zoomTable(table)): null}
        style={{
          cursor: ((eventData.position.table === table || host) && !eventData.editMode) && "pointer"
        }}
      >
        {renderCircles()}
        {
          eventData.position.table === table &&
          <div className='enter-table-text'>
            Click To Enter
          </div>
        }
        {
          eventData.tables[table-1] && 
          <div className='table-name'>{eventData.tables[table-1].tableName}</div>
        }
        <div 
          className={`table-ref ${eventData.position.table === table && 'table-occupied'}`}
        >
          {
            eventData.tables[table-1] && eventData.tables[table-1].tablePicture &&
            <img className='table-image' alt ='' src={eventData.tables[table-1].tablePicture}/>
          }
          {
            eventData.editMode &&
            <TableEditIcons 
              table={table}
            />
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  sessionId: selectSessionId,
  user: selectUser,
  host: selectHost,
  socket: selectSocket
})

const mapDispatchToProps = dispatch => ({
  setTableView: tableView => dispatch(setTableView(tableView))
})

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeSection);