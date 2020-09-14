import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import ImageCropper from '../../../components/ImageCropper/ImageCropper';

import defaultPicture from '../../../assets/defaultPicture.png';
import { selectUser } from '../../../redux/user/user.selectors';
import { 
  editProfileAndPictureStart,
  editProfileStart 
} from '../../../redux/user/user.actions.js'

import './UserDetails.scss';

const UserDetails = ({
  user, 
  editProfileAndPictureStart,
  editProfileStart
}) => {

  const [src, setSrc] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [profilePictureChanged, setProfilePictureChanged] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (user.error !== null){
      if (user.error.message === 'error editing profile'){
        alert("Error editing profile. Please try again later.")
      }
      else if (user.error.message === 'Failed to fetch'){
        alert("Error communicating with server.")
      }
    }
  }, [user.error])

  const handleImage = (e) => {   
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
        setButtonDisabled(true);
        setProfilePictureChanged(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    } 
  }

  const handleChangeDisplayName = (e) => {
    setUsername(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleCropComplete = (croppedImageUrl) => {
    setSrc(null);
    setButtonDisabled(false);
    setProfilePicture(croppedImageUrl);
  }

  const commitChanges = (e) => {
    e.preventDefault();

    let formData = new FormData();

    if (profilePictureChanged){
      let file = new File([profilePicture], "profilePicture", { type: "image/jpeg", lastModified: Date.now() });
      formData.append('profilePicture', file );
      formData.append('profilePictureKey', user.profilePictureKey);
      formData.append('username', username);
      formData.append('email', email.toLowerCase());

      editProfileAndPictureStart(formData);
    }
    else{
      editProfileStart(username, email);
    }
  }

  return(
    <>
      <div className="user-details">
        <div className="inside-container">
          <h1 className='form-title'> Edit Your Profile </h1>
          <form className="form" onSubmit={commitChanges}>
            <div className='input-section'>
              <label className='label'> Display Name: </label>
              <input
                className="input"
                type="text"
                id="sessionId"
                value={username}
                onChange={handleChangeDisplayName}
                placeholder='Enter Your Session ID'
                required
              />
            </div>
            <div className='input-section'>
              <label className='label'> Email: </label>
              <input
                className="input"
                type="text"
                id="sessionId"
                value={email}
                onChange={handleChangeEmail}
                placeholder='Enter Your Session ID'
                required
              />
            </div>
            <div className='input-section'>
              <label className='label'> Profile Picture: </label>
              <div>
                <input
                  type='file'
                  accept="image/*"
                  name='profilePicture'
                  onChange={handleImage}
                />
              </div>
              <>
              {
              (profilePicture !== undefined && profilePicture !== null)
              ?
                <div className='circle-container'>
                  <div className='circle'>
                    <img alt="Crop" src={profilePicture} />
                  </div>
                </div>
              : 
                <div className='circle-container'>
                  <div className='circle'>
                    <img alt="Crop" src={defaultPicture} />
                  </div>
                </div>
              }
              </>
            </div>
            <div className='submit'>
              <input className="submit-button" name="commit" type="submit" value="UPDATE" disabled={buttonDisabled} />
            </div>
          </form>
        </div>
      </div>
      {
        src &&
        <ImageCropper
          src={src}
          handleCropComplete={handleCropComplete}
          title={'Crop Your Image'}
          cropperType={'standard'}
        />
      }
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser
})

const mapDispatchToProps = dispatch => ({
  editProfileAndPictureStart: formData => dispatch(editProfileAndPictureStart({formData})),
  editProfileStart: (username, email) => dispatch(editProfileStart({username, email}))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
