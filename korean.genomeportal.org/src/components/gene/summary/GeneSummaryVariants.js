import React from "react";

class GeneSummaryVariants extends React.Component {
  render() {
    return (
      <div>
        <h5>
          <strong>Variants Summary</strong>
        </h5>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Variant category</th>
              <th>Count</th>
            </tr>
          </thead>
          {this.props.countVarClass.map((count, index) => {
            return (
              <tr key={index}>
                <td>{count.variantclass}</td>
                <td>{count.Count}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default GeneSummaryVariants;
