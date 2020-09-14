import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './EventHeader.scss';

import { selectEventData } from '../../../redux/eventData/eventData.selectors';
import { selectSessionId } from '../../../redux/eventAccess/eventAccess.selectors';

import { updateBanner } from '../../../redux/eventData/eventData.actions';

import ImageUploadModal from '../../ImageUploadModal/ImageUploadModal';
import ImageCropper from '../../ImageCropper/ImageCropper';
import Loading from '../../Loading/Loading';
import { FaImage } from 'react-icons/fa';

import { SERVER_URL } from '../../../utils/constants';

const EventHeader = ({
  eventData,
  sessionId,
  updateBanner
}) => {

  const [modalToggle, setModalToggle] = useState(false);
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const editBanner = () => {
    setModalToggle(true);
  }

  const closeImageModal = () => {
    setModalToggle(false);
  }

  const handleImage = (e) => {   
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
        setModalToggle(false);
      });
      reader.readAsDataURL(e.target.files[0]);
    } 
  }

  const handleCropComplete = (croppedImageUrl) => {
    setSrc(null);
    let formData = new FormData();
    let file = new File([croppedImageUrl], "bannerPicture", { type: "image/jpeg", lastModified: Date.now() });
    formData.append('bannerPicture', file );
    formData.append('bannerPictureKey', eventData.bannerPictureKey);
    formData.append('sessionId', sessionId);
    try {
      setLoading(true);
      fetch(SERVER_URL + '/edit-banner-picture', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data === 'error executing'){
          alert("Error Uploading Image")
        }
        else{
          updateBanner({
            bannerPictureKey: data.bannerPictureKey,
            bannerPicture: data.bannerPicture
          })
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        alert("Error uploading image. Please try again later.")
      })

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const {eventName, bannerPicture, editMode} = eventData;

  return (
    <div className='event-header'>
      <div className='banner-and-header'>
        <img alt="" src={bannerPicture} />
        <div className='event-name'>
          {eventName}
        </div>
      </div>
      {
        editMode &&
        <div className='edit-icon' onClick={editBanner}>
          <FaImage/>
        </div>
      }
      {
        modalToggle &&
        <ImageUploadModal 
          handleImage={handleImage}
          title={'Event Banner Image'}
          disclaimer={'Ensure you are using a desktop or laptop when uploading banners for correct resolution'}
          closeImageModal={closeImageModal}
          type={'image-upload-banner'}
        />
      }
      {
        src &&
        <ImageCropper 
          src={src}
          handleCropComplete={handleCropComplete}
          title={'Crop Your Image'}
          cropperType={'event-banner'}
        />
      }
      {
        loading &&
        <Loading />
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  sessionId: selectSessionId
})

const mapDispatchToProps = dispatch => ({
  updateBanner: bannerPictureObj => dispatch(updateBanner(bannerPictureObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventHeader);