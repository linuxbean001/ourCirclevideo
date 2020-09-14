import React from "react";
import TimePicker from 'rc-time-picker';

import './TimeInput.scss';


import 'rc-time-picker/assets/index.css';
 

 
class TimeInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime: '',
      endTime: ''
    }
  }
 
  handleChange = date => {
    this.setState({
      startTime: ''
    });
  };
 
  render() {
    return (
      <div className='time-input'>
        <label className='time-label'> Start: </label>
        <TimePicker
          className='start-time'
          showSecond={false}
          minuteStep={15}
          use12Hours={true}
          allowEmpty={false}
          onChange={this.props.handleEventStart}
        />
        <label className='time-label'> End: </label>
        <TimePicker
          className='end-time'
          showSecond={false}
          minuteStep={15}
          use12Hours={true}
          allowEmpty={false}
          onChange={this.props.handleEventEnd}
        />
      </div>
    );
  }
}

export default TimeInput;