import React from 'react';

import './JoinEventForm.scss'

const JoinEventForm = ({
  activateSession, 
  sessionId, 
  handleChangeSessionId,
  sessionPassword,
  handleChangeSessionPassword,
  hostId,
  handleChangeHostId,
  accessingHost,
  handleAccessingHost
}) => {

  return(
    <div className="join-event-form">
      <div className="inside-container">
        <div className='form-title'> Join an Event </div>
        <div className='body'>
          Join an existing session as a guest. Sign in to customize your profile picture.
        </div>
        <form className="form" onSubmit={activateSession}>
          <div className='input-section'>
            <label className='label'> Session ID: </label>
            <input
              className="input"
              type="text"
              id="sessionId"
              value={sessionId}
              onChange={handleChangeSessionId}
              placeholder='Enter Your Session ID'
              required
            />
          </div>
          <div className='input-section'>
            <label className='label'> Session Password: </label>
            <input
              className="input"
              type="text"
              id="sessionPassword"
              value={sessionPassword}
              onChange={handleChangeSessionPassword}
              placeholder='Enter Your Session Password'
              required
            />
          </div>
          <div className='input-section'>
            <label className='label'> Host ID? </label>
            <div className='radio-buttons-container'> 
              <label className='radio-button' htmlFor='no'>
              <span className="option-title">No</span>
                <input 
                  type="radio" 
                  name="isHost" 
                  id='no' 
                  value="false"
                  checked={accessingHost === false}
                  onChange={handleAccessingHost}
                />
                <span className="checked"></span>
              </label>
              <label className='radio-button' htmlFor='yes'>
                <span className="option-title">Yes</span>
                <input 
                  type="radio" 
                  name="isHost" 
                  id='yes' 
                  value="true"
                  checked={accessingHost === true}
                  onChange={handleAccessingHost}
                />
                <span className="checked"></span>
              </label>
            </div>
            {
              accessingHost &&
              <input
                className="input"
                type="text"
                id="hostId"
                value={hostId}
                onChange={handleChangeHostId}
                placeholder='Enter Your Host ID'
                required
              />
            }
          </div>
          <div className='submit'>
            <input className="submit-button" name="commit" type="submit" value="JOIN" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default JoinEventForm;