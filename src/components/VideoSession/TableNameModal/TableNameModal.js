import React from 'react';
import './TableNameModal.scss';

const TableNameModal = ({
  handleTableName, 
  newTableName,
  title, 
  closeTableNameModal
}) => {
    return (
      <div className='table-name-modal-page'>
        <div className='modal'>
          <div className='modal-title'> {title} </div>
          <form className='form' onSubmit={closeTableNameModal}>
            <div className='input-section'>
              <label className='label'>Enter New Name: </label>
              <input
                className='table-name-input'
                type='text'
                name='tableName'
                placeholder='Enter The Table Name'
                value={newTableName}
                onChange={handleTableName}
                autoComplete="off"
                maxLength={15}
              />
            </div>
            <div className='accept-button-container'>
              <input className="accept-button" name="accept" type="submit" value="ACCEPT" />
            </div>
          </form>
        </div>
      </div>
    );
};


export default TableNameModal;