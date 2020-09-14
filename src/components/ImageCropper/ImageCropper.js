import React, { useState, useEffect } from 'react';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import './ImageCropper.scss';

const ImageCropper = ({
  cropperType,
  handleCropComplete,
  src,
  title,
}) => {

  const [crop, setCrop] = useState({});
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const [imageRef, setImageRef] = useState(null);
  
  //let imageRef = null;

  useEffect(() => {
    if (cropperType === 'standard'){
      setCrop({
        aspect: 1/1,
        circularCrop: true,
      })
      if (window.innerWidth < 480){
        setImageDimensions({
          maxHeight: 500,
          maxWidth: 300
        })
      }
      else if (window.innerWidth >= 480 && window.innerWidth < 800){
        setImageDimensions({
          maxHeight: 600,
          maxWidth: 600
        })
      }
      else{
        setImageDimensions({
          maxHeight: 700,
          maxWidth: 700
        })
      }
    }

    else if (cropperType === 'event-banner'){
      if (window.innerWidth < 480){
        setImageDimensions({
          maxHeight: 300,
          maxWidth: 350
        })
      }
      else if (window.innerWidth >= 480 && window.innerWidth < 800){
        setImageDimensions({
          maxHeight: 600,
          maxWidth: 600
        })
      }
      else if (window.innerWidth >= 800 && window.innerWidth < 1000){
        setImageDimensions({
          maxHeight: 700,
          maxWidth: 750
        })
      }
      else if (window.innerWidth >= 1000 && window.innerWidth < 1200){
        setImageDimensions({
          maxHeight: 700,
          maxWidth: 950
        })
      }
      else if (window.innerWidth >= 1200 && window.innerWidth < 1400){
        setImageDimensions({
          maxHeight: 700,
          maxWidth: 1150
        })
      }
      else {
        setImageDimensions({
          maxHeight: 700,
          maxWidth: 1350
        })
      }
    }
  }, [cropperType])

  useEffect(() => {
    if (imageRef){
      let aspectRatio = imageRef.width/imageRef.height;
  
      if (imageRef.width >= imageDimensions.maxWidth){
        imageRef.width = imageDimensions.maxWidth;
        imageRef.height = imageRef.width/aspectRatio;
      }
      if (imageRef.height >= imageDimensions.maxHeight){
        imageRef.height = imageDimensions.maxHeight;
        imageRef.width = imageRef.height * aspectRatio;
      }
    }
  }, [imageRef, imageDimensions])

  const onImageLoaded = image => {
    setImageRef(image);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  }

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(
        imageRef,
        crop
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL("image/jpeg");
  }

  const onDoneCropping = () => {
    handleCropComplete(croppedImageUrl);
  }

  return(
    <div className='image-cropper-page'>
      <div className={`image-cropper-form ${cropperType}`}>
        <div className='image-cropper-header'>
          <div className='title'>
            {title}
          </div>
          <div className='submit'>
            <button className='submit-button' onClick={onDoneCropping}>Done Cropping</button>
          </div>
        </div>
        <div className='image-cropper-container'>
          <div className='image-cropper'>
            <ReactCrop 
              src={src} 
              crop={crop}
              onChange={onCropChange}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper;