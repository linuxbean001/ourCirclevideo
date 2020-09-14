import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './TableEditIcons.scss';

import { selectEventData } from '../../../redux/eventData/eventData.selectors';
import { selectSessionId } from '../../../redux/eventAccess/eventAccess.selectors';

import { updateTables} from '../../../redux/eventData/eventData.actions';

import ImageUploadModal from '../../ImageUploadModal/ImageUploadModal';
import ImageCropper from '../../ImageCropper/ImageCropper';
import Loading from '../../Loading/Loading';
import TableNameModal from '../TableNameModal/TableNameModal';

import { SERVER_URL } from '../../../utils/constants';

import { FaImage } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";

const TableEditIcons = ({
  eventData,
  table,
  updateTables,
  sessionId
}) => {

  const [imageModalToggle, setImageModalToggle] = useState(false);
  const [tableNameModalToggle, setTableNameModalToggle] = useState(false);
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTableName, setNewTableName] = useState(eventData.tables[table-1].tableName);

  const editTableImage = () => {
    setImageModalToggle(true);
  }

  const closeImageModal = () => {
    setImageModalToggle(false);
  }

  const editTableName = () => {
    setTableNameModalToggle(true);
  }

  const closeTableNameModal = () => {
    setTableNameModalToggle(false);
    if (newTableName !== eventData.tables[table-1].tableName){
      handleNewTableNameSubmit();
    }
  }

  const handleTableName = (e) => {
    setNewTableName(e.target.value)
  }

  const handleImage = (e) => {   
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
        setImageModalToggle(false);
      })  
      reader.readAsDataURL(e.target.files[0]);
    } 
  }

  const handleUpdateTableName = (data) => {
    let tablesTemp = [...eventData.tables];
    tablesTemp[data.tableIndex].tableName = data.tableName;
    updateTables(tablesTemp);
  }

  const handleUpdateTablePicture = (data) => {
    let tablesTemp = [...eventData.tables];
    tablesTemp[data.tableIndex].tablePicture = data.tablePicture;
    updateTables(tablesTemp);
  }

  const handleCropComplete = (croppedImageUrl) => {
    setSrc(null);
    let formData = new FormData();
    let file = new File([croppedImageUrl], "tablePicture", { type: "image/jpeg", lastModified: Date.now() });

    formData.append('tablePicture', file );
    formData.append('tablePictureKey', eventData.tables[table-1].tablePictureKey);
    formData.append('tableIndex', table - 1);
    formData.append('sessionId', sessionId);
    try {
      setLoading(true);
      fetch(SERVER_URL + '/edit-table-picture', {
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
          handleUpdateTablePicture({
            tablePicture: data,
            tableIndex: table - 1
          });
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

  const handleNewTableNameSubmit = () => {
    try {
      setLoading(true);
      fetch(SERVER_URL + '/edit-table-name', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sessionId: sessionId,
          tableName: newTableName,
          tableIndex: table - 1
        })
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data === 'error executing'){
          alert("Error Editing Table Name")
        }
        else{
          handleUpdateTableName({
            tableName: data,
            tableIndex: table - 1
          });
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        alert("Error Editing Table Name. Please try again later.")
      })

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return(
    <>
      <div className='edit-icons'>
        <div className='edit-image-icon' onClick={editTableImage}>
          <FaImage/>
        </div>
        <div className='edit-text-icon' onClick={editTableName}>
          <AiFillEdit/>
        </div>
      </div>
      {
        imageModalToggle &&
        <ImageUploadModal 
          handleImage={handleImage}
          title={'Table Image'}
          closeImageModal={closeImageModal}
          type={'image-upload-table'}
        />
      }
      {
        tableNameModalToggle &&
        <TableNameModal 
          handleTableName={handleTableName}
          newTableName={newTableName}
          title={'Edit The Table Name'}
          closeTableNameModal={closeTableNameModal}
        />
      }
      {
        src &&
        <ImageCropper 
          src={src}
          handleCropComplete={handleCropComplete}
          title={'Crop Your Image'}
          cropperType={'standard'}
        />
      }
      {
        loading &&
        <Loading />
      }
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  sessionId: selectSessionId
})

const mapDispatchToProps = dispatch => ({
  updateTables: tables => dispatch(updateTables(tables))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableEditIcons);