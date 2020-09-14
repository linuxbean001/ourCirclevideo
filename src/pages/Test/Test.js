import React from "react";

import './Test.scss'


class Test extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     a:1
  //   }
  // }
  // componentDidMount(){
  //   const script = document.createElement("script");

  //   script.src = "../../../lib/red5pro/red5pro-sdk.min.js";
  //   script.async = true;

  //   script.onload = () => this.scriptLoaded();

  //   document.body.appendChild(script);
  // }

  // scriptLoaded() {
  //   let red5prosdk = window.red5prosdk
  //   var rtcPublisher = new red5prosdk.RTCPublisher();
  // }

  render(){
    return(
      <>
        Test Page
      </>
    )
  }
}

export default Test;