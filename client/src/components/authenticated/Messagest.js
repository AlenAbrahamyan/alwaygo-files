import React from "react";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";
 
class Demo extends React.Component {
    render() {
        return (
          <div>
              Du hima kimanas
              {
                  (isMobile?(<h1>Mobile</h1>):(null))
              }
              {
                  (isBrowser?(<h1>Browser</h1>):(null))
              }
          </div>
        )
    }
}
 
export default Demo;