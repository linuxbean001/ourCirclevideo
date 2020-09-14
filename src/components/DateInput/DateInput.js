import React from "react";
import DatePicker from "react-datepicker";

import './DateInput.scss';
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class DateInput extends React.Component {
 
  render() {
    return (
      <div className='date-input'>
        <label className='date-label'> Date: </label>
        <DatePicker
          className='date-picker'
          selected={this.props.eventDate}
          onChange={this.props.handleEventDate}
        />
      </div>
    );
  }
}

export default DateInput;