import React from "react";
import FaqGeneral from "./general";

class FaqDetail extends React.Component {
  render() {
    return (
      <div className="offset-1">
        <div className="row">
          <h1>Frequently asked questions</h1>
        </div>
        <div className="row">
          <h2>General</h2>
        </div>
        <FaqGeneral></FaqGeneral>
      </div>
    );
  }
}

export default FaqDetail;
