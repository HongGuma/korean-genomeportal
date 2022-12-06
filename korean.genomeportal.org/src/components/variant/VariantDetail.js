import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import VariantEffect from "./VariantEffect";
import VariantInfo from "./basicInfo/VariantInfo";
import VariantAssociation from "./association/VariantAssociation";

class VariantDetail extends React.Component {
  state = {
    variants: [],
  };
  componentDidMount() {
    this.fetchVariant(this.props.varID);
  }
  componentDidUpdate(prevProps) {
    if (this.props.varID !== prevProps.varID) {
      this.fetchVariant(this.props.varID);
    }
  }
  fetchVariant = async (varID) => {
    //TODO: need to change the address
    const response = await Axios.get(
      "http://api.genomeportal.org/variant/" + varID
    );
    let variants = response.data;
    this.setState({ variants: variants });
  };

  render() {
    if (this.props.varID === undefined || this.props.varID === "undefined") {
      return <Redirect to="/"></Redirect>;
    }
    //const varID = this.props.varID;
    const variants = this.state.variants;

    return (
      <div className="">
        <VariantInfo variants={variants}></VariantInfo>
        <div className="row col-12">
          <VariantEffect variants={variants}></VariantEffect>
        </div>
        <div className="row col-12">
          <VariantAssociation varID={this.props.varID}></VariantAssociation>
        </div>
      </div>
    );
  }
}

export default VariantDetail;
