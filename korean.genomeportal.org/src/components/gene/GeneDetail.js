import React from "react";
import Axios from "axios";
import GeneTable from "./table/GeneTable";
import GeneBar from "./barchart/GeneBar";
import GeneSummary from "./summary/GeneSummary";
import { Redirect } from "react-router-dom";


class GeneDetail extends React.Component {
  state = {
    variants: [],
  };
  componentDidMount() {
    this.fetchVariants(this.props.geneSymbol);
  }
  componentDidUpdate(prevProps) {
    if (this.props.geneSymbol !== prevProps.geneSymbol) {
      this.fetchVariants(this.props.geneSymbol);
    }
  }
  fetchVariants = async (geneSymbol) => {
    //TODO: need to change the address
    const response = await Axios.get(
      "http://api.genomeportal.org/gene/" + geneSymbol
    );
    let variants = response.data;
    this.setState({ variants: variants });
  };

  render() {
    const variants = this.state.variants;

    if (
      this.props.geneSymbol === undefined ||
      this.props.geneSymbol === "undefined"
    ) {
      return <Redirect to="/"></Redirect>;
    }

    //const variants=ACE2[this.props.geneSymbol];

    //console.log(variants)
    //<GeneBar variants={variants}/>
    return (
      <div className="container col-12">
        <br />
        <h1>{this.props.geneSymbol}</h1>
        <GeneSummary variants={variants} />
        <div className="container col-12">
          <GeneBar variants={variants} />
        </div>

        <div className="container col-11">
          <GeneTable variants={variants} />
        </div>
      </div>
    );
  }
}

export default GeneDetail;
