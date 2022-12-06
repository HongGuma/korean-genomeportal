import React from "react";
import GeneDetail from "../components/gene/GeneDetail";

class Gene extends React.Component {
  componentDidMount() {}

  render() {
    const { geneSymbol } = this.props.match.params;
    return (
      <div className="container col-12">
        <GeneDetail geneSymbol={geneSymbol} />
      </div>
    );
  }
}
export default Gene;
