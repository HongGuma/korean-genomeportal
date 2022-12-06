import React from "react";
import { Link } from "react-router-dom";
class AssociationTable extends React.Component {
  getAssociation(association, index) {
    return (
      <tr>
        <td>{index}</td>
        <td>{association.trait}</td>
        <td>{association.clumpedalt}</td>
        <td>{association.clumpedbeta}</td>
        <td>{association.clumped_pval}</td>
        <td>{association.index_pval}</td>
      </tr>
    );
  }
  getTable(associations) {
    if (associations.length > 0) {
      return (
        <div className="row col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Trait</th>
                <th>Risk Allele</th>
                <th>Clumped Beta</th>
                <th>Clumped P-value</th>
                <th>Index P-value</th>
              </tr>
            </thead>
            <tbody>
              {associations.map((association, index) =>
                this.getAssociation(association, index + 1)
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <p>No results</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row col-12">{this.getTable(this.props.associations)}</div>
    );
  }
}

export default AssociationTable;
