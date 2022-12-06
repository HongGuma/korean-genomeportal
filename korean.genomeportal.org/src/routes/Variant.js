import React from "react";
import VariantDetail from "../components/variant/VariantDetail";

class Variant extends React.Component {
  render() {
    const { varID } = this.props.match.params;
    return (
      <div className="container col-12">
        <h1> {varID} </h1>
        <VariantDetail varID={varID} />
      </div>
    );
  }
}

export default Variant;
