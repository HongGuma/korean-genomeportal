import React from "react";
import Axios from "axios";
import AssociationTable from "./AssociationTable";

class VariantAssociation extends React.Component {
  //TODO: fatch association
  state = {
    associations: [],
  };

  componentDidMount() {
    this.fetchAssociation(this.props.varID);
  }
  componentDidUpdate(prevProps) {
    if (this.props.varID !== prevProps.varID) {
      this.fetchAssociation(this.props.varID);
    }
  }

  fetchAssociation = async (varID) => {
    //TODO: need to change the address
    var tmp = varID.split("-");
    var posID = tmp[0] + "-" + tmp[1];
    posID = posID.replace("chr", "");
    const response = await Axios.get(
      "http://api.genomeportal.org/association/" + posID
    );
    let associations = response.data;
    this.setState({ associations: associations });
  };
  printTable() {
    if (this.state.associations != null && this.state.associations.length > 0) {
      return (
        <div className="row col-12">
          <h2> Associated traits</h2>
          <AssociationTable
            associations={this.state.associations}
          ></AssociationTable>
        </div>
      );
    }
    return <div></div>;
  }
  render() {
    return this.printTable();
  }
}

export default VariantAssociation;
