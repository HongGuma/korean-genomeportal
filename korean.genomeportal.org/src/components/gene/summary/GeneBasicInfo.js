import React from "react";

class GeneBasicInfo extends React.Component {
  render() {
    return (
      <div>
        <h5>
          <strong>Basic information</strong>
        </h5>
        <table>
          <tr>
            <th>Genome build</th>
            <td>GRCh38 / hg38</td>
          </tr>
          <tr>
            <th>Ensembl gene ID</th>
            <td>{this.props.geneID}</td>
          </tr>
          <tr>
            <th>Ensembl transcript ID</th>
            <td>{this.props.transcriptID}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default GeneBasicInfo;
