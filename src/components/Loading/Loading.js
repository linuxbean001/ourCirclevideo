import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import './Loading.scss'

 
const Loading = () => {

  return (
    <div className="loading">
      <PulseLoader
        size={50}
        color={"#ffb347"}
        loading={true}
      />
    </div>
  );
  
}

export default Loading;