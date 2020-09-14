import React from 'react';
import './ImageUploadModal.scss';

const ImageUploadModal = ({handleImage, disclaimer, title, closeImageModal, type}) => {
    return (
      <div className='image-upload-modal-page'>
        <div className={`modal ${type}`}>
          <div className='modal-title'> {title} </div>
          <div className={disclaimer && 'disclaimer'}>
            {disclaimer}
          </div>
          <div className='inner-container'>
            <div className='input-section'>
              <label className='file-upload'> 
                Upload
                <input
                  type='file'
                  accept="image/*"
                  name='bannerPicture'
                  onChange={handleImage}
                />
              </label>
            </div>
            <div className='cancel-button-container'>
              <button
                className='cancel-button'
                name='cancel'
                onClick={closeImageModal}
              >
              Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};


export default ImageUploadModal;